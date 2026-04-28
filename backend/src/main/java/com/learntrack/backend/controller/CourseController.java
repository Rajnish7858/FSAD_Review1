package com.learntrack.backend.controller;

import com.learntrack.backend.model.Course;
import com.learntrack.backend.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> getAll() { return courseRepository.findAll(); }

    @PostMapping
    public Course create(@RequestBody Course course) { return courseRepository.save(course); }

    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable Long id, @RequestBody Course course) {
        return courseRepository.findById(id).map(c -> {
            c.setCode(course.getCode()); c.setName(course.getName()); c.setCredits(course.getCredits());
            return ResponseEntity.ok(courseRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        courseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
