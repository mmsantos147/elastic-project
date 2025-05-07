package com.elastic.aisearch.dto;

import java.util.List;

public record AIAbstractDTO(
    String requestId,
    String title,
    List<AIParagraphDTO> paragraphs
) {}
