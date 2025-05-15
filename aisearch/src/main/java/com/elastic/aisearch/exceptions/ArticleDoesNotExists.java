package com.elastic.aisearch.exceptions;

public class ArticleDoesNotExists extends RuntimeException {
    public ArticleDoesNotExists(String message) {
        super(message);
    }
}
