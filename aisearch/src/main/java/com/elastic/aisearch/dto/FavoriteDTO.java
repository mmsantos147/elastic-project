package com.elastic.aisearch.dto;


import java.time.LocalDate;

public record FavoriteDTO(
        Integer id,
        Integer elasticId,
        String title,
        String url,
        String content,
        Integer readingTime,
        LocalDate date
) {}
