package com.example.hirportal01.service;

import com.example.hirportal01.dto.LawDTO;

import java.util.List;

public interface LawService {
    LawDTO create(LawDTO lawDTO);
    List<LawDTO>findAll();
    void delete(Long id);
    LawDTO update(LawDTO lawDTO);
    LawDTO findById(Long id);
    }


