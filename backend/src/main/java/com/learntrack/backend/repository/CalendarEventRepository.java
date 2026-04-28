package com.learntrack.backend.repository;

import com.learntrack.backend.model.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {}
