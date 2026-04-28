package com.learntrack.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance")
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "student_id")
    private User student;

    private String date;
    private String subject;
    private String status;

    public Long getId() { return id; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
