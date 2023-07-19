package com.example.hirportal01.dto;

//import com.example.hirportal01.entity.Comment;
//import com.example.hirportal01.entity.Users;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//
//import javax.persistence.Column;
import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.TypeOfNews;
import com.example.hirportal01.entity.Users;
import org.hibernate.mapping.Array;

import javax.persistence.Column;

import java.util.*;


public class NewsDTO {
    public NewsDTO() {
    }

    private Long id;
    @Column(columnDefinition = "text")
    private String text;

    private  Set<TypeOfNews>types;
    private Users  writer;
    private String imgPath;
    private String title;
    private String subtitle;
    private List<Users> likes;

    public String getSubtitle() {
        return subtitle;
    }
    private Date releaseDate;
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

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

    private List<CommentDTO> comments;


    public Set<TypeOfNews> getTypes() {
        return types;
    }

    public void setTypes(Set<TypeOfNews> types) {
        this.types = types;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
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

}
