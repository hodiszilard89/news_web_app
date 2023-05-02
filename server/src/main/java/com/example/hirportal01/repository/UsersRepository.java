package com.example.hirportal01.repository;
import com.example.hirportal01.entity.Law;
import com.example.hirportal01.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users,Long> {
    @Query(value= "select * from users where chat_name=:username AND password =:password", nativeQuery = true)
    Optional<Users> findUser(@Param("username")String username, @Param("password") String password);

    @Query(value= "select * from users where chat_name=:email", nativeQuery = true)
    Optional<Users> findUserByEmail(@Param("email")String username);

}
