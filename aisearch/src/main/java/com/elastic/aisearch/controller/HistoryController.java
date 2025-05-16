package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.HistoryDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.entity.History;
import com.elastic.aisearch.mappers.HistoryMapper;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.HistoryService;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/history")
public class HistoryController {
    private final HistoryService historyService;
    private final UserSession userSession;
    private final HistoryMapper historyMapper;

    @DeleteMapping(path = "/all")
    public ResponseEntity<?> deleteAllById() {
        historyService.deleteAllHistory(userSession.getUserId());
        return ResponseEntity.ok().body(new SuccessMessageDTO("success_delete"));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id) {
        historyService.deleteHistory(id, userSession.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<HistoryDTO> getHistory() {
        List<HistoryDTO> histories = new ArrayList<>();
        List<History> historyList;

        if (!Objects.isNull(userSession.getUserId())) {
            historyList = historyService.getRecentHistory(userSession.getUserId());
        } else {
            historyList = Collections.emptyList();
        }

        for (History history : historyList) {
            HistoryDTO historyDTO = historyMapper.toDTO(history);
            histories.add(historyDTO);
        }
        return histories;
    }

}
