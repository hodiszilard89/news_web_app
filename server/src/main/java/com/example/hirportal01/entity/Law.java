package com.example.hirportal01.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Set;


@Entity
public class Law {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;


    @ManyToMany
    @JoinTable(name = "user_laws",
            joinColumns = @JoinColumn(name = "law_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id"))
    @JsonBackReference
    private Set<Users> users;

    public Law() {
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

    public Set<Users> getUsers() {
        return users;
    }

    public void setUsers(Set users) {
        this.users = users;
    }
}

