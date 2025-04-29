package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.LanguageDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.entity.User;
import com.elastic.aisearch.security.UserSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/language")
public class LanguageController {
    private final UserSession userSession;

    public LanguageController(UserSession userSession) {
        this.userSession = userSession;
    }

    @PostMapping
    public SuccessMessageDTO setLangUserSession(LanguageDTO language) {
        userSession.setLanguage(language.toString());
        return new SuccessMessageDTO(
                "success_langset"
        );
    }
}
