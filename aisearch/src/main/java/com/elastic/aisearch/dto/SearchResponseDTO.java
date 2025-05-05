package com.elastic.aisearch.dto;

import java.util.List;

public record SearchResponseDTO(
    Long hits,
    Integer pages,
    Float timeTaken,
    String searchSuggestion,
    List<SearchResultDTO> results
) {}
