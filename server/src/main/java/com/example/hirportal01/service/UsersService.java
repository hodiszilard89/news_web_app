package com.example.hirportal01.service;

import com.example.hirportal01.dto.UsersDTO;


import java.util.List;
import java.util.Optional;

public interface UsersService {
    List<UsersDTO> findAll();
    UsersDTO create(UsersDTO newsDTO);
    Optional<UsersDTO> findById(Long id);
    UsersDTO update(UsersDTO usersDTO);
    void delete(Long id);
}
