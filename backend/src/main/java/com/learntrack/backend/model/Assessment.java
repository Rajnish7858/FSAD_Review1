package com.learntrack.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String term;
    private String date;
    private int maxScore;
    private int weight;
    private String learningOutcome;

    @ManyToOne @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "assessment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Score> scores;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public int getMaxScore() { return maxScore; }
    public void setMaxScore(int maxScore) { this.maxScore = maxScore; }
    public int getWeight() { return weight; }
    public void setWeight(int weight) { this.weight = weight; }
    public String getLearningOutcome() { return learningOutcome; }
    public void setLearningOutcome(String learningOutcome) { this.learningOutcome = learningOutcome; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public List<Score> getScores() { return scores; }
    public void setScores(List<Score> scores) { this.scores = scores; }
}
