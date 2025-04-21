package com.elastic.aisearch.dto;

import java.util.List;

public record SearchResponseDTO(
    Integer hits,    
    Integer pages,
    Float timeTaken,
    List<SearchResultDTO> results
) {}
