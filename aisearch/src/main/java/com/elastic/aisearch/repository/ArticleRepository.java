package com.elastic.aisearch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elastic.aisearch.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    
} 
