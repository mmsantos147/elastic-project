package com.elastic.aisearch.service;

import java.util.ArrayList;
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

    public void generateConnections(List<ArticleDTO> articleDTOs) {
    for (ArticleDTO dto : articleDTOs) {
        Article fromArticle = articleRepository.findById(dto.id())
            .orElseThrow(() -> new RuntimeException("Article not found: " + dto.id()));

        List<Article> connections = new ArrayList<>();
        for (Integer connectedId : dto.connections()) {
            articleRepository.findById(connectedId).ifPresent(connections::add);
        }

        fromArticle.setConnectedArticles(connections);
        articleRepository.save(fromArticle);
    }
}

}
