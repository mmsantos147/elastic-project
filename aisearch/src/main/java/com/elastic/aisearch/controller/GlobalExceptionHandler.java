package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.Messages.FailMessageDTO;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<FailMessageDTO> exceptionHandler(Exception e) {
        return ResponseEntity.badRequest().body(new FailMessageDTO(
                e.getMessage()));
    }
}
