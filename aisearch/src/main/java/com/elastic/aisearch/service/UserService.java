package com.elastic.aisearch.service;

import com.elastic.aisearch.controller.GlobalExceptionHandler;
import com.elastic.aisearch.dto.RegisterDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.repository.UserRepository;

import lombok.AllArgsConstructor;

import com.elastic.aisearch.entity.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final GlobalExceptionHandler adviceController;

    public List<User> getUser() {
        return userRepository.findAll();
    }

    public SuccessMessageDTO addNewUser(RegisterDTO registerDTO) {
        Optional<User> userEmail = userRepository.findUserByEmail(registerDTO.email());
        if (userEmail.isPresent()) {
            throw new IllegalStateException("failed_registration");
        }

        User user = new User();
        user.setUserName(registerDTO.userName());
        user.setEmail(registerDTO.email());
        user.setPassword(BCrypt.hashpw(registerDTO.password(), BCrypt.gensalt()));
        userRepository.save(user);
        return new SuccessMessageDTO(
                "success_registration"
        );
    }

    public void deleteUser(String email) {
        Optional<User> userEmail = userRepository.findUserByEmail(email);
        if(userEmail.isEmpty()) {
            throw new IllegalStateException("user with email" + email + "does not exists");
        }

        userRepository.deleteById(userEmail.get().getId());
    }

    public boolean searchUser(String email, String password) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()) {
            throw new IllegalStateException("user with email" + email + "does not exists");
        }
        return BCrypt.checkpw(password, user.get().getPassword());
    }
}
