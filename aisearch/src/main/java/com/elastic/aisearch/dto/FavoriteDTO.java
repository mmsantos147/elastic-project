package com.elastic.aisearch.dto;

import jakarta.persistence.Column;

import java.time.LocalDate;

public record FavoriteDTO(
        Integer elasticId,
        String title,
        String url,
        String content,
        Integer readingTime,
        LocalDate date
) {}
