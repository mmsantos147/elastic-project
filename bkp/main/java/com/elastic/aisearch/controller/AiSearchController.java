package com.elastic.aisearch.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiSearchController {
    @GetMapping("/")
    public String hello() {
        return "hello world!!!!!!!!!!!!!!!!!!!!";
    }

    @GetMapping("/test")
    public String aaaa() {
        return "ssssssssss";
    }
}
