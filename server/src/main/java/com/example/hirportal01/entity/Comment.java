package com.example.hirportal01.entity;

//import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date releaseDate;
    @ManyToOne
  //  @JoinColumn(name = "users_id", referencedColumnName = "users_id")
    @JsonBackReference(value="commentWriter")
    private Users writer;
    @ManyToOne()
    @JoinColumn(name = "news_id")
    @JsonBackReference(value="newsWriter")
    private News news;
    @Column(columnDefinition = "text")
    private String text;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getWriter() {
        return writer;
    }

    public void setWriter(Users writer) {
        this.writer = writer;
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }
}
