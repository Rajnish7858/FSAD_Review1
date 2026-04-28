package com.learntrack.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;

@Entity
@Table(name = "homework")
public class Homework {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String subject;
    private String dueDate;
    private String description;
    private int points;

    @OneToMany(mappedBy = "homework", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<HomeworkSubmission> submissions;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
    public List<HomeworkSubmission> getSubmissions() { return submissions; }
    public void setSubmissions(List<HomeworkSubmission> submissions) { this.submissions = submissions; }
}
