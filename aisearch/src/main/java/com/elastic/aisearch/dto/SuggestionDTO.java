package com.elastic.aisearch.dto;

public record SuggestionDTO(
    String text,
    Integer offset,
    Integer length,
    String option
) {}
