package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.SearchDTO;
import com.elastic.aisearch.dto.SearchResultDTO;
import com.elastic.aisearch.service.ElasticsearchService;
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
         *   - scoreDecreasing (default)
         *   - scoreIncreasing
         *   - readingTimeDecreasing
         *   - readingTimeIncreasing
         * - As consultas podem ser
         *   - allResults : o que já está implementado
         *   - exactSearch: fazer uma nova consulta, que manda tuda a consulta para o must
         */
        
         
        try {
            log.info("Recebida consulta: {}", searchDTO.search());
            
            /**
             * TODO: O SearchResultDTO também precisa retornar a quantidade de resultados 
             * e a quantidade de tempo que demorou para realizar a consulta
             * 
             * Obs: a quantidade de resultados deve ser um numero arredondado.
             */
            List<SearchResultDTO> results = elasticsearchService.search(searchDTO.search());
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            log.error("Erro ao processar consulta: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }
}
