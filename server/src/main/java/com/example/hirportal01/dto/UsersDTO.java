package com.example.hirportal01.dto;

import com.example.hirportal01.entity.News;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class UsersDTO {
    private Long Id;
    @NotBlank
    private String chatName;
    @NotBlank
    private String firstName;
    @NotBlank(message = "nem lehet üres")
    private String secName;
    private List<News> likes;
    public UsersDTO() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecName() {
        return secName;
    }

    public void setSecName(String secName) {
        this.secName = secName;
    }

    public List<News> getLikes() {
        return likes;
    }

    public void setLikes(List<News> likes) {
        this.likes = likes;
    }
}
