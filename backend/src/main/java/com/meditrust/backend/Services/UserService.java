package com.meditrust.backend.Services;

import com.meditrust.backend.Dto.LoginDto;
import com.meditrust.backend.Dto.SignUpDto;
import com.meditrust.backend.Dto.UserResponseDto;
import com.meditrust.backend.Entities.UserEntity;
import com.meditrust.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponseDto loginUser(LoginDto request) {
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new UserResponseDto(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    public UserResponseDto registerUser(SignUpDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        UserEntity savedUser = userRepository.save(user);
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setEmail(savedUser.getEmail());
        userResponseDto.setId(savedUser.getId());
        userResponseDto.setName(savedUser.getName());
        userResponseDto.setRole(savedUser.getRole());
        return userResponseDto;
    }
}
