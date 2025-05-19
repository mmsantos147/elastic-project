package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.Messages.FailMessageDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.entity.History;
import com.elastic.aisearch.exceptions.OperationNotAllowed;
import com.elastic.aisearch.repository.HistoryRepository;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
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

    public void deleteHistory(Integer id, Integer userId) {
        if (historyRepository.verifyIdOwner(id, userId).isEmpty()) {
            throw new OperationNotAllowed("not_allowed");
        }
        
        historyRepository.deleteById(id);
        
    }
}
