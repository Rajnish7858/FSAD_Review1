package com.learntrack.backend.controller;

import com.learntrack.backend.model.Attendance;
import com.learntrack.backend.model.User;
import com.learntrack.backend.repository.AttendanceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository repo;
    public AttendanceController(AttendanceRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Attendance> getAll(@AuthenticationPrincipal User user) {
        if (user.getRole() == User.Role.student) return repo.findByStudentId(user.getId());
        return repo.findAll();
    }

    @PostMapping
    public Attendance create(@RequestBody Attendance a) { return repo.save(a); }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> update(@PathVariable Long id, @RequestBody Attendance a) {
        return repo.findById(id).map(existing -> {
            existing.setStatus(a.getStatus());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.ok().build(); }
}
