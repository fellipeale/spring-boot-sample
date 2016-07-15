package br.com.cinq.greet.model;

import org.springframework.stereotype.Component;

import javax.validation.constraints.Size;

@Component
public class Greeting {

    @Size(min=5, max=300)
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}