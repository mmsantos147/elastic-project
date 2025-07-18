package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.WeatherDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {
    @Value("${openweathermap.api.key}")
    private String apiKey;

    @Value("${openweathermap.api.baseurl}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    public WeatherDTO getWeather(String city) {
        String url = String.format("%s?q=%s&appid=%s&units=metric&lang=en", apiUrl, city, apiKey);

        JsonNode json = restTemplate.getForObject(url, JsonNode.class);

        return new WeatherDTO(
            json.path("weather").get(0).path("id").asInt(),
            json.path("weather").get(0).path("main").asText(),
            json.path("name").asText(),
            json.path("main").path("temp").asInt(),
            json.path("weather").get(0).path("description").asText()
        );
    }
}
