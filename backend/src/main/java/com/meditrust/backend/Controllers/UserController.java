package com.meditrust.backend.Controllers;

import com.meditrust.backend.Dto.LoginDto;
import com.meditrust.backend.Dto.SignUpDto;
import com.meditrust.backend.Dto.UserResponseDto;
import com.meditrust.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> registerUser(@RequestBody SignUpDto request) {
        UserResponseDto user = userService.registerUser(request);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<UserResponseDto> loginUser(@RequestBody LoginDto request) {
        UserResponseDto user = userService.loginUser(request);
        return ResponseEntity.ok(user);
    }
}
