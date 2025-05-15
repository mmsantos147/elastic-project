package com.elastic.aisearch.mappers;

import com.elastic.aisearch.dto.RegisterDTO;
import com.elastic.aisearch.entity.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toObject(RegisterDTO registerDTO) {
        return new User(
                registerDTO.userName(),
                registerDTO.email(),
                BCrypt.hashpw(registerDTO.password(), BCrypt.gensalt())
        );
    }
}
