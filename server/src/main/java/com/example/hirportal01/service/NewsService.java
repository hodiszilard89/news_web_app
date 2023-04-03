package com.example.hirportal01.service;

import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.News;
import com.example.hirportal01.entity.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NewsService {
    Optional<NewsDTO> findByID(Long id);
    List<NewsDTO>  findAll();
    void delete(Long id);
    NewsDTO update(NewsDTO newsDTO);
    NewsDTO save(NewsDTO newsDTO);
    List<UsersDTO> getLikers(Long id);
}
