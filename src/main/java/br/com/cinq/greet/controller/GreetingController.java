package br.com.cinq.greet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import br.com.cinq.greet.model.Greeting;

@RestController
@RequestMapping("/greeting")
public class GreetingController {

    private Greeting greeting;

    @Autowired
    public GreetingController(Greeting greeting) {
        this.greeting = greeting;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void set(@Valid @RequestBody Greeting greeting) {
        this.greeting.setMessage(greeting.getMessage());
    }

    @RequestMapping(method = RequestMethod.GET)
    public Greeting get() {
        return greeting;
    }

}