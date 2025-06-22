package com.elastic.aisearch.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elastic.aisearch.dto.AIAbstractDTO;
import com.elastic.aisearch.dto.ToResumeDTO;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.ChatGptService;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/ai")
@AllArgsConstructor
public class ChatGPTController {
    
    private final ChatGptService chatGptService;
    private final UserSession userSession;

    @PostMapping("/")
    public ResponseEntity<AIAbstractDTO> makeResume(@RequestBody ToResumeDTO dto) {
        return ResponseEntity.ok(chatGptService.makeAiResume(userSession, dto));
    }
    
    
}
