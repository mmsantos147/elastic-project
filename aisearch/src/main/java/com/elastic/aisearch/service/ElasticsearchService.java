package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.SearchResultDTO;
import com.elastic.aisearch.elastic.QueryBuilderFactory;
import com.elastic.aisearch.parser.QueryParser;
import com.elastic.aisearch.parser.QueryParser.QueryNode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    /**
     * Executa uma busca no Elasticsearch baseada em uma string de consulta.
     * 
     * @param queryString A string de consulta
     * @return Lista de resultados da busca
     * @throws Exception Se ocorrer um erro durante o parsing ou a busca
     */
    public List<SearchResultDTO> search(String queryString) throws Exception {
        // Cria um parser e gera o QueryNode
        QueryParser parser = new QueryParser(new StringReader(queryString));
        QueryNode queryNode = parser.parseQuery(queryString);

        // Query principal
        QueryBuilder queryBuilder = QueryBuilderFactory.buildQuery(queryNode);

        // Monta o SearchSourceBuilder
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder()
                .query(queryBuilder)
                .size(searchSize);

        // Cria um bool só para o highlight (match_phrase nas frases mustInContent)
        BoolQueryBuilder highlightBool = QueryBuilders.boolQuery();
        for (String phrase : queryNode.getMustInContent()) {
            highlightBool.should(
                    QueryBuilders.matchPhraseQuery("content", stripQuotes(phrase))
                            .slop(1) // se quiser permitir pequenas distâncias
            );
        }
        // (Opcional) incluir shouldContent também, se fizer sentido
        if (!queryNode.getShouldContent().isEmpty()) {
            highlightBool.should(
                    QueryBuilders.matchPhraseQuery("content", queryNode.getShouldContent().trim()));
        }

        // Configura o field de highlight com highlight_query customizado
        HighlightBuilder.Field contentField = new HighlightBuilder.Field("content")
                .preTags("<strong>")
                .postTags("</strong>")
                .numOfFragments(1)
                .fragmentSize(400)
                .highlightQuery(highlightBool);

        // Monta o HighlightBuilder e adiciona o field
        HighlightBuilder highlightBuilder = new HighlightBuilder()
                .field(contentField);

        // Adiciona ao source e monta o request
        searchSourceBuilder.highlighter(highlightBuilder);
        SearchRequest searchRequest = new SearchRequest(indexName)
                .source(searchSourceBuilder);

        log.info("Query gerada nesse contexto: {}", searchRequest.source().toString());

        // Executa e processa
        SearchResponse searchResponse = elasticsearchClient.search(searchRequest, RequestOptions.DEFAULT);
        return processSearchResults(searchResponse);
    }

    /**
     * Processa os resultados da busca e converte para objetos do domínio.
     * 
     * @param searchResponse A resposta da busca do Elasticsearch
     * @return Lista de resultados processados
     */
    private List<SearchResultDTO> processSearchResults(SearchResponse searchResponse) {
        List<SearchResultDTO> results = new ArrayList<>();

        for (SearchHit hit : searchResponse.getHits().getHits()) {
            Map<String, Object> sourceAsMap = hit.getSourceAsMap();

            SearchResultDTO searchResultDTO = new SearchResultDTO(
                    hit.getId(),
                    hit.getScore(),
                    getStringValue(sourceAsMap, "url"),
                    getStringValue(sourceAsMap, "title"),
                    getStringValue(sourceAsMap, "content"),
                    getIntegerValue(sourceAsMap, "reading_time"),
                    getStringValue(sourceAsMap, "dt_creation"));

            results.add(searchResultDTO);
        }

        return results;
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