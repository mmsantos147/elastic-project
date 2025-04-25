package com.elastic.aisearch.dto;

public record RegisterDTO(
        String userName,
        String email,
        String password
) {}
