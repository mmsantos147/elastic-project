package com.elastic.aisearch.dto;

public record WeatherDTO(
        String city,
        Double temperature,
        String description
) {}
