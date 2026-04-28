package com.learntrack.backend.controller;

import com.learntrack.backend.model.User;
import com.learntrack.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe(@AuthenticationPrincipal User user, @RequestBody Map<String, String> body) {
        if (body.containsKey("name")) user.setName(body.get("name"));
        if (body.containsKey("email")) user.setEmail(body.get("email"));
        if (body.containsKey("phone")) user.setPhone(body.get("phone"));
        if (body.containsKey("dob")) user.setDob(body.get("dob"));
        if (body.containsKey("password") && !body.get("password").isBlank())
            user.setPassword(passwordEncoder.encode(body.get("password")));
        return ResponseEntity.ok(userRepository.save(user));
    }

    @GetMapping("/students")
    public List<User> getStudents() {
        return userRepository.findByRole(User.Role.student);
    }
}
