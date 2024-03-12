package com.example.hirportal01.controller;

import com.example.hirportal01.dto.CommentDTO;

import com.example.hirportal01.service.impl.CommentServiceImpl;

import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentServiceImpl commentService;

    private final ModelMapper modelMapper;
    public CommentController(CommentServiceImpl commentService, ModelMapper modelMapper) {
        this.commentService = commentService;


        this.modelMapper = modelMapper;
    }


    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<CommentDTO>> findAll(){
        return ResponseEntity.ok(commentService.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CommentDTO> create(@RequestBody String string){
        JSONObject jsonObject = new JSONObject(string);
        CommentDTO commentDTO=modelMapper.map(jsonObject.toMap(),CommentDTO.class);
        if (commentDTO.getText().contains("delete"))
            {
               // generationService.generation();
            }
        Date dt = new Date();

        commentDTO.setReleasedate(dt);

        return ResponseEntity.ok(commentService.create(commentDTO));
    }
}
