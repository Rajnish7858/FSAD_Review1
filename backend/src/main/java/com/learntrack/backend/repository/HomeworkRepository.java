package com.learntrack.backend.repository;

import com.learntrack.backend.model.Homework;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeworkRepository extends JpaRepository<Homework, Long> {}
