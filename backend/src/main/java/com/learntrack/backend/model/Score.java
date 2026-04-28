package com.learntrack.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "scores")
public class Score {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne @JoinColumn(name = "assessment_id")
    @JsonBackReference
    private Assessment assessment;

    private int score;

    public Long getId() { return id; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public Assessment getAssessment() { return assessment; }
    public void setAssessment(Assessment assessment) { this.assessment = assessment; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}
