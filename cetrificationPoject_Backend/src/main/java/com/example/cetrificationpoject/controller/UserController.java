package com.example.cetrificationpoject.controller;

import com.example.cetrificationpoject.model.User;
import com.example.cetrificationpoject.response.ApiResponse;
import com.example.cetrificationpoject.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController

public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody User user){
        try {
            userService.saveUser(user);
            ApiResponse response = new ApiResponse(200, "User registered successfully",true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(400, "Registration failed: " + e.getMessage(),true);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody User user, HttpServletResponse response) {
        if (user == null || user.getUsername() == null || user.getUsername().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty()) {
            ApiResponse errorResponse = new ApiResponse(400, "Username or password cannot be null or empty", true);
            return ResponseEntity.badRequest().body(errorResponse);
        }
        try {
            String token = userService.login(user);
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60);
            response.addCookie(cookie);
            ApiResponse successResponse = new ApiResponse(200, "User logged in successfully", true);
            return ResponseEntity.ok(successResponse);
        } catch (BadCredentialsException e) {
            ApiResponse errorResponse = new ApiResponse(401, "Invalid username or password", true);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        } catch (RuntimeException e) {
            ApiResponse errorResponse = new ApiResponse(500, "An error occurred " , true);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


}
