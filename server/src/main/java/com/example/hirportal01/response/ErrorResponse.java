package com.example.hirportal01.response;

import java.util.List;

public class ErrorResponse {
    private List<String> messages;

    public ErrorResponse(List<String> messages) {
        this.messages = messages;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }
}
