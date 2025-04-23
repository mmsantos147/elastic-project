package com.elastic.aisearch.elastic;


import com.elastic.aisearch.dto.SearchDTO;
import com.elastic.aisearch.parser.QueryParser.QueryNode;
import static com.elastic.aisearch.utils.DateUtils.toElasticDate; 

import org.elasticsearch.index.query.*;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;;import java.util.Objects;

public class QueryBuilderFactory {

    public static QueryBuilder buildQuery(QueryNode queryNode, SearchDTO searchDTO) {
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        if(!queryNode.getShouldContent().isEmpty()) {
            boolQuery.should(QueryBuilders.matchQuery("content", queryNode.getShouldContent().trim()));
        }

        for(String phrase : queryNode.getMustInContent()) {
            boolQuery.must(QueryBuilders.matchPhraseQuery("content", stripQuotes(phrase)));
        }

        for(String phrase : queryNode.getMustNotContent()) {
            boolQuery.mustNot(QueryBuilders.matchPhraseQuery("content", stripQuotes(phrase)));
        }

        for(String phrase : queryNode.getMustTitle()) {
            boolQuery.must(QueryBuilders.matchPhraseQuery("title", stripQuotes(phrase)));
        }

        for(String phrase : queryNode.getMustNotTitle()) {
            boolQuery.mustNot(QueryBuilders.matchPhraseQuery("title", stripQuotes(phrase)));
        }

        if (!queryNode.getEqDate().isEmpty()) {
            boolQuery.filter(QueryBuilders.termQuery("dt_creation", toElasticDate(queryNode.getEqDate())));
        } else if (!queryNode.getMinDate().isEmpty() || !queryNode.getMaxDate().isEmpty()) {
                RangeQueryBuilder range = QueryBuilders.rangeQuery("dt_creation");

            if (!queryNode.getMinDate().isEmpty()) range.gte(toElasticDate(queryNode.getMinDate()));
            if (!queryNode.getMaxDate().isEmpty()) range.lte(toElasticDate(queryNode.getMaxDate()));
            boolQuery.filter(range);
        } else {
            RangeQueryBuilder range;
            if (!searchDTO.minDateTime().isEmpty()) {
                range = QueryBuilders.rangeQuery("dt_creation").gte(searchDTO.minDateTime());
            } else {
                range = QueryBuilders.rangeQuery("dt_creation");
            }
            boolQuery.filter(range);
        }

        if (!queryNode.getEqReadingTime().isEmpty()) {
            boolQuery.filter(QueryBuilders.termQuery("reading_time", queryNode.getEqReadingTime()));
        } else if (!queryNode.getMinReadingTime().isEmpty() || !queryNode.getMaxReadingTime().isEmpty()) {
            RangeQueryBuilder range = QueryBuilders.rangeQuery("reading_time");


            if (!queryNode.getMinReadingTime().isEmpty()) range.gte(Integer.parseInt(queryNode.getMinReadingTime()));
            if (!queryNode.getMaxReadingTime().isEmpty()) range.lte(Integer.parseInt(queryNode.getMaxReadingTime()));
            boolQuery.filter(range);
        } else {
            RangeQueryBuilder range;
            if (!Objects.isNull(searchDTO.maxReadTime())) {
                range = QueryBuilders.rangeQuery("reading_time").gte(searchDTO.maxReadTime());
            } else {
                range = QueryBuilders.rangeQuery("reading_time");
            }
            boolQuery.filter(range);
        }


        return boolQuery;
    }

    private static String stripQuotes(String s) {
        return s.replaceAll("^\"|\"$", "");
    }
}
