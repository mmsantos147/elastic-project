package com.elastic.aisearch.dto;

public record WeatherDTO(
        String city,
        Integer temperature,
        String description
) {}
