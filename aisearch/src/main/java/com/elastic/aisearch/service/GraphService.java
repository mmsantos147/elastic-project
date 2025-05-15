package com.elastic.aisearch.service;

import java.util.ArrayList;
import java.util.HashMap;
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

    public GraphNodeDTO generateGraph(Integer rootId, int maxDepth) {
        Map<Integer, GraphNodeDTO> nodeMap = new HashMap<>();
        build(rootId, 0, maxDepth, nodeMap);
        return nodeMap.get(rootId);
    }

    private void build(Integer id,
            int currentDepth,
            int maxDepth,
            Map<Integer, GraphNodeDTO> nodeMap) {

        GraphNodeDTO dto = nodeMap.computeIfAbsent(id, k -> {
            Article article = articleRepository.findById(id)
                    .orElseThrow(() -> new ArticleDoesNotExists("article_not_found"));
            return new GraphNodeDTO(
                    article.getId(),
                    article.getUrl(),
                    article.getTitle(),
                    new ArrayList<>());
        });

        if (currentDepth >= maxDepth) {
            return;
        }

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleDoesNotExists("article_not_found"));
        for (Article neighbor : article.getConnectedArticles()) {
            build(neighbor.getId(), currentDepth + 1, maxDepth, nodeMap);
            dto.connections().add(nodeMap.get(neighbor.getId()));
        }
    }

}
