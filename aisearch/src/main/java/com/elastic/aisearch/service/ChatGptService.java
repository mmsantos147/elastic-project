package com.elastic.aisearch.service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.elastic.aisearch.dto.AIAbstractDTO;
import com.elastic.aisearch.dto.Messages.FailMessageDTO;
import com.elastic.aisearch.parser.JsonParser;
import com.elastic.aisearch.security.UserSession;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatGptService {

    private final WebClient openAiWebClient;
    private final StreamService streamService;
    private final JsonParser jsonParser;

    private Mono<String> processResume(String searchResults, String language) {
        Map<String, Object> requestBody = Map.of(
        "model", "gpt-4o-mini",
        "messages", List.of(
                Map.of("role", "system", "content",
                        "You are an agent designed to summarize the results of a Wikipedia search. You should generate short summaries " +
                        "for the top three most relevant results from the search. Respond in JSON format, with a 'title' field (for the summary), " +
                        "and a list of 3 paragraphs, each containing 'content' and 'url'. The 'content' field should contain a summary of " +
                        "the content from the 'url' you retrieved. Below are the results of the top three search results. The answer should be in pure JSON format, " +
                        "without code blocks, markdown, or backticks (`). Only return the JSON directly, without explanations. Your response " +
                        "should be a JSON object with this structure:\n" +
                        "{\n" +
                        "  \"title\": \"...\",\n" +
                        "  \"paragraphs\": [\n" +
                        "    { \"content\": \"...\", \"url\": \"...\" },\n" +
                        "    { \"content\": \"...\", \"url\": \"...\" },\n" +
                        "    { \"content\": \"...\", \"url\": \"...\" }\n" +
                        "  ]\n" +
                        "}\n" +
                        "Do not add any extra braces at the end. Respond with a single JSON object." +
                        "Never use a backslash (\\) in any JSON field. This will break the structure.\n" +
                        "Although the content may be in English, you should provide the summary in the specified language."),
                Map.of("role", "user", "content", "Language: " + getLanguageByISO(language) + " Content: " + searchResults)
                )
        );

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
                " com o resultado " + session.getTop3Results());

        String streamId = session.getStreamId();
        String top3results = session.getTop3Results();
        String language = session.getLanguage();
        String requestId = session.getLastRequestId();
        CompletableFuture.runAsync(() -> {
            String aiResume = processResume(top3results, language).block();
            AIAbstractDTO aiAbstractDTO;

            try {
                aiAbstractDTO = jsonParser.aiAbstractParser(aiResume, requestId);
                streamService.sendAiAbstractToUser(streamId, aiAbstractDTO);
            } catch (JsonProcessingException exception) {
                streamService.sendAiAbstractToUser(streamId, new FailMessageDTO("ai_abstract_error"));
            }
            
            
            
        }).exceptionally(ex -> {
            log.info("Um erro inesperado aconteceu: " + ex.getMessage());
            return null;
        });
    }

    private String getLanguageByISO(String language) {
        String languageName = switch (language) {
            case "pt" -> "Português";
            case "en" -> "English";
            case "es" -> "Español";
            case "fr" -> "Français";
            case "de" -> "Deutsch";
            case "it" -> "Italiano";
            case "ja" -> "日本語";
            case "zh" -> "中文";
            case "ru" -> "Русский";
            case "ar" -> "العربية";
            case "ko" -> "한국어";
            case "hi" -> "हिन्दी";
            case "tr" -> "Türkçe";
            case "nl" -> "Nederlands";
            case "sv" -> "Svenska";
            case "pl" -> "Polski";
            case "uk" -> "Українська";
            case "he" -> "עברית";
            case "vi" -> "Tiếng Việt";
            case "th" -> "ไทย";
            default -> "Idioma não identificado";
        };
        return languageName;
    }

}
