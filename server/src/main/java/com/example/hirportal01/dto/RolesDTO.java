package com.example.hirportal01.dto;

import com.example.hirportal01.entity.Users;

import java.util.List;

public class RolesDTO {

    private Long id;
    private String title;

    private List<Users> users;


    public List<Users> getUsers() {
        return users;
    }

    public void setUsers(List<Users> users) {
        this.users = users;
    }



    public RolesDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
