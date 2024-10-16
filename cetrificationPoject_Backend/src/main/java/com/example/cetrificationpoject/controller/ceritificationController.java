package com.example.cetrificationpoject.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class ceritificationController {
    @RequestMapping("/dashboard")
    public String hello(){
        System.out.println("hello");
        return "hello verybody";
    }
}
