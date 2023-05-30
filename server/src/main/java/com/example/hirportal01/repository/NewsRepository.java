package com.example.hirportal01.repository;

import com.example.hirportal01.entity.News;
import com.example.hirportal01.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Long> {
    @Query(value= "select * from news where type=:type", nativeQuery = true)
    List<News> findNewsByType(@Param("type")String type);

}
