package com.learntrack.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schedule")
public class Schedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String day;
    private String time;
    private String subject;
    private String room;

    public Long getId() { return id; }
    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }
}
