package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.RegisterDTO;
import com.elastic.aisearch.dto.UserDTO;
import com.elastic.aisearch.entity.User;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "user")
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserSession userSession;

    @PostMapping("/init")
    public ResponseEntity<String> createFirstSession(HttpSession session) {
        
        if (session.isNew()) {
            log.info("Nova sessão criada!");
        } else {
            log.info("A sessão já existia!");
        }

        return ResponseEntity.ok("");
    } 
    
    
    @GetMapping
    public List<User> getUser() {
        return userService.getUser();
    }

    @PostMapping
    public RegisterDTO registerNewUser(@RequestBody User user) {
        return userService.addNewUser(user);
    }

    @DeleteMapping(path = "{userEmail}")
    public void deleteUser(@PathVariable("userEmail") String email) {
        userService.deleteUser(email);
    }

    @PostMapping(path = "/login")
    public boolean verifyUser(@RequestBody UserDTO userDTO) {
        if (userService.searchUser(userDTO.email(), userDTO.password())) {
            userSession.setUserEmail(userDTO.email());
            userSession.setUserName(userDTO.userName());
        }
        return userService.searchUser(userDTO.email(), userDTO.password());
    }
}
