package com.elastic.aisearch.elastic;

import java.util.*;

import com.elastic.aisearch.queryUnit.QueryParser;

// public class ElasticSearchQueryBuilder {
//     public static Map<String, Object> toElasticsearchQuery(QueryParser.QueryNode node) {
//         if (node instanceof QueryParser.BooleanNode) {
//             QueryParser.BooleanNode boolNode = (QueryParser.BooleanNode) node;
//             List<Map<String, Object>> subQueries = new ArrayList<>();
//             for (QueryParser.QueryNode child : boolNode.getChildren()) {
//                 subQueries.add(toElasticsearchQuery(child));
//             }
//             Map<String, Object> boolClause = new HashMap<>();
//             if (boolNode.getOperator() == QueryParser.BooleanNode.Operator.AND) {
//                 boolClause.put("must", subQueries);
//             } else {
//                 boolClause.put("should", subQueries);
//                 boolClause.put("minimum_should_match", 1);
//             }
//             return Map.of("bool", boolClause);

//         } else if (node instanceof QueryParser.NotNode) {
//             QueryParser.NotNode notNode = (QueryParser.NotNode) node;
//             Map<String, Object> mustNot = toElasticsearchQuery(notNode.getChild());
//             return Map.of("bool", Map.of("must_not", List.of(mustNot)));

//         } else if (node instanceof QueryParser.TermNode) {
//             QueryParser.TermNode termNode = (QueryParser.TermNode) node;
//             String field = termNode.getField() != null ? termNode.getField() : "content"; // use "content" se preferir
//             if (termNode.isMandatory()) {
//                 return Map.of("match_phrase", Map.of(field, termNode.getValue()));
//             } else {
//                 return Map.of("match", Map.of(field, termNode.getValue()));
//             }

//         } else if (node instanceof QueryParser.RangeNode) {
//             QueryParser.RangeNode rangeNode = (QueryParser.RangeNode) node;
//             return Map.of("range", Map.of(
//                     rangeNode.getField(), Map.of(
//                             "gte", rangeNode.getFrom(),
//                             "lte", rangeNode.getTo())));

//         } else if (node instanceof QueryParser.ComparisonNode) {
//             QueryParser.ComparisonNode cmpNode = (QueryParser.ComparisonNode) node;
//             String op = cmpNode.getOperator() == QueryParser.ComparisonNode.Operator.GT ? "gt" : "lt";
//             return Map.of("range", Map.of(
//                     cmpNode.getField(), Map.of(
//                             op, cmpNode.getValue())));

//         } else if (node instanceof QueryParser.ShouldWrapperNode) {
//             QueryParser.ShouldWrapperNode shouldNode = (QueryParser.ShouldWrapperNode) node;
//             return Map.of("match", Map.of("content", shouldNode.getRawText()));
//         }

//         throw new IllegalArgumentException("Unsupported node type: " + node.getClass());
//     }
// }
