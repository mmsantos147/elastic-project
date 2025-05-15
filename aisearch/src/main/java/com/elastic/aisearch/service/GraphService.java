package com.elastic.aisearch.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.elastic.aisearch.dto.graph.ArticleDTO;
import com.elastic.aisearch.dto.graph.GraphNodeDTO;
import com.elastic.aisearch.entity.Article;
import com.elastic.aisearch.exceptions.ArticleDoesNotExists;
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
        Map<Integer, Article> articleMap = articleRepository.findAll().stream()
                .collect(Collectors.toMap(Article::getId, Function.identity()));

        for (ArticleDTO dto : articleDTOs) {
            Article fromArticle = articleMap.get(dto.id());
            if (fromArticle == null)
                continue;

            List<Article> connections = new ArrayList<>(dto.connections().stream()
                    .map(articleMap::get)
                    .filter(Objects::nonNull)
                    .toList());

            fromArticle.setConnectedArticles(connections);
        }

        articleRepository.saveAll(articleMap.values());
    }

    public GraphNodeDTO generateGraph(Integer id, int currentDepth, int maxDepth, Set<Integer> visited) {
        if (visited.contains(id)) return null;
        if (currentDepth > maxDepth) return null;
    
        visited.add(id);
    
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new ArticleDoesNotExists("article_not_found"));
    
        List<GraphNodeDTO> children = new ArrayList<>();
        for (Article neighbor : article.getConnectedArticles()) {
            GraphNodeDTO child = generateGraph(neighbor.getId(), currentDepth + 1, maxDepth, visited);
            if (child != null) children.add(child);
        }
    
        return new GraphNodeDTO(article.getId(), article.getUrl(), article.getTitle(), children);
    }

}
