package com.example.hirportal01.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

public class LikeDTO {
    @JsonBackReference(value="likeToUser")
    private UsersDTO user;
    @JsonBackReference(value="likeToNews")
    private NewsDTO news;

    public LikeDTO() {
    }

    public UsersDTO getUser() {
        return user;
    }

    public void setUser(UsersDTO user) {
        this.user = user;
    }

    public NewsDTO getNews() {
        return news;
    }

    public void setNews(NewsDTO news) {
        this.news = news;
    }
}
