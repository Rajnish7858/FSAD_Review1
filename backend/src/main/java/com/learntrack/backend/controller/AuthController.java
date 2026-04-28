package com.learntrack.backend.controller;

import com.learntrack.backend.model.User;
import com.learntrack.backend.repository.UserRepository;
import com.learntrack.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        return userRepository.findByUsername(body.get("username"))
                .filter(user -> passwordEncoder.matches(body.get("password"), user.getPassword()))
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
                    Map<String, Object> userMap = new java.util.HashMap<>();
                    userMap.put("id", user.getId());
                    userMap.put("name", user.getName());
                    userMap.put("username", user.getUsername());
                    userMap.put("role", user.getRole().name());
                    userMap.put("email", user.getEmail() != null ? user.getEmail() : "");
                    userMap.put("phone", user.getPhone() != null ? user.getPhone() : "");
                    userMap.put("dob", user.getDob() != null ? user.getDob() : "");
                    userMap.put("major", user.getMajor() != null ? user.getMajor() : "");
                    Map<String, Object> response = new java.util.HashMap<>();
                    response.put("token", token);
                    response.put("user", userMap);
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }
}
