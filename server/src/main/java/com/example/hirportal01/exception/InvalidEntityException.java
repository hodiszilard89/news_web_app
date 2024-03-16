package com.example.hirportal01.exception;

import java.util.List;

public class InvalidEntityException extends RuntimeException{
    private List<String> messages;

    public InvalidEntityException(String message, List<String> messages) {
        super(message);
        this.messages = messages;
    }

    public List<String> getMessages() {
        return messages;
    }
}
