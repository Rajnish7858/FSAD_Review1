package com.learntrack.backend.controller;

import com.learntrack.backend.model.CalendarEvent;
import com.learntrack.backend.repository.CalendarEventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarEventRepository repo;
    public CalendarController(CalendarEventRepository repo) { this.repo = repo; }

    @GetMapping
    public List<CalendarEvent> getAll() { return repo.findAll(); }

    @PostMapping
    public CalendarEvent create(@RequestBody CalendarEvent e) { return repo.save(e); }

    @PutMapping("/{id}")
    public ResponseEntity<CalendarEvent> update(@PathVariable Long id, @RequestBody CalendarEvent e) {
        return repo.findById(id).map(existing -> {
            existing.setEvent(e.getEvent()); existing.setDescription(e.getDescription());
            existing.setDate(e.getDate()); existing.setType(e.getType());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.ok().build(); }
}
