package com.elastic.aisearch.security;

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

@Data
@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSession {
    private String streamId;
    private Integer userId;
    private String userEmail;
    private String userName;
    private List<String> userHistory;
    private String language;
}
