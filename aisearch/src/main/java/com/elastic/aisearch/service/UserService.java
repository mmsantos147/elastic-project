package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.RegisterDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.exceptions.EmailAlreadyExists;
import com.elastic.aisearch.exceptions.EmailNotFound;
import com.elastic.aisearch.mappers.UserMapper;
import com.elastic.aisearch.repository.UserRepository;

import lombok.AllArgsConstructor;

import com.elastic.aisearch.entity.User;
import com.elastic.aisearch.exceptions.UserDoesNotFound;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<User> getUser() {
        return userRepository.findAll();
    }

    public User getUserId(Integer id) {
        return userRepository.getReferenceById(id);
    }

    public Optional<User> getUserEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public SuccessMessageDTO addNewUser(RegisterDTO registerDTO) throws EmailAlreadyExists {
        Optional<User> userEmail = userRepository.findUserByEmail(registerDTO.email());
        if (userEmail.isPresent()) {
            throw new EmailAlreadyExists("failed_registration");
        }

        User user = userMapper.toObject(registerDTO);
        userRepository.save(user);
        return new SuccessMessageDTO(
                "success_registration"
        );
    }

    public void deleteUser(String email) throws EmailNotFound {
        Optional<User> userEmail = userRepository.findUserByEmail(email);
        if(userEmail.isEmpty()) {
            throw new EmailNotFound("email_does_not_exists");
        }

        userRepository.deleteById(userEmail.get().getId());
    }

    public Boolean searchUser(String email, String password) throws EmailNotFound {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()) {
            throw new EmailNotFound("email_does_not_exists");
        }
        return BCrypt.checkpw(password, user.get().getPassword());
    }

    public User fetchUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new UserDoesNotFound("failed_fetch_user"));
    }

}
