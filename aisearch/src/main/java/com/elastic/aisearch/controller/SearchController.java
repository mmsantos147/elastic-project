package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.QueryDTO;
import com.elastic.aisearch.dto.SearchAsYouTypeDTO;
import com.elastic.aisearch.dto.SearchDTO;
import com.elastic.aisearch.dto.SearchResultDTO;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.ChatGptService;
import com.elastic.aisearch.service.ElasticsearchService;
import com.elastic.aisearch.service.StreamService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/search")
@AllArgsConstructor
@Slf4j
public class SearchController {

    private final UserSession userSession;
    private final ElasticsearchService elasticsearchService;
    private final ChatGptService chatGptService;
    private final StreamService streamService;

    private final HttpServletRequest request;

    /**
     * Endpoint para realizar buscas usando o parser de consultas personalizado.
     *
     * @param query A string de consulta a ser processada
     * @return Lista de resultados da busca
     */
    @PostMapping
    public ResponseEntity<List<SearchResultDTO>> search(@RequestBody SearchDTO searchDTO) {
        request.getSession(true);
        /*
         * TODO: SearchDTO contém todas as informações necessárias para a consulta.
         * É necessário utilizá-las para fazer uma consulta funcional. Implementar
         * funcionalidades tais como:
         * - Paginação
         * - Mostrar x resultados por página
         * - Ordenar por
         * - scoreDecreasing (default)
         * - scoreIncreasing
         * - readingTimeDecreasing
         * - readingTimeIncreasing
         * - As consultas podem ser
         * - allResults : o que já está implementado
         * - exactSearch: fazer uma nova consulta, que manda tuda a consulta para o must
         * 
         * Também é necessário adicionar a pesquisa que ele fez no histório do usuário
         * logado.
         * Se o usuário não estiver logado, então adiciona somente na sessão do usuário
         */

        try {
            log.info("Recebida consulta: {}", searchDTO.search());

            /**
             * TODO: O SearchResultDTO também precisa retornar a quantidade de resultados
             * e a quantidade de tempo que demorou para realizar a consulta
             * 
             * Obs: a quantidade de resultados deve ser um numero arredondado.
             * Além disso, também precisa retornar a quantidade de páginas que terá (baseado
             * na
             * contagem de resultados)
             */
            List<SearchResultDTO> results = elasticsearchService.search(searchDTO.search());

            List<SearchResultDTO> top3 = results.stream()
                    .limit(3)
                    .toList();

            String top3Str = top3.toString();
            String streamId = userSession.getStreamId();

            CompletableFuture.runAsync(() -> {
                String aiResume = chatGptService.makeAiResume(top3Str).block();
                streamService.sendAiAbstractToUser(streamId, aiResume);
            }).exceptionally(ex -> {
                log.error("Erro na thread async: {}", ex.getMessage(), ex);
                return null;
            });

            return ResponseEntity.ok(results);
        } catch (Exception e) {
            log.error("Erro ao processar consulta: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
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
