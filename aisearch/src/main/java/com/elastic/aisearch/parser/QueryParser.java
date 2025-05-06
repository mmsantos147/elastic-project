package com.elastic.aisearch.parser;

import java.util.*;
import java.util.regex.*;
import org.springframework.stereotype.Component;

@Component
public class QueryParser {

    private final List<QueryRule> rules = List.of(
        new QueryRule("notInTitle", Pattern.compile("-in_title:([^\\s]+)")),
        new QueryRule("inTitle", Pattern.compile("in_title:([^\\s]+)")),

        new QueryRule("rangeDatetime", Pattern.compile("created_at:(\\d{2}/\\d{2}/\\d{4})..(\\d{2}/\\d{2}/\\d{4})")),
        new QueryRule("minDatetime", Pattern.compile("created_at:>(\\d{2}/\\d{2}/\\d{4})")),
        new QueryRule("maxDatetime", Pattern.compile("created_at:<(\\d{2}/\\d{2}/\\d{4})")),
        new QueryRule("exactDatetime", Pattern.compile("created_at:(\\d{2}/\\d{2}/\\d{4})")),

        new QueryRule("rangeReadtime", Pattern.compile("reading_time:(\\d+)..(\\d+)")),
        new QueryRule("minReadtime", Pattern.compile("reading_time:>(\\d+)")),
        new QueryRule("maxReadtime", Pattern.compile("reading_time:<(\\d+)")),
        new QueryRule("exactReadtime", Pattern.compile("reading_time:(\\d+)")),

        new QueryRule("exact", Pattern.compile("\"([^\"]*)\"")),
        new QueryRule("notInContent", Pattern.compile("-(\\w+)"))
    );

    public QueryNode parseQuery(String query) {
        QueryNode queryNode = new QueryNode();
        String remaining = query;

        for (QueryRule rule : rules) {
            Matcher matcher = rule.getPattern().matcher(remaining);
            while (matcher.find()) {
                switch (rule.getType()) {
                    case "inTitle":
                        queryNode.getMustTitle().add(matcher.group(1));
                        break;
                    case "notInTitle":
                        queryNode.getMustNotTitle().add(matcher.group(1));
                        break;
                    case "exactDatetime":
                        queryNode.setEqDate(matcher.group(1));
                        break;
                    case "minDatetime":
                        queryNode.setMinDate(matcher.group(1));
                        break;
                    case "maxDatetime":
                        queryNode.setMaxDate(matcher.group(1));
                        break;
                    case "rangeDatetime":
                        queryNode.setMinDate(matcher.group(1));
                        queryNode.setMaxDate(matcher.group(2));
                        break;
                    case "exactReadtime":
                        queryNode.setEqReadingTime(matcher.group(1));
                        break;
                    case "minReadtime":
                        queryNode.setMinReadingTime(matcher.group(1));
                        break;
                    case "maxReadtime":
                        queryNode.setMaxReadingTime(matcher.group(1));
                        break;
                    case "rangeReadtime":
                        queryNode.setMinReadingTime(matcher.group(1));
                        queryNode.setMaxReadingTime(matcher.group(2));
                        break;
                    case "exact":
                        queryNode.getMustInContent().add(matcher.group(1));
                        break;
                    case "notInContent":
                        queryNode.getMustNotContent().add(matcher.group(1));
                        break;
                }

                remaining = matcher.replaceFirst("").trim();
                matcher = rule.getPattern().matcher(remaining); 
            }
        }

        queryNode.setShouldContent(remaining.trim());

        return queryNode;
    }
}
