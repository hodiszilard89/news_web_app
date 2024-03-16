package com.example.hirportal01.dto;

import com.example.hirportal01.entity.News;
import com.example.hirportal01.entity.Users;

import java.util.Date;

public class CommentDTO {
    private Long id;
    private Users writer;
    private String text;

    private News news;

    private Date releasedate;

    public CommentDTO() {
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getReleasedate() {
        return releasedate;
    }

    public void setReleasedate(Date releasedate) {
        this.releasedate = releasedate;
    }
}
