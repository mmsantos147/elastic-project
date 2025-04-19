package com.elastic.aisearch.controller;

import java.time.Instant;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.StreamService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class StreamController {
    
    private final UserSession session;
    private final StreamService streamService;

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        session.setStreamId(String.valueOf(Instant.now().toEpochMilli()));
        SseEmitter emmiter = streamService.createEmitter(session.getStreamId());
        return emmiter;
    }
}
