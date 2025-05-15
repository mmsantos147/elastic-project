package com.elastic.aisearch.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
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
    private Map<Integer, GraphNodeDTO> nodesMap; 

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

    public GraphNodeDTO generateCompleteGraph(Integer rootId, int maxDepth) {
        this.nodesMap = new HashMap<>();
        Set<Integer> currentPath = new HashSet<>(); 
        
        return generateGraph(rootId, 0, maxDepth, currentPath);
    }

    private GraphNodeDTO generateGraph(Integer id, int currentDepth, int maxDepth, Set<Integer> currentPath) {
        if (currentDepth > maxDepth) return null;
        
        if (nodesMap.containsKey(id)) {
            GraphNodeDTO existingNode = nodesMap.get(id);
            return new GraphNodeDTO(
                existingNode.id(), 
                existingNode.url(), 
                existingNode.title(), 
                new ArrayList<>(), 
                true
            ); 
        }
        
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new ArticleDoesNotExists("article_not_found"));
        
        GraphNodeDTO currentNode = new GraphNodeDTO(
            article.getId(), 
            article.getUrl(), 
            article.getTitle(), 
            new ArrayList<>(), 
            false
        );
        
        nodesMap.put(id, currentNode);
        
        currentPath.add(id);
        
        List<GraphNodeDTO> connections = new ArrayList<>();
        
        for (Article neighbor : article.getConnectedArticles()) {
            Integer neighborId = neighbor.getId();
            
            GraphNodeDTO neighborNode = generateGraph(neighborId, currentDepth + 1, maxDepth, currentPath);
            
            if (neighborNode != null) {
                connections.add(neighborNode);
            }
        }
        
        currentPath.remove(id);
        
        currentNode = new GraphNodeDTO(
            currentNode.id(),
            currentNode.url(),
            currentNode.title(),
            connections,
            currentNode.isCyclicReference()
        );
        
        nodesMap.put(id, currentNode);
        
        return currentNode;
    }

}
