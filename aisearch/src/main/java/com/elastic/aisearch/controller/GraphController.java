package com.elastic.aisearch.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elastic.aisearch.dto.graph.ArticleDTO;
import com.elastic.aisearch.service.GraphService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/graph")
public class GraphController {

    private final GraphService graphService;

    @PostMapping("/bulk")
    public ResponseEntity<String> bulk(List<ArticleDTO> articleDTOs) {
        graphService.bulkArticles(articleDTOs); 
        return ResponseEntity.ok().body("OK");
    }
}
