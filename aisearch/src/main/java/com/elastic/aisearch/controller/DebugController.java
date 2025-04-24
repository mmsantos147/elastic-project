package com.elastic.aisearch.controller;

import java.io.StringReader;

import com.elastic.aisearch.dto.WeatherDTO;
import com.elastic.aisearch.service.WeatherService;
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
import com.elastic.aisearch.service.ChatGptService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/debug")
@AllArgsConstructor
public class DebugController {

    private final ChatGptService chatGptService;
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

    @GetMapping("/gpt")
    public ResponseEntity<String> chat(@RequestParam("message") String userInput) {
        String response = chatGptService.makeAiResume(userInput).block();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/session")
    public ResponseEntity<String> session() {
        String response = userSession.toString();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/debug/weather/{city}")
    public ResponseEntity<String> weather(@PathVariable String city) {
        String response = weatherService.getWeather(city).toString();
        return ResponseEntity.ok(response);
    }

}
