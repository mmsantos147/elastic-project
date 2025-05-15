package com.elastic.aisearch.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elastic.aisearch.dto.graph.ArticleDTO;
import com.elastic.aisearch.dto.graph.GraphNodeDTO;
import com.elastic.aisearch.service.GraphService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/graph")
public class GraphController {

    private final GraphService graphService;

    @PostMapping("/bulk")
    public ResponseEntity<String> bulk(@RequestBody List<ArticleDTO> articleDTOs) {
        graphService.bulkArticles(articleDTOs); 
        graphService.generateConnections(articleDTOs);
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/{id}/{depth}")
    public ResponseEntity<GraphNodeDTO> fetchGraph(@PathVariable("id") Integer id, @PathVariable("depth") Integer depth) {
        GraphNodeDTO graphNode = graphService.generateGraph(id, 0, depth, Collections.emptySet());
        return ResponseEntity.ok(graphNode);
    }
}
