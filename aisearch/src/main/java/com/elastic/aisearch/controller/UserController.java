package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.UserDTO;
import com.elastic.aisearch.entity.User;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;
    private final UserSession userSession;

    @Autowired
    public UserController(UserService userService, UserSession userSession) {
        this.userService = userService;
        this.userSession = userSession;
    }

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
