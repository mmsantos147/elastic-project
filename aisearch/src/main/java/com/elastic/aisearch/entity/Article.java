package com.elastic.aisearch.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "article")
@Getter
@Setter
@AllArgsConstructor
public class Article {

    @Id
    private Integer id;

    private String title;
    private String url;

    @ManyToMany
    @JoinTable(
        name = "article_connection",
        joinColumns = @JoinColumn(name = "from_id"),
        inverseJoinColumns = @JoinColumn(name = "to_id")
    )
    private List<Article> connectedArticles = new ArrayList<>();

    public Article(Integer id, String title, String url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
}
