package com.learntrack.backend.repository;

import com.learntrack.backend.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {}
