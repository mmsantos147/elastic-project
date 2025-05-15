package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.*;
import com.elastic.aisearch.elastic.QueryBuilderFactory;
import com.elastic.aisearch.parser.QueryNode;
import com.elastic.aisearch.parser.QueryParser;
import com.elastic.aisearch.parser.JsonParser;
import com.elastic.aisearch.utils.Filters;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.SortOrder;
import org.elasticsearch.search.suggest.SuggestBuilder;
import org.elasticsearch.search.suggest.SuggestBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ElasticsearchService {

    @Autowired
    @Qualifier("customRestHighLevelClient")
    private final RestHighLevelClient elasticsearchClient;

    @Value("${elasticsearch.index.name:wikipedia}")
    private String indexName;

    @Autowired
    private QueryParser queryParser;

    @Autowired
    private JsonParser jsonParser;

    public SearchResponseDTO search(SearchDTO searchDTO) throws Exception {

        QueryNode queryNode = queryParser.parseQuery(searchDTO.search());

        SuggestBuilder suggestBuilder = new SuggestBuilder();
        suggestBuilder.addSuggestion("content_suggest", SuggestBuilders
                .termSuggestion("content_suggest")
                .text(searchDTO.search())
                .size(1)
        );

        HighlightBuilder highlightBuilder = highlightBuilder(queryNode);

        QueryBuilder queryBuilder = QueryBuilderFactory.buildQuery(queryNode, searchDTO);
        SearchRequest searchRequest = new SearchRequest(indexName);

        searchRequest = searchFilters(searchDTO, searchRequest, queryBuilder, highlightBuilder, suggestBuilder);

        log.info("Query gerada nesse contexto: {}", searchRequest.toString());

        SearchResponse searchResponse = elasticsearchClient.search(searchRequest, RequestOptions.DEFAULT);
        return processSearchResults(searchResponse, searchDTO);
    }

    public HighlightBuilder highlightBuilder(QueryNode queryNode) {
        HighlightBuilder highlightBuilder = new HighlightBuilder()
                .preTags("**")
                .postTags("**")
                .numOfFragments(1)
                .fragmentSize(1000);

        StringBuilder fullQueryBuilder = new StringBuilder();
        for (String phrase : queryNode.getMustInContent()) {
            fullQueryBuilder.append(phrase).append(" ");
        }
        fullQueryBuilder.append(queryNode.getShouldContent());

        String fullQuery = stripQuotes(fullQueryBuilder.toString().trim());

        MatchQueryBuilder matchQuery = QueryBuilders.matchQuery("content", fullQuery)
                .operator(Operator.OR);

        HighlightBuilder.Field contentField = new HighlightBuilder.Field("content")
                .highlightQuery(matchQuery);


        return highlightBuilder.field(contentField);
    }

    private Integer fromCalc(Integer page, Integer resultsPerPage) {
        return resultsPerPage * (page-1);
    }

    private SearchRequest searchFilters(SearchDTO searchDTO, SearchRequest searchRequest, QueryBuilder queryBuilder, HighlightBuilder highlightBuilder, SuggestBuilder suggestBuilder) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder()
                .query(queryBuilder)
                .from(fromCalc(searchDTO.page(),searchDTO.resultsPerPage()))
                .size(searchDTO.resultsPerPage())
                .trackTotalHits(true)
                .suggest(suggestBuilder)
                .highlighter(highlightBuilder);

        if (searchDTO.orderBy().equals(Filters.DATE_ASC)) {
            searchSourceBuilder
                    .sort("dt_creation", SortOrder.ASC);
        }

        if (searchDTO.orderBy().equals(Filters.DATE_DESC)) {
            searchSourceBuilder
                    .sort("dt_creation", SortOrder.DESC);
        }

        if (searchDTO.orderBy().equals(Filters.READ_TIME_ASC) ) {
            searchSourceBuilder
                    .sort("reading_time", SortOrder.ASC);
        }

        if (searchDTO.orderBy().equals(Filters.READ_TIME_DESC)) {
            searchSourceBuilder
                    .sort("reading_time", SortOrder.DESC);
        }

        return searchRequest.source(searchSourceBuilder);
    }

    public List<String> searchAsYouType(String query) throws Exception {
        SearchRequest searchRequest = new SearchRequest("wikipedia");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();

        sourceBuilder.fetchSource(new String[] { "title" }, null);
        sourceBuilder.size(5);

        MultiMatchQueryBuilder multiMatchQuery = QueryBuilders
                .multiMatchQuery(query)
                .type(MultiMatchQueryBuilder.Type.BOOL_PREFIX)
                .field("title")
                .field("title._2gram")
                .field("title._3gram");

        sourceBuilder.query(multiMatchQuery);
        searchRequest.source(sourceBuilder);

        SearchResponse response = elasticsearchClient.search(searchRequest, RequestOptions.DEFAULT);
        return processSearchAsYouTypeDTO(response);
    }

    private SearchResponseDTO processSearchResults(SearchResponse searchResponse, SearchDTO searchDTO) throws JsonProcessingException {
        List<SearchResultDTO> results = new ArrayList<>();

        for (SearchHit hit : searchResponse.getHits().getHits()) {
            Map<String, Object> sourceAsMap = hit.getSourceAsMap();

            String content;
            HighlightField hf = hit.getHighlightFields().get("content");

            if (!Objects.isNull(hf)) {
                content = hf.getFragments()[0].toString();
            } else {
                content = getStringValue(sourceAsMap, "content");
            }

            SearchResultDTO searchResultDTO = new SearchResultDTO(
                    hit.getId(),
                    hit.getScore(),
                    getStringValue(sourceAsMap, "url"),
                    getStringValue(sourceAsMap, "title"),
                    treatContent(content),
                    getIntegerValue(sourceAsMap, "reading_time"),
                    getStringValue(sourceAsMap, "dt_creation"));

            results.add(searchResultDTO);
        }

        Long hits = searchResponse.getHits().getTotalHits().value;

        List<SuggestionDTO> suggestions = jsonParser.suggestParser(searchResponse.getSuggest().toString());

        return new SearchResponseDTO(
                hits,
                Math.toIntExact(hits/searchDTO.resultsPerPage())+1,
                (float) searchResponse.getTook().getSecondsFrac(),
                suggestions,
                results,
                searchDTO.requestId()
        );
    }

    private List<String> processSearchAsYouTypeDTO(SearchResponse searchResponse) {
        List<String> suggestions = new ArrayList<>();

        for (SearchHit hit : searchResponse.getHits().getHits()) {
            Map<String, Object> sourceAsMap = hit.getSourceAsMap();
            String title = (String) sourceAsMap.get("title");
            if (title != null) {
                suggestions.add(title);
            }
        }

        return suggestions;
    }

    private String getStringValue(Map<String, Object> map, String key) {
        return map.containsKey(key) && map.get(key) != null ? map.get(key).toString() : "";
    }

    private Integer getIntegerValue(Map<String, Object> map, String key) {
        if (map.containsKey(key) && map.get(key) != null) {
            try {
                if (map.get(key) instanceof Integer) {
                    return (Integer) map.get(key);
                } else {
                    return Integer.parseInt(map.get(key).toString());
                }
            } catch (NumberFormatException e) {
                log.warn("Não foi possível converter '{}' para Integer", map.get(key));
                return 0;
            }
        }
        return 0;
    }

    private static String stripQuotes(String s) {
        return s.replaceAll("^\"|\"$", "");
    }

    private String treatContent(String content) {
        content = content.replaceAll("</?(som|math|Math)\\d*>", "");
        content = content.replaceAll("<[^>]+>", "");
        content = content.replaceAll("(?!\\\\*\\\\*)[^A-Za-z\\s\\d]+", "");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");

        return content;
    }
}