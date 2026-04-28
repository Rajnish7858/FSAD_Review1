package com.learntrack.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "homework_submissions")
public class HomeworkSubmission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "homework_id")
    @JsonBackReference
    private Homework homework;

    @ManyToOne @JoinColumn(name = "student_id")
    private User student;

    private String status = "pending";
    private String submittedDate;
    private String fileName;
    private String comments;
    private Integer grade;

    public Long getId() { return id; }
    public Homework getHomework() { return homework; }
    public void setHomework(Homework homework) { this.homework = homework; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(String submittedDate) { this.submittedDate = submittedDate; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    public Integer getGrade() { return grade; }
    public void setGrade(Integer grade) { this.grade = grade; }
}
