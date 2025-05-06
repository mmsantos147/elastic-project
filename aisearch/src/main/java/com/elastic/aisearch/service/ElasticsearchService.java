package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.*;
import com.elastic.aisearch.elastic.QueryBuilderFactory;
import com.elastic.aisearch.parser.QueryParser;
import com.elastic.aisearch.parser.QueryParser.QueryNode;

import com.elastic.aisearch.utils.Filters;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.io.StringReader;
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

    /**
     * Executa uma busca no Elasticsearch baseada em uma string de consulta.
     * 
     * @param searchDTO A string de consulta
     * @return Lista de resultados da busca
     * @throws Exception Se ocorrer um erro durante o parsing ou a busca
     */
    public SearchResponseDTO search(SearchDTO searchDTO) throws Exception {
        QueryParser parser = new QueryParser(new StringReader(searchDTO.search()));

        QueryNode queryNode = parser.parseQuery(searchDTO.search());

        SuggestBuilder suggestBuilder = new SuggestBuilder();
        suggestBuilder.addSuggestion("content_suggest", SuggestBuilders
                .termSuggestion("content_suggest")
                .text(searchDTO.search())
                .size(1)
        );

        HighlightBuilder highlightBuilder = new HighlightBuilder()
                .preTags("<strong>")
                .postTags("</strong>")
                .numOfFragments(1)
                .fragmentSize(1000);

        BoolQueryBuilder highlightBool = QueryBuilders.boolQuery();
        for (String phrase : queryNode.getMustInContent()) {
            highlightBool.should(
                    QueryBuilders.matchPhraseQuery("content", stripQuotes(phrase.trim()))
                            .slop(1));
        }

        highlightBool.should(
                QueryBuilders.matchPhraseQuery("content", stripQuotes(queryNode.getShouldContent().trim()))
                        .slop(1));

        HighlightBuilder.Field contentField = new HighlightBuilder.Field("content")
                .highlightQuery(highlightBool);

        highlightBuilder.field(contentField);

        QueryBuilder queryBuilder = QueryBuilderFactory.buildQuery(queryNode, searchDTO);
        SearchRequest searchRequest = new SearchRequest(indexName);

        searchRequest = searchFilters(searchDTO, searchRequest, queryBuilder, highlightBuilder, suggestBuilder);

        log.info("Query gerada nesse contexto: {}", searchRequest.toString());

        SearchResponse searchResponse = elasticsearchClient.search(searchRequest, RequestOptions.DEFAULT);
        return processSearchResults(searchResponse, searchDTO);
    }

    public Integer fromCalc(Integer page, Integer resultsPerPage) {
        return resultsPerPage * (page-1);
    }

    public SearchRequest searchFilters(SearchDTO searchDTO, SearchRequest searchRequest, QueryBuilder queryBuilder, HighlightBuilder highlightBuilder, SuggestBuilder suggestBuilder) {
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

    public SearchAsYouTypeDTO searchAsYouType(String query) throws Exception {
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

    /**
     * Processa os resultados da busca e converte para objetos do domínio.
     * 
     * @param searchResponse A resposta da busca do Elasticsearch
     * @return Lista de resultados processados
     */
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
                    content,
                    getIntegerValue(sourceAsMap, "reading_time"),
                    getStringValue(sourceAsMap, "dt_creation"));

            results.add(searchResultDTO);
        }
        Long hits = searchResponse.getHits().getTotalHits().value;

        /* "{\n  \"suggest\" : {\n    \"content_suggest\" : [\n{\n        \"text\" : \"Schodiger\",\n        \"offset\" : 0,\n        \"length\" : 9,\n        \"options\" : [\n          {\n            \"text\" : \"Schrodinger\",\n            \"score\" : 0.7777778,\n            \"freq\" : 1\n          }\n        ]\n      }\n    ]\n  }\n}"
           "{\n  \"suggest\" : {\n    \"content_suggest\" : [\n      {\n        \"text\" : \"The\",\n        \"offset\" : 0,\n        \"length\" : 3,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"Schrodiger\",\n        \"offset\" : 4,\n        \"length\" : 10,\n        \"options\" : [\n          {\n            \"text\" : \"Schrodinger\",\n            \"score\" : 0.9,\n            \"freq\" : 1\n          }\n        ]\n      },\n      {\n        \"text\" : \"equation\",\n        \"offset\" : 15,\n        \"length\" : 8,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"is\",\n        \"offset\" : 24,\n        \"length\" : 2,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"a\",\n        \"offset\" : 27,\n        \"length\" : 1,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"pargial\",\n        \"offset\" : 29,\n        \"length\" : 7,\n        \"options\" : [\n          {\n            \"text\" : \"partial\",\n            \"score\" : 0.85714287,\n            \"freq\" : 754\n          }\n        ]\n      },\n      {\n        \"text\" : \"differential\",\n        \"offset\" : 37,\n        \"length\" : 12,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"equation\",\n        \"offset\" : 50,\n        \"length\" : 8,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"fo\",\n        \"offset\" : 59,\n        \"length\" : 2,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"the\",\n        \"offset\" : 62,\n        \"length\" : 3,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"wqve\",\n        \"offset\" : 66,\n        \"length\" : 4,\n        \"options\" : [\n          {\n            \"text\" : \"wave\",\n            \"score\" : 0.75,\n            \"freq\" : 578\n          }\n        ]\n      },\n      {\n        \"text\" : \"funxtion\",\n        \"offset\" : 71,\n        \"length\" : 8,\n        \"options\" : [\n          {\n            \"text\" : \"function\",\n            \"score\" : 0.875,\n            \"freq\" : 3592\n          }\n        ]\n      },\n      {\n        \"text\" : \"of\",\n        \"offset\" : 80,\n        \"length\" : 2,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"quantum\",\n        \"offset\" : 83,\n        \"length\" : 7,\n        \"options\" : [ ]\n      },\n      {\n        \"text\" : \"mechanics\",\n        \"offset\" : 91,\n        \"length\" : 9,\n        \"options\" : [ ]\n      }\n    ]\n  }\n}",

        * */
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(searchResponse.getSuggest().toString());

        JsonNode suggestion = root.path("suggest").path("content_suggest");
        List<SuggestionDTO> suggestions = new ArrayList<>();
        for (JsonNode node: suggestion) {
            String text = node.path("text").asText();
            Integer offset = node.path("offset").asInt();
            Integer length = node.path("length").asInt();

            JsonNode option = node.path("options");
            String optionText = null;

            if (option.isArray() && !option.isEmpty()) {
                optionText = option.path(0).path("text").asText();
            }

            suggestions.add(new SuggestionDTO(
                    text, offset, length, optionText
            ));
        }

        return new SearchResponseDTO(

                hits,
                Math.toIntExact(hits/searchDTO.resultsPerPage())+1,
                (float) searchResponse.getTook().getSecondsFrac(),
                suggestions,
                results
        );
    }

    private SearchAsYouTypeDTO processSearchAsYouTypeDTO(SearchResponse searchResponse) {
        List<String> suggestions = new ArrayList<>();

        for (SearchHit hit : searchResponse.getHits().getHits()) {
            Map<String, Object> sourceAsMap = hit.getSourceAsMap();
            String title = (String) sourceAsMap.get("title");
            if (title != null) {
                suggestions.add(title);
            }
        }

        return new SearchAsYouTypeDTO(suggestions);
    }

    /**
     * Extrai um valor de String de um mapa com segurança.
     */
    private String getStringValue(Map<String, Object> map, String key) {
        return map.containsKey(key) && map.get(key) != null ? map.get(key).toString() : "";
    }

    /**
     * Extrai um valor de Integer de um mapa com segurança.
     */
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
}