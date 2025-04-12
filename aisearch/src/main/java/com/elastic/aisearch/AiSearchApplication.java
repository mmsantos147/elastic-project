package com.elastic.aisearch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.elastic.aisearch")
public class AiSearchApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiSearchApplication.class, args);
	}

}
