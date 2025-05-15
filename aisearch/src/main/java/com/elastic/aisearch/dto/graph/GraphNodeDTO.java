package com.elastic.aisearch.dto.graph;
import java.util.List;


public record GraphNodeDTO(
    Integer id,
    String url,
    String title,
    List<GraphNodeDTO> connections,
    boolean isCyclicReference
) {}
