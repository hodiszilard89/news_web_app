package com.example.hirportal01.repository;

import com.example.hirportal01.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {

}
