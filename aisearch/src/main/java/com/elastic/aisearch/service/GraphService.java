package com.elastic.aisearch.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.elastic.aisearch.dto.graph.ArticleDTO;
import com.elastic.aisearch.entity.Article;
import com.elastic.aisearch.mappers.ArticleMapper;
import com.elastic.aisearch.repository.ArticleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GraphService {
    
    private final ArticleMapper articleMapper;
    private final ArticleRepository articleRepository;

    public void bulkArticles(List<ArticleDTO> articles) {
        List<Article> articlesToSave = articleMapper.toObject(articles);
        articleRepository.saveAll(articlesToSave);
    }

}
