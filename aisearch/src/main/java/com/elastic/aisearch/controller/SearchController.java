package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.SearchResultDTO;
import com.elastic.aisearch.entity.History;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.ElasticsearchService;
import com.elastic.aisearch.service.HistoryService;
import com.elastic.aisearch.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@Slf4j
public class SearchController {

    private final ElasticsearchService elasticsearchService;
    private final UserSession userSession;
    private final HistoryService historyService;
    private final UserService userService;

    private final History history = new History();
    /**
     * Endpoint para realizar buscas usando o parser de consultas personalizado.
     *
     * @param query A string de consulta a ser processada
     * @return Lista de resultados da busca
     */
    @GetMapping
    public ResponseEntity<List<SearchResultDTO>> search(@RequestParam String query) {
        try {
            log.info("Recebida consulta: {}", query);
            userSession.addUserHistory(query);
            history.setUser(userService.searchUserId(userSession.getUserId()));
            history.setPrompt(query);
            historyService.addHistory(history);
            List<SearchResultDTO> results = elasticsearchService.search(query);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            log.error("Erro ao processar consulta: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }
}
