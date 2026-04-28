package com.learntrack.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "calendar_events")
public class CalendarEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String event;
    private String description;
    private String date;
    private String type;

    public Long getId() { return id; }
    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
