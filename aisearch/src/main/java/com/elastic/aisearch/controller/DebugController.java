package com.elastic.aisearch.controller;

import java.io.StringReader;

import com.elastic.aisearch.dto.WeatherDTO;
import com.elastic.aisearch.service.WeatherService;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.elastic.aisearch.parser.ParseException;
import com.elastic.aisearch.parser.QueryParser;
import com.elastic.aisearch.security.UserSession;

import lombok.AllArgsConstructor;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/debug")
@AllArgsConstructor
public class DebugController {

    private UserSession userSession;
    private final WeatherService weatherService;

    @GetMapping("/")
    public String hello() {
        return "Hello world!";
    }

    @GetMapping("/queryDebug")
    public ResponseEntity<String> parseQueryDebug(@RequestParam("q") String query) {
        QueryParser queryParser = new QueryParser(new StringReader(query));

        try {
            String parsed = queryParser.parseQuery(query).toString();

            return new ResponseEntity<>(parsed, HttpStatus.OK);
        } catch (ParseException e) {
            return new ResponseEntity<>("Erro no parser: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/session")
    public ResponseEntity<String> session() {
        String response = userSession.toString();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/weather/{city}")
    public ResponseEntity<WeatherDTO> weather(@PathVariable String city) {
        WeatherDTO weatherDTO = weatherService.getWeather(city);
        return ResponseEntity.ok(weatherDTO);
    }

    @GetMapping("/weather/ip")
    public ResponseEntity<WeatherDTO> weatherIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Real-IP");

        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }

        String url = "http://ip-api.com/json/" + ipAddress;
        RestTemplate restTemplate = new RestTemplate();
        JsonNode location = restTemplate.getForObject(url, JsonNode.class);

        String city = location.path("city").asText();
        System.out.println("O IP É ESSE" + ipAddress + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        if (city.isEmpty()) city = "São Paulo";
        WeatherDTO weatherDTO = weatherService.getWeather(city);
        return ResponseEntity.ok(weatherDTO);
    }

}
