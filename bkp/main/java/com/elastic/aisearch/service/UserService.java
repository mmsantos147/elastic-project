package com.elastic.aisearch.service;

import com.elastic.aisearch.repository.UserRepository;
import com.elastic.aisearch.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUser() {
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        Optional<User> userEmail = userRepository.findUserByEmail(user.getEmail());
        if (userEmail.isPresent()) {
            throw new IllegalStateException("user already exists");
        }

        userRepository.save(user);
        System.out.println(user);
    }

    public void deleteUser(String email) {
        Optional<User> userEmail = userRepository.findUserByEmail(email);
        if(userEmail.isEmpty()) {
            throw new IllegalStateException("user with email" + email + "does not exists");
        }

        userRepository.deleteById(userEmail.get().getId());
    }
}
