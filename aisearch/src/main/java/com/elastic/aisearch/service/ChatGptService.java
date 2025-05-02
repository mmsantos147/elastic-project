package com.elastic.aisearch.service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.elastic.aisearch.security.UserSession;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatGptService {

    private final WebClient openAiWebClient;
    private final StreamService streamService;

    private Mono<String> processResume(String searchResults, String language) {
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content",
                                "Você é um agente feito para realizar resumos (em " + language + " [SIGLA DE ACORDO COM A ISO 639]) de resultados de uma pesq" + 
                                "uisa na Wikipédia. Você deve gerar resumos pequenos (de no máximo 3 paragrafos) para os três primeiros resultados mais relev" + 
                                "antes da pesquisa. Responda em formato JSON, com o campo 'title' (para o resumo), uma lista de 3 paragrafos, cada um tendo o" + 
                                "campo 'content' e 'url'. O campo 'content' você deve colocar o resumo do conteudo da 'url' que você pegou. Segue abaixo o re" + 
                                "sultado das três primeiras pesquisas. A resposta deve estar em formato JSON puro, sem blocos de código, sem markdown e sem c" + 
                                "rases (`). Retorne apenas o JSON direto, sem explicações. Sua resposta deve ser um objeto JSON com esta estrutura:\n" + 
                                "{\n" + 
                                "  \"title\": \"...\",\n" + 
                                "  \"paragraphs\": [\n" + 
                                "    { \"content\": \"...\", \"url\": \"...\" },\n" + 
                                "    { \"content\": \"...\", \"url\": \"...\" },\n" + 
                                "    { \"content\": \"...\", \"url\": \"...\" }\n" + 
                                "  ]\n" + 
                                "}\n" + 
                                "Não adicione chaves a mais no final. Responda com um único objeto JSON." + 
                                "Nunca use contrabarra (\\) em nenhum campo do JSON. Isso quebrará a estrutura."),
                        Map.of("role", "user", "content", searchResults)));

        return openAiWebClient.post()
                .uri("/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                });
    }

    public void makeAiResume(UserSession session) {
        log.info("Chamada recebida para fazer resumo: Sessao " + session.getStreamId() + 
                  " na linguagem " + session.getLanguage() + 
                  " com o resultado " + session.getTop3Results()
                );

        CompletableFuture.runAsync(() -> {
                String aiResume = processResume(session.getTop3Results(), session.getLanguage()).block();
                streamService.sendAiAbstractToUser(session.getStreamId(), aiResume);
        }).exceptionally(ex -> {
            log.info("Um erro inesperado aconteceu: " + ex.getMessage());
            return null;
        });
    }
}
