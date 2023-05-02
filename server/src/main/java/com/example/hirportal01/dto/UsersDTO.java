package com.example.hirportal01.dto;

import com.example.hirportal01.entity.Law;
import com.example.hirportal01.entity.News;
import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class UsersDTO {
    private Long Id;

    public String getEmail() {
        return email;
    }
@Column(unique = true, nullable = false)
    public void setEmail(String email) {
        this.email = email;
    }

    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String chatName;
    @NotBlank
    private String firstName;
    @NotBlank(message = "nem lehet üres")
    private String secName;
    private List<News> likes;
    //@JsonBackReference
    private List<Law> laws;

    private Date birthDay;
    public UsersDTO() {
    }

    public Date getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(Date birthDay) {
        this.birthDay = birthDay;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
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

    public List<Law> getLaws() {
        return laws;
    }

    public void setLaws(List<Law> laws) {
        this.laws = laws;
    }

}
