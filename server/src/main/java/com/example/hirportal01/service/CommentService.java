package com.example.hirportal01.service;

import com.example.hirportal01.dto.CommentDTO;
import java.util.List;

public interface CommentService {
    List<CommentDTO> findAll();
    CommentDTO create(CommentDTO commentDTO);
}
