package com.example.hirportal01.dto;

import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.Users;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import java.util.List;
import java.util.UUID;


public class NewsDTO {
    public NewsDTO() {
    }

    private Long id;
    @Column(columnDefinition = "text")
    private String text;
    @Column(columnDefinition = "text")
    private List<Comment> comments;
    private String type;
    private UsersDTO  writer;
    private String imgPath;
    private String title;

    private List<UsersDTO> likes;

    public UsersDTO getWriter() {
        return writer;
    }

    public void setWriter(UsersDTO writer) {
        this.writer = writer;
    }

    public List<UsersDTO> getLikes() {
        return likes;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setLikes(List<UsersDTO> likes) {
        this.likes = likes;
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

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
