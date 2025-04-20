package com.elastic.aisearch.dto;

import java.util.List;

public record SearchAsYouTypeDTO(
    List<String> suggestions
) {}
