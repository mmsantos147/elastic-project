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
@Table(name = "history")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String prompt;
    @Column(name = "user")
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public History(String prompt, LocalDate date, User user) {
        this.prompt = prompt;
        this.user = user;
    }

    @Override
    public String toString() {
        return "History{" +
                "id=" + id +
                ", prompt='" + prompt + '\'' +
                ", userId=" + user +
                '}';
    }
}
