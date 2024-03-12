package com.example.hirportal01.repository;

import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Long> {



    @Query(value= "select * from users where chat_name=:email", nativeQuery = true)
    Optional<Users> findUserByEmail(@Param("email")String username);
}
