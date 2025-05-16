package com.elastic.aisearch.exceptions;

public class UserDoesNotFound extends RuntimeException {
    public UserDoesNotFound(String message) {
        super(message);
    }
}
