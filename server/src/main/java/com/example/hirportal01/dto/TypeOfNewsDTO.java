package com.example.hirportal01.dto;

import com.example.hirportal01.entity.News;
import com.example.hirportal01.entity.Users;

import java.util.List;

public class TypeOfNewsDTO  {

    private Long id;
    private String title;

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
