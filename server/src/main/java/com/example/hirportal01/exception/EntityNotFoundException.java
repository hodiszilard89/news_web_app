package com.example.hirportal01.exception;

import java.util.ArrayList;
import java.util.List;

public class EntityNotFoundException extends RuntimeException{
    private List<String> messages = new ArrayList<String>();
    public EntityNotFoundException(String message, List<String> messages) {

        super(message);
        this.messages=messages;
    }
    public EntityNotFoundException(String message){
        throw new EntityNotFoundException(message,this.messages);
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }
}
