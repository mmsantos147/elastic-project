package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.LanguageDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.security.UserSession;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/language")
@RequiredArgsConstructor
public class LanguageController {
    private final UserSession userSession;

    @PostMapping
    public SuccessMessageDTO setLangUserSession(@RequestBody LanguageDTO languageDTO) {
        userSession.setLanguage(languageDTO.language());
        return new SuccessMessageDTO(
                "success_langset"
        );
    }
}
