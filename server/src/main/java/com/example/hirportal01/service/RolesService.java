package com.example.hirportal01.service;

import com.example.hirportal01.dto.RolesDTO;

import java.util.List;

public interface RolesService {
    RolesDTO create(RolesDTO rolesDTO);
    List<RolesDTO>findAll();
    void delete(Long id);
    RolesDTO update(RolesDTO rolesDTO);
    RolesDTO findById(Long id);
    }


