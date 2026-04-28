package com.learntrack.backend.controller;

import com.learntrack.backend.model.Assessment;
import com.learntrack.backend.repository.AssessmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final AssessmentRepository assessmentRepository;

    public AssessmentController(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    @GetMapping
    public List<Assessment> getAll() { return assessmentRepository.findAll(); }

    @PostMapping
    public Assessment create(@RequestBody Assessment assessment) { return assessmentRepository.save(assessment); }

    @PutMapping("/{id}")
    public ResponseEntity<Assessment> update(@PathVariable Long id, @RequestBody Assessment assessment) {
        return assessmentRepository.findById(id).map(a -> {
            a.setTitle(assessment.getTitle()); a.setTerm(assessment.getTerm());
            a.setDate(assessment.getDate()); a.setMaxScore(assessment.getMaxScore());
            a.setWeight(assessment.getWeight()); a.setLearningOutcome(assessment.getLearningOutcome());
            return ResponseEntity.ok(assessmentRepository.save(a));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        assessmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
