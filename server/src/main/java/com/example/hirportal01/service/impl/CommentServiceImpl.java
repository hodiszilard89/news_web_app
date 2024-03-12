package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.repository.CommentRepository;
import com.example.hirportal01.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.metamodel.EntityType;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final GenerationServiceImpl generationService;
    @PersistenceContext
    private final EntityManager entityManager;
    private final ModelMapper modelMapper;

    public CommentServiceImpl(CommentRepository commentRepository, GenerationServiceImpl generationService, EntityManager entityManager, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.generationService = generationService;
        this.entityManager = entityManager;

        this.modelMapper = modelMapper;
    }

    public List<CommentDTO> findAll(){
        List<Comment> commentList = commentRepository.findAll();
        return commentList.stream().map(comment -> modelMapper
                .map(comment,CommentDTO.class))
                .collect(Collectors.toList());
    }


    public CommentDTO create(CommentDTO commentDTO){
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        Comment comment = modelMapper.map(commentDTO,Comment.class);
        if (comment.getText().contains("delete")) {
            generationService.generation();
            System.out.println("DELETE");
            }


        return modelMapper.map(commentRepository.save(comment),CommentDTO.class);
    }
}
