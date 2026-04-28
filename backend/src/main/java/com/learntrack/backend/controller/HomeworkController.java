package com.learntrack.backend.controller;

import com.learntrack.backend.model.*;
import com.learntrack.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/homework")
public class HomeworkController {

    private final HomeworkRepository homeworkRepository;
    private final HomeworkSubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    public HomeworkController(HomeworkRepository homeworkRepository, HomeworkSubmissionRepository submissionRepository, UserRepository userRepository) {
        this.homeworkRepository = homeworkRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Homework> getAll() { return homeworkRepository.findAll(); }

    @PostMapping
    public Homework create(@RequestBody Homework homework) {
        Homework saved = homeworkRepository.save(homework);
        userRepository.findByRole(User.Role.student).forEach(student -> {
            HomeworkSubmission sub = new HomeworkSubmission();
            sub.setHomework(saved); sub.setStudent(student); sub.setStatus("pending");
            submissionRepository.save(sub);
        });
        return homeworkRepository.findById(saved.getId()).orElse(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Homework> update(@PathVariable Long id, @RequestBody Homework homework) {
        return homeworkRepository.findById(id).map(h -> {
            h.setTitle(homework.getTitle()); h.setSubject(homework.getSubject());
            h.setDueDate(homework.getDueDate()); h.setDescription(homework.getDescription());
            h.setPoints(homework.getPoints());
            return ResponseEntity.ok(homeworkRepository.save(h));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        homeworkRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<?> submit(@PathVariable Long id, @AuthenticationPrincipal User user, @RequestBody Map<String, String> body) {
        return homeworkRepository.findById(id).map(hw -> {
            HomeworkSubmission sub = submissionRepository
                    .findByHomeworkIdAndStudentId(id, user.getId())
                    .orElse(new HomeworkSubmission());
            if ("graded".equals(sub.getStatus())) return ResponseEntity.badRequest().body(Map.of("error", "Already graded"));
            sub.setHomework(hw); sub.setStudent(user);
            sub.setStatus("submitted");
            sub.setSubmittedDate(LocalDate.now().toString());
            sub.setFileName(body.get("fileName"));
            sub.setComments(body.get("comments"));
            return ResponseEntity.ok(submissionRepository.save(sub));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/grade")
    public ResponseEntity<?> grade(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Long studentId = Long.valueOf(body.get("studentId").toString());
        int grade = Integer.parseInt(body.get("grade").toString());
        return submissionRepository.findByHomeworkIdAndStudentId(id, studentId)
                .map(sub -> { sub.setGrade(grade); sub.setStatus("graded"); return ResponseEntity.ok(submissionRepository.save(sub)); })
                .orElse(ResponseEntity.notFound().build());
    }
}
