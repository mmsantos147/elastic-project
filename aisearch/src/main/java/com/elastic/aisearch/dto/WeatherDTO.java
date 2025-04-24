package com.elastic.aisearch.dto;

public record WeatherDTO(
        Integer id,
        String group,
        String city,
        Integer temperature,
        String description
) {}
