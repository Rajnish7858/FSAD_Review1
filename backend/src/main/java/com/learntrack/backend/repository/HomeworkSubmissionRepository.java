package com.learntrack.backend.repository;

import com.learntrack.backend.model.HomeworkSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface HomeworkSubmissionRepository extends JpaRepository<HomeworkSubmission, Long> {
    List<HomeworkSubmission> findByHomeworkId(Long homeworkId);
    Optional<HomeworkSubmission> findByHomeworkIdAndStudentId(Long homeworkId, Long studentId);
}
