package com.elastic.aisearch.mappers;

import com.elastic.aisearch.dto.HistoryDTO;
import com.elastic.aisearch.entity.History;
import org.springframework.stereotype.Component;

@Component
public class HistoryMapper {

    public HistoryDTO toDTO(History history) {
        return new HistoryDTO(
                history.getId(),
                history.getPrompt()
        );
    }
}
