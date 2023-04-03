package com.example.hirportal01.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class News {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long   id;
    @Column(columnDefinition = "text")
    private String text;

    @ManyToMany(mappedBy = "likes")
    @JsonBackReference
    private List<Users> likes;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "users_id")
    private Users   writer;
    @Column(columnDefinition = "text")
    private String imgPath;
    private String title;

    public News() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Users getWriter() {
        return writer;
    }

    public void setWriter(Users writer) {
        this.writer = writer;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Users> getLikes() {
        return likes;
    }

    public void setLikes(List<Users> likes) {
        this.likes = likes;
    }
}
