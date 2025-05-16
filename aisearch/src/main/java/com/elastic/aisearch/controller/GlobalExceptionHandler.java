package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.Messages.FailMessageDTO;
import com.elastic.aisearch.exceptions.ArticleDoesNotExists;
import com.elastic.aisearch.exceptions.OperationNotAllowed;

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

    @ExceptionHandler(OperationNotAllowed.class)
    public ResponseEntity<FailMessageDTO> forbiddenOperation(Exception e) {
        return ResponseEntity.status(403).body(new FailMessageDTO(e.getMessage()));
    }

    @ExceptionHandler(ArticleDoesNotExists.class)
    public ResponseEntity<FailMessageDTO> articleNotFound(Exception e) {
        return ResponseEntity.status(404).body(new FailMessageDTO(e.getMessage()));
    }
}
