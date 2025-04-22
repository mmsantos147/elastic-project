package com.elastic.aisearch.service;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class ChatGptService {

    @Autowired
    private WebClient openAiWebClient;

    public Mono<String> makeAiResume(String searchResults) {
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content",
                                "Você é um agente feito para realizar resumos (em português) de resultados de uma pesquisa na Wikipédia." + 
                                "Você deve gerar resumos pequenos (de no máximo 3 paragrafos) para os três primeiros resultados mais relevantes da pesquisa." +
                                "Responda em formato JSON, com o campo 'title' (para o resumo), uma lista de 3 paragrafos, cada um tendo o campo 'content' e" + 
                                "'url'. O campo 'content' você deve colocar o resumo do conteudo da 'url' que você pegou. Segue abaixo o resultado das três " +
                                "primeiras pesquisas. A resposta deve estar em formato JSON puro, sem blocos de código, sem markdown e sem crases (`)." + 
                                "Retorne apenas o JSON direto, sem explicações.." + 
                                "Coloque no formato {'title': 'TITULO', 'paragraphs': [{'content': 'RESUMO', 'url': 'URL'},{'content': 'RESUMO', 'url': 'URL" +
                                "'},{'content': 'RESUMO', 'url': 'URL'}]}. Certifique-se de que a estrutura do JSON é válida."),
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
}
