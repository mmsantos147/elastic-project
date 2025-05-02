package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.WeatherDTO;
import com.elastic.aisearch.service.WeatherService;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("weatherReport")
@RequiredArgsConstructor
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

    @GetMapping("")
    public WeatherDTO getWeather(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Real-IP");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }

        String url = "http://ip-api.com/json/" + ipAddress;
        RestTemplate restTemplate = new RestTemplate();
        JsonNode location = restTemplate.getForObject(url, JsonNode.class);

        String city = location.path("city").asText();
        if (city.isEmpty()) city = "São Paulo";

        return weatherService.getWeather(city);
    }
}
