package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.SearchAsYouTypeDTO;
import com.elastic.aisearch.dto.SearchResultDTO;
import com.elastic.aisearch.elastic.QueryBuilderFactory;
import com.elastic.aisearch.parser.QueryParser;
import com.elastic.aisearch.parser.QueryParser.QueryNode;

import com.elastic.aisearch.utils.Filters;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.StringReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ElasticsearchService {

    @Autowired
    @Qualifier("customRestHighLevelClient")
    private final RestHighLevelClient elasticsearchClient;

    @Value("${elasticsearch.index.name:wikipedia}")
    private String indexName;

    @Value("${elasticsearch.search.size:20}")
    private int searchSize;

    private Filters filters;

    /**
     * Executa uma busca no Elasticsearch baseada em uma string de consulta.
     * 
     * @param queryString A string de consulta
     * @return Lista de resultados da busca
     * @throws Exception Se ocorrer um erro durante o parsing ou a busca
     */
    public List<SearchResultDTO> search(String queryString, Integer filter) throws Exception {
        // Cria um parser para a string de consulta
        QueryParser parser = new QueryParser(new StringReader(queryString));

        // Parseia a string para obter um QueryNode
        QueryNode queryNode = parser.parseQuery(queryString);

        // Usa o QueryBuilderFactory para construir uma query do Elasticsearch
        QueryBuilder queryBuilder = QueryBuilderFactory.buildQuery(queryNode);

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

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(queryBuilder);
        searchSourceBuilder.size(searchSize);
        searchSourceBuilder.highlighter(highlightBuilder);

        SearchRequest searchRequest = new SearchRequest(indexName);
        searchRequest.source(searchSourceBuilder);

        log.info("Query gerada nesse contexto: {}", searchRequest.toString());

        SearchResponse searchResponse = elasticsearchClient.search(searchRequest, RequestOptions.DEFAULT);
        return processSearchResults(searchResponse, filter);
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
     * @param filter
     * @return Lista de resultados processados
     */
    private List<SearchResultDTO> processSearchResults(SearchResponse searchResponse, Integer filter) {
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

        return processSearchResultsFilter(results, filter);
    }

    private List<SearchResultDTO> processSearchResultsFilter(List<SearchResultDTO> results, Integer filter) {
        if (filter == Filters.NONE.ordinal() || filter == Filters.SCORE_ASC.ordinal())
            return results;

        if (filter == Filters.SCORE_DESC.ordinal())
            return results.reversed();

        if (filter == Filters.DATE_ASC.ordinal())
            return results.stream().sorted(Comparator.comparing(SearchResultDTO::datetime)).collect(Collectors.toList());

        if (filter == Filters.DATE_DESC.ordinal())
            return results.stream().sorted(Comparator.comparing(SearchResultDTO::datetime).reversed()).collect(Collectors.toList());

        if (filter == Filters.READ_TIME_ASC.ordinal())
            return results.stream().sorted(Comparator.comparing(SearchResultDTO::reading_time)).collect(Collectors.toList());

        if (filter == Filters.READ_TIME_DESC.ordinal())
            return results.stream().sorted(Comparator.comparing(SearchResultDTO::reading_time).reversed()).collect(Collectors.toList());

        return results;
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