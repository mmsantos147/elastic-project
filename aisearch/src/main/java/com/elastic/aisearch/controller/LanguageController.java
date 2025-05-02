package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.LanguageDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.ChatGptService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/language")
@RequiredArgsConstructor
public class LanguageController {
    private final UserSession userSession;
    private final ChatGptService chatGptService;

    @PostMapping
    public SuccessMessageDTO setLangUserSession(LanguageDTO language) {
        userSession.setLanguage(language.toString());
        chatGptService.makeAiResume(userSession);
        return new SuccessMessageDTO(
                "success_langset"
        );
    }
}
