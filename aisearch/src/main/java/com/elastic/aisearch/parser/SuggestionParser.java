package com.elastic.aisearch.parser;

import com.elastic.aisearch.dto.SuggestionDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class SuggestionParser {

    public List<SuggestionDTO> SuggestParser(String suggestJson) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
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
}
