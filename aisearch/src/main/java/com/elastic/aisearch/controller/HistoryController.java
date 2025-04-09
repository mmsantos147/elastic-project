package com.elastic.aisearch.controller;

import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.HistoryService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/history")
public class HistoryController {
    private final HistoryService historyService;
    private final UserSession userSession;

    @DeleteMapping(path = "/all")
    public void deleteAllById() {
        historyService.deleteAllHistory(userSession.getUserId());
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        historyService.deleteHistory(id);
    }
}
