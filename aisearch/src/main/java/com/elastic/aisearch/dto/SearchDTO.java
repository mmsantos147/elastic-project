package com.elastic.aisearch.dto;

public record SearchDTO(
    String search,
    Integer page,
    Integer resultsPerPage,
    String orderBy,
    Integer maxReadTime,
    String searchFor,
    String minDateTime
) {}
