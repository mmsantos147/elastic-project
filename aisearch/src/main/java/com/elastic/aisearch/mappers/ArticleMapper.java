package com.elastic.aisearch.mappers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.elastic.aisearch.dto.graph.ArticleDTO;
import com.elastic.aisearch.entity.Article;

@Component
public class ArticleMapper {
    

    public List<Article> toObject(List<ArticleDTO> articleDTOs) {
        List<Article> articles = new ArrayList<>();
        for (ArticleDTO articleDTO: articleDTOs) {
            Article article = new Article(
                articleDTO.id(), 
                articleDTO.title(), 
                articleDTO.url()
            );
            articles.add(article);
        }
        return articles;
    }
}
