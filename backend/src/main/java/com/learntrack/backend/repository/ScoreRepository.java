package com.learntrack.backend.repository;

import com.learntrack.backend.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, Long> {}
