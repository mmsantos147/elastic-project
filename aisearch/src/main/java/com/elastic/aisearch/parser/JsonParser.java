package com.elastic.aisearch.parser;

import com.elastic.aisearch.dto.AIAbstractDTO;
import com.elastic.aisearch.dto.AIParagraphDTO;
import com.elastic.aisearch.dto.SuggestionDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@NoArgsConstructor
@Component
public class JsonParser {

    private final ObjectMapper mapper = new ObjectMapper();

    public List<SuggestionDTO> suggestParser(String suggestJson) throws JsonProcessingException {
        
        JsonNode root = mapper.readTree(suggestJson);

        JsonNode suggestion = root.path("suggest").path("content_suggest");
        List<SuggestionDTO> suggestions = new ArrayList<>();
        for (JsonNode node: suggestion) {
            String text = node.path("text").asText();
            Integer offset = node.path("offset").asInt();
            Integer length = node.path("length").asInt();

            JsonNode option = node.path("options");
            String optionText = null;

            if (option.isArray() && !option.isEmpty()) {
                optionText = option.path(0).path("text").asText();
            }

            suggestions.add(new SuggestionDTO(
                    text, offset, length, optionText
            ));
        }
        return suggestions;
    }

    public AIAbstractDTO aiAbstractParser(String aiAbstractJson, String requestId) throws JsonProcessingException {
        JsonNode root = mapper.readTree(aiAbstractJson);

        List<AIParagraphDTO> paragraphDTOs = new ArrayList<>();
        
        for (JsonNode node: root.path("paragraphs")) {
            AIParagraphDTO paragraphDTO = new AIParagraphDTO(
                node.get("content").asText(), 
                node.get("url").asText()
            );
            paragraphDTOs.add(paragraphDTO);
        } 

        String title = root.get("title").asText();
        return new AIAbstractDTO(requestId, title, paragraphDTOs);

    }

}