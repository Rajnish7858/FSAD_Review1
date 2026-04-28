package com.learntrack.backend.controller;

import com.learntrack.backend.model.Announcement;
import com.learntrack.backend.repository.AnnouncementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementRepository repo;
    public AnnouncementController(AnnouncementRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Announcement> getAll() { return repo.findAll(); }

    @PostMapping
    public Announcement create(@RequestBody Announcement a) { return repo.save(a); }

    @PutMapping("/{id}")
    public ResponseEntity<Announcement> update(@PathVariable Long id, @RequestBody Announcement a) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(a.getTitle()); existing.setMessage(a.getMessage());
            existing.setDate(a.getDate()); existing.setPriority(a.getPriority());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.ok().build(); }
}
