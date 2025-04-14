package com.elastic.aisearch.service;

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

    public String addNewUser(User user) {
        Optional<User> userEmail = userRepository.findUserByEmail(user.getEmail());
        if (userEmail.isPresent()) {
            throw new IllegalStateException("user already exists");
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        return "User Registered Successfully";
    }

    public void deleteUser(String email) {
        Optional<User> userEmail = userRepository.findUserByEmail(email);
        if(userEmail.isEmpty()) {
            throw new IllegalStateException("user with email" + email + "does not exists");
        }

        userRepository.deleteById(userEmail.get().getId());
    }

    public User searchUserId(Integer userId) {
        return userRepository.findById(userId).get();
    }
    public boolean searchUser(String email, String password) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()) {
            throw new IllegalStateException("user with email" + email + "does not exists");
        }
        return BCrypt.checkpw(password, user.get().getPassword());
    }
}
