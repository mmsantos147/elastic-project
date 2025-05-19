package com.elastic.aisearch.exceptions;

public class ElasticServiceUnavailable extends RuntimeException {
    public ElasticServiceUnavailable(String message) {
        super(message);
    }
}
