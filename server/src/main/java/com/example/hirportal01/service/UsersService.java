package com.example.hirportal01.service;

import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.dto.LikeDTO;
import com.example.hirportal01.dto.UserDTOForRegistration;
import com.example.hirportal01.dto.UsersDTO;


import java.util.List;
import java.util.Optional;

public interface UsersService {
    List<UsersDTO> findAll();
    UsersDTO create(UsersDTO newsDTO);
    Optional<UsersDTO> findById(Long id);
    boolean checkEmail(String email);
    UsersDTO update(UsersDTO usersDTO);
    UsersDTO update(UserDTOForRegistration userDTOForRegistration) ;
    void delete(Long id);
    UsersDTO findUser(String username, String password);
    void addComment(CommentDTO commentDTO);
}