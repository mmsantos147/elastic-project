package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.SearchDTO;
import com.elastic.aisearch.dto.SearchResultDTO;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.ChatGptService;
import com.elastic.aisearch.service.ElasticsearchService;
import com.elastic.aisearch.service.StreamService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@Slf4j
public class SearchController {

    private UserSession session;
    private final ElasticsearchService elasticsearchService;
    private final ChatGptService chatGptService;
    private final StreamService streamService;

    /**
     * Endpoint para realizar buscas usando o parser de consultas personalizado.
     *
     * @param query A string de consulta a ser processada
     * @return Lista de resultados da busca
     */
    @PostMapping
    public ResponseEntity<List<SearchResultDTO>> search(@RequestBody SearchDTO searchDTO) {
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
            log.info("Sessao do usuario [1]: {}", session.getStreamId());
            CompletableFuture.runAsync(() -> {
                log.info("Sessao do usuario [2]: {}", session.getStreamId());
                String aiResume = chatGptService.makeAiResume(top3.toString()).block();
                log.info("Resumo gerado {}", aiResume);
                streamService.sendAiAbstractToUser(session.getStreamId(), aiResume);
                log.info("Resumo enviado");
            });

            return ResponseEntity.ok(results);
        } catch (Exception e) {
            log.error("Erro ao processar consulta: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }
}
