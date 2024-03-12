package com.example.hirportal01.exception;

import java.util.ArrayList;
import java.util.List;

public class UserIsBlockedException extends RuntimeException {
    private List<String> messages = new ArrayList<String>();
    public UserIsBlockedException(String message, List<String> messages){
        super(message);
        this.messages=messages;
    }
    public UserIsBlockedException(String message){
       throw new UserIsBlockedException(message,this.messages);
    }
    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }
}
