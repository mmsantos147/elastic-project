package com.elastic.aisearch.service;

import com.elastic.aisearch.entity.History;
import com.elastic.aisearch.repository.HistoryRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class HistoryService {
    private final HistoryRepository historyRepository;

    public List<History> getRecentHistory(Integer userId) {
        return historyRepository.findMostRecentHistory(userId);
    }

    public void addHistory(History history){
        historyRepository.save(history);
    }

    public void deleteAllHistory(Integer userId) {
        historyRepository.deleteAllByUserId(userId);
    }

    public void deleteHistory(Integer id) {
        historyRepository.deleteById(id);
    }
}
