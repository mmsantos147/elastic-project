package com.elastic.aisearch.controller;

import java.io.StringReader;
// import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

// import com.elastic.aisearch.elastic.ElasticSearchQueryBuilder;
import com.elastic.aisearch.queryUnit.ParseException;
import com.elastic.aisearch.queryUnit.QueryParser;
// import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class QueryController {

    // @GetMapping("/query")
    // public ResponseEntity<String> parseQuery(@RequestParam("q") String query) {
    //     QueryParser queryParser = new QueryParser(new StringReader(query));

    //     try {
    //         QueryParser.QueryNode parsed = queryParser.parseQuery(query);
    //         Map<String, Object> queryMap = ElasticSearchQueryBuilder.toElasticsearchQuery(parsed);

    //         ObjectMapper mapper = new ObjectMapper();
    //         String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(queryMap);

    //         return new ResponseEntity<>(json, HttpStatus.OK);
    //     } catch (ParseException e) {
    //         return new ResponseEntity<>("Erro no parser: " + e.getMessage(), HttpStatus.BAD_REQUEST);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>("Erro ao montar JSON: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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
