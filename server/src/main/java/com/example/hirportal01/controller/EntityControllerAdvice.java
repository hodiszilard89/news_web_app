package com.example.hirportal01.controller;


import com.example.hirportal01.exception.InvalidEntityException;
import com.example.hirportal01.exception.EntityNotFoundException;
import com.example.hirportal01.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = UsersController.class)
public class EntityControllerAdvice {

    @ExceptionHandler(value= EntityNotFoundException.class)
    public ResponseEntity<Void> handelEntityNotFoundException(){
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(value= InvalidEntityException.class)
    public ResponseEntity<ErrorResponse> handleInvalidEntityException(InvalidEntityException exception){
        ErrorResponse errorResponse = new ErrorResponse(exception.getMessages());
        return  ResponseEntity.badRequest().body(errorResponse);
    }
}
