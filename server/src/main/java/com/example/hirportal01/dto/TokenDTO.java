package com.example.hirportal01.dto;




public class TokenDTO {
    private String value;
    public TokenDTO( String value){
        this.value=value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
