package com.example.cetrificationpoject.service;

import com.example.cetrificationpoject.exception.InvalidCredentialsException;
import com.example.cetrificationpoject.exception.UserAlreadyExistsException;
import com.example.cetrificationpoject.model.User;
import com.example.cetrificationpoject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public void saveUser(User user){
        try{
            BCryptPasswordEncoder bc= new BCryptPasswordEncoder(12);
            user.setPassword(bc.encode(user.getPassword()));
            userRepository.save(user);

        }
        catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException("Username or email already exists.");
        }

    }

    public String login(User user)  {
        try {
            Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication auth = authenticationManager.authenticate(authentication);
            if (auth.isAuthenticated()) {
                return jwtService.generateToken(user.getUsername());

            }
        }
        catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password");
        } catch (Exception e) {
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        }
        return  "failed";
    }
}
