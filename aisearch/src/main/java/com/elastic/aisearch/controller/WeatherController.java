package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.WeatherDTO;
import com.elastic.aisearch.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("weatherReport")
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{city}")
    public WeatherDTO getWeather(@PathVariable String city) {
        return weatherService.getWeather(city);
    }
}
