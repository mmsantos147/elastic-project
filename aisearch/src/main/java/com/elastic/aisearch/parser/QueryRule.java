package com.elastic.aisearch.parser;

import java.util.regex.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QueryRule {
    private final String type;
    private final Pattern pattern;
}
