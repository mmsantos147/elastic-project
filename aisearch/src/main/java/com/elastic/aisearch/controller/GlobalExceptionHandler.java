package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.Messages.FailMessageDTO;
import com.elastic.aisearch.exceptions.*;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WrongPasswordException.class)
    public ResponseEntity<FailMessageDTO> wrongPasswordExceptionHandler(Exception e) {
        return ResponseEntity.status(403).body(new FailMessageDTO(
                e.getMessage()));
    }

    @ExceptionHandler(EmailNotFound.class)
    public ResponseEntity<FailMessageDTO> emailNotFoundExceptionHandler(Exception e) {
        return ResponseEntity.status(403).body(new FailMessageDTO(
                e.getMessage()));
    }

    @ExceptionHandler(AlreadyFavorite.class)
    public ResponseEntity<FailMessageDTO> alreadyFavoriteExceptionHandler(Exception e) {
        return ResponseEntity.status(409).body(new FailMessageDTO(
                e.getMessage()));
    }

    @ExceptionHandler(EmailAlreadyExists.class)
    public ResponseEntity<FailMessageDTO> emailAlreadyExistsExceptionHandler(Exception e) {
        return ResponseEntity.status(403).body(new FailMessageDTO(
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

    @ExceptionHandler(ElasticServiceUnavailable.class)
    public ResponseEntity<FailMessageDTO> elasticSearchUnavailable(Exception e) {
        return ResponseEntity.status(503).body(new FailMessageDTO(e.getMessage()));
    }
}
