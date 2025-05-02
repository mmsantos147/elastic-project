package com.elastic.aisearch.service;

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

    public List<User> getUser() {
        return userRepository.findAll();
    }

    public User getUserId(Integer id) {
        return userRepository.getReferenceById(id);
    }

    public Optional<User> getUserEmail(String email) {
        return userRepository.findUserByEmail(email);
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
            throw new IllegalStateException("email_does_not_exists");
        }

        userRepository.deleteById(userEmail.get().getId());
    }

    public Boolean searchUser(String email, String password) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()) {
            throw new IllegalStateException("email_does_not_exists");
        }
        return BCrypt.checkpw(password, user.get().getPassword());
    }
}
