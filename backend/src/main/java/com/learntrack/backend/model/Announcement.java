package com.learntrack.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "announcements")
public class Announcement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String message;
    private String date;
    private String priority;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}
