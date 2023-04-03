package com.example.hirportal01.controller;

import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.exception.InvalidEntityException;
import com.example.hirportal01.service.impl.UsersServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/users")
public class UsersController {

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
    public ResponseEntity<UsersDTO> create(@RequestBody @Valid UsersDTO  usersDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        return ResponseEntity.status(HttpStatus.CREATED).
                body(usersService.create(usersDTO));
    }
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<UsersDTO> update(@RequestBody @Valid UsersDTO usersDTO) {
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
