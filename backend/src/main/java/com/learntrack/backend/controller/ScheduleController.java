package com.learntrack.backend.controller;

import com.learntrack.backend.model.Schedule;
import com.learntrack.backend.repository.ScheduleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleRepository repo;
    public ScheduleController(ScheduleRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Schedule> getAll() { return repo.findAll(); }

    @PostMapping
    public Schedule create(@RequestBody Schedule s) { return repo.save(s); }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> update(@PathVariable Long id, @RequestBody Schedule s) {
        return repo.findById(id).map(existing -> {
            existing.setDay(s.getDay()); existing.setTime(s.getTime());
            existing.setSubject(s.getSubject()); existing.setRoom(s.getRoom());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.ok().build(); }
}
