package com.elastic.aisearch.dto;

public record SearchResultDTO(
    String id,
    Float score,
    String url,
    String title,
    String content,
    Integer reading_time,
    String datetime
) {}
