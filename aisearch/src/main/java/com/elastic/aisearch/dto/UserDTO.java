package com.elastic.aisearch.dto;

public record UserDTO(
        Integer id,
        String name,
        String email,
        String password
) {}
