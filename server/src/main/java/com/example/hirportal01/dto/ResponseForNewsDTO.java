package com.example.hirportal01.dto;

import java.util.List;

public class ResponseForNewsDTO {
    private boolean lastSide;
    private List<NewsDTO> newsList;

    public ResponseForNewsDTO() {
    }

    public List<NewsDTO> getNewsList() {
        return newsList;
    }

    public void setNewsList(List<NewsDTO> newsList) {
        this.newsList = newsList;
    }

    public boolean isLastSide() {
        return lastSide;
    }

    public void setLastSide(boolean lastSide) {
        this.lastSide = lastSide;
    }
}
