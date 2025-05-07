package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.QueryDTO;
import com.elastic.aisearch.dto.SearchAsYouTypeDTO;
import com.elastic.aisearch.dto.SearchDTO;
import com.elastic.aisearch.dto.SearchResponseDTO;
import com.elastic.aisearch.dto.SearchResultDTO;
import com.elastic.aisearch.entity.History;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.*;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/search")
@AllArgsConstructor
@Slf4j
public class SearchController {

    private final UserSession userSession;
    private final ElasticsearchService elasticsearchService;
    private final ChatGptService chatGptService;
    private final HistoryService historyService;
    private final UserService userService;

    private final HttpServletRequest request;

    /**
     * Endpoint para realizar buscas usando o parser de consultas personalizado.
     *
     * @param query A string de consulta a ser processada
     * @return Lista de resultados da busca
     */
    @PostMapping
    public ResponseEntity<SearchResponseDTO> search(@RequestBody SearchDTO searchDTO) {
        request.getSession(true);

        try {
            log.info("Recebida consulta: {}", searchDTO.search());

            SearchResponseDTO response = elasticsearchService.search(searchDTO);

            String top3 = response.results().stream()
                    .limit(3)
                    .toList()
                    .toString();

            userSession.setTop3Results(top3);
            userSession.setLastRequestId(searchDTO.requestId());
            chatGptService.makeAiResume(userSession);

            History history = new History();
            history.setPrompt(searchDTO.search());
            if (!Objects.isNull(userSession.getUserId())) {
                history.setUser(userService.getUserId(userSession.getUserId()));
                historyService.addHistory(history);
            }
            userSession.setLastRequestId(top3);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erro ao processar consulta: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/suggestions")
    public ResponseEntity<SearchAsYouTypeDTO> searchAsYouType(@RequestBody QueryDTO query) {
        SearchAsYouTypeDTO suggestion;
        try {
            suggestion = elasticsearchService.searchAsYouType(query.query());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(suggestion);
    }
}
