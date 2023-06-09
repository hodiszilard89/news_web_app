package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.repository.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl {
    private CommentRepository commentRepository;
    private ModelMapper modelMapper;

    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    public List<CommentDTO> findAll(){
        List<Comment> commentList = commentRepository.findAll();

        return commentList.stream().map(comment -> modelMapper
                .map(comment,CommentDTO.class))
                .collect(Collectors.toList());
    }
}
