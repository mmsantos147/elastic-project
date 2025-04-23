package com.elastic.aisearch.dto;

import com.elastic.aisearch.utils.Filters;

public record SearchDTO(
    String search,
    Integer page,
    Integer resultsPerPage,
    Filters orderBy,
    Integer maxReadTime,
    String searchFor,
    String minDateTime
) {}
