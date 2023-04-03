package com.example.hirportal01.dto;

import com.example.hirportal01.entity.Users;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import java.util.List;


public class NewsDTO {
    public NewsDTO() {
    }

    private Long   id;
    @Column(columnDefinition = "text")
    private String text;
    private Users  writer;
    private String imgPath;
    private String title;

    public Users getWriter() {
        return writer;
    }

    public void setWriter(Users writer) {
        this.writer = writer;
    }

    public List<Users> getLikes() {
        return likes;
    }

    public void setLikes(List<Users> likes) {
        this.likes = likes;
    }

    private List<Users> likes;



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
}
