package com.elastic.aisearch.dto.graph;

import java.util.List;

public record ArticleDTO(
    Integer id,
    String title,
    String url,
    List<Integer> connections
) {}
