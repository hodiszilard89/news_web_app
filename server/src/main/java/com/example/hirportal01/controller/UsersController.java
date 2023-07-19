package com.example.hirportal01.controller;

import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.Law;
import com.example.hirportal01.exception.InvalidEntityException;
import com.example.hirportal01.service.impl.UsersServiceImpl;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController

@RequestMapping(path = "/users")
public class UsersController {

    private final ModelMapper modelMapper;
    private final UsersServiceImpl usersService;
    private static final Logger LOGGER= LoggerFactory.getLogger(UsersController.class);

    public UsersController(ModelMapper modelMapper, UsersServiceImpl usersService) {
        this.modelMapper = modelMapper;
        this.usersService = usersService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<UsersDTO>> findAll() {
        List<UsersDTO> users = usersService.findAll();
        return ResponseEntity.ok().body(users);
    }

    @RequestMapping(path="/addcomment",method = RequestMethod.POST)
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO commentDTO) {

        usersService.addComment(commentDTO);
        return ResponseEntity.ok().body(null);
    }

    /**
     * FUNKCIONÁLIS FORMÁT ELEMEZNI!!
     */

    @RequestMapping(path="/{id}",method = RequestMethod.GET)
    public ResponseEntity<UsersDTO> findById(@PathVariable Long id) {  //
        Optional<UsersDTO> optionalUser = usersService.findById(id);
        if (optionalUser.isPresent()){
            return ResponseEntity.ok(optionalUser.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @RequestMapping(method = RequestMethod.POST)
   // public ResponseEntity<UsersDTO> create(@RequestBody @Valid UsersDTO  usersDTO, BindingResult bindingResult) {
        //checkErrors(bindingResult);
    public ResponseEntity<UsersDTO> create(@RequestBody String jsonString) {
        System.out.println(jsonString);
        JSONObject jsonObject = new JSONObject(jsonString);
        UsersDTO usersDTO=modelMapper.map(jsonObject.toMap(),UsersDTO.class);
        Date dt = new Date();
        //newsDTO.setReleaseDate(dt);
        //System.out.println(newsDTO.getReleaseDate());
        //ystem.out.println(newsDTO.getImgPath());
        System.out.println("laws"+ usersDTO.getLaws()+" "+new Law().getUsers());
        return ResponseEntity.status(HttpStatus.CREATED).
                body(usersService.create(usersDTO));
    }
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<UsersDTO> update(@RequestBody UsersDTO usersDTO) {
        UsersDTO updatedUser = usersService.update(usersDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id){
        usersService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private void checkErrors(BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            List<String> messages = new ArrayList<>();

            for(FieldError fieldError:bindingResult.getFieldErrors()){
                messages.add(fieldError.getField()+" = "+fieldError.getDefaultMessage());
            }
            throw new InvalidEntityException("invalid user",messages);
        }
    }
}
