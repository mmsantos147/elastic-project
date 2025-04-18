package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.UserDTO;
import com.elastic.aisearch.entity.User;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.UserService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "user")
public class UserController {
    private final UserService userService;
    private final UserSession userSession;

    @GetMapping
    public List<User> getUser() {
        return userService.getUser();
    }

    @PostMapping
    public void registerNewUser(@RequestBody User user) {
        userService.addNewUser(user);
    }

    @DeleteMapping(path = "{userEmail}")
    public void deleteUser(@PathVariable("userEmail") String email) {
        userService.deleteUser(email);
    }

    @PostMapping(path = "/login")
    public boolean verifyUser(@RequestBody UserDTO userDTO) {
        if (userService.searchUser(userDTO.email(), userDTO.password())) {
            userSession.setUserEmail(userDTO.email());
            userSession.setUserId(userDTO.id());
            userSession.setUserName(userDTO.name());
        }
        return userService.searchUser(userDTO.email(), userDTO.password());
    }
}
