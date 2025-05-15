package com.elastic.aisearch.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "favorite")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String url;

    @Column(columnDefinition = "LONGTEXT")
    private String content;
    
    @Column(name = "reading_time")
    private Integer readingTime;
    private LocalDate date;
    private Integer elasticId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public Favorite(String title, String url, String content, Integer readingTime, LocalDate date, Integer elasticId) {
        this.title = title;
        this.url = url;
        this.content = content;
        this.readingTime = readingTime;
        this.date = date;
        this.elasticId = elasticId;
    }
}
