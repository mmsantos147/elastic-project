package com.elastic.aisearch.controller;

import java.io.StringReader;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.elastic.aisearch.parser.ParseException;
import com.elastic.aisearch.parser.QueryParser;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class QueryController {

    // private final SearchService searchService;

    // @GetMapping("/query")
    // public ResponseEntity<?> search(@RequestParam String q) {
    //     try {
    //         SearchResponse<JsonData> response = searchService.search(q);
    //         return ResponseEntity.ok(response.hits().hits());
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    //     }
    // }

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
}
