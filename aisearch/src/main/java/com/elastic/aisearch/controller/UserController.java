package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.verify.FailedLoginDTO;
import com.elastic.aisearch.dto.verify.LoginVerifyDTO;
import com.elastic.aisearch.dto.Messages.SuccessLoginMessageDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.dto.RegisterDTO;
import com.elastic.aisearch.dto.UserDTO;
import com.elastic.aisearch.entity.User;
import com.elastic.aisearch.exceptions.EmailAlreadyExists;
import com.elastic.aisearch.exceptions.EmailNotFound;
import com.elastic.aisearch.exceptions.WrongPasswordException;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping(path = "/register")
    public SuccessMessageDTO registerNewUser(@RequestBody RegisterDTO registerDTO) throws EmailAlreadyExists {
        return userService.addNewUser(registerDTO);
    }

    @DeleteMapping(path = "{userEmail}")
    public void deleteUser(@PathVariable("userEmail") String email) throws EmailNotFound {
        userService.deleteUser(email);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<SuccessLoginMessageDTO> verifyUser(@RequestBody UserDTO userDTO) throws WrongPasswordException, EmailNotFound {
        if (!userService.searchUser(userDTO.email(), userDTO.password())) {
            throw new WrongPasswordException("wrong_password");
        }
        Optional<User> user = userService.getUserEmail(userDTO.email());
        userSession.setUserEmail(userDTO.email());
        userSession.setUserId(user.get().getId());
        userSession.setUserName(user.get().getUserName());
        return ResponseEntity.ok().body(new SuccessLoginMessageDTO(
                "success_login",
                user.get().getUserName()));
    }

    @PostMapping(path = "/verify")
    public ResponseEntity<?> loginVerify() {
        if (userSession.getUserId() != null) {
            return ResponseEntity.ok().body( new LoginVerifyDTO(
                    Boolean.TRUE,
                    userSession.getUserName()
            ));
        }
        return ResponseEntity.ok().body( new FailedLoginDTO(
                Boolean.FALSE
        ));
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<?> logoutUser(HttpSession httpSession) {
        httpSession.invalidate();
        return ResponseEntity.ok().body(new SuccessMessageDTO("success_logout"));
    }
}
