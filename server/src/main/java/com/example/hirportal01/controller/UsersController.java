package com.example.hirportal01.controller;

import com.example.hirportal01.dto.*;
import com.example.hirportal01.exception.InvalidEntityException;
import com.example.hirportal01.service.ImageService;
import com.example.hirportal01.service.impl.UsersServiceImpl;
//import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@RestController

@RequestMapping(path = "/users")
public class UsersController {
    final String IMAGE_PATH="./uploads/image.jpeg";
    private final UsersServiceImpl usersService;

    private static final Logger LOGGER= LoggerFactory.getLogger(UsersController.class);

    public UsersController(UsersServiceImpl usersService) {

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

    public ResponseEntity<UsersDTO> create(@RequestBody UsersDTO usersDTO) {
       // UsersDTO usersDTO = userDTOForRegistration.getUsersDTO();
//        String image=userDTOForRegistration.getImage();
//        try{
//        System.out.println(objectMapper.writeValueAsString(userDTOForRegistration.getUsersDTO()));}
//        catch ( Exception e){
//            System.out.println(e.toString());
//        }
//        String jsonString="";
//        System.out.println(jsonString);
//
//        //ha nincs képküldés
        if (usersDTO.getImagePath().isEmpty()){
            usersDTO.setImagePath(IMAGE_PATH);
        }

        return ResponseEntity.status(HttpStatus.CREATED).
                body(usersService.create(usersDTO));

    }

    @RequestMapping(path = "/checkemail/{email}",method = RequestMethod.GET)
    public ResponseEntity<Boolean> chechEmail(@PathVariable String email){

        return ResponseEntity.ok(usersService.checkEmail(email));
    }


    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<UsersDTO> update(@RequestBody UserDTOForRegistration userDTOForRegistration)  {
        UsersDTO updatedUser= usersService.update(userDTOForRegistration);
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
