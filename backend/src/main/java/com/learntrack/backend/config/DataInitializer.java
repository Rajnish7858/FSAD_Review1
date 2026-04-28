package com.learntrack.backend.config;

import com.learntrack.backend.model.*;
import com.learntrack.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            UserRepository userRepo,
            CourseRepository courseRepo,
            AssessmentRepository assessmentRepo,
            ScoreRepository scoreRepo,
            AnnouncementRepository announcementRepo,
            CalendarEventRepository calendarRepo,
            ScheduleRepository scheduleRepo,
            HomeworkRepository homeworkRepo,
            HomeworkSubmissionRepository submissionRepo,
            AttendanceRepository attendanceRepo,
            PasswordEncoder encoder) {

        return args -> {
            if (userRepo.count() > 0) return;

            // Users
            User teacher = new User();
            teacher.setUsername("Mr.Pavan"); teacher.setPassword(encoder.encode("Pavan"));
            teacher.setName("Mr.Pavan"); teacher.setRole(User.Role.teacher);
            userRepo.save(teacher);

            User s1 = new User(); s1.setUsername("Rajnish"); s1.setPassword(encoder.encode("Rajnish"));
            s1.setName("Rajnish"); s1.setRole(User.Role.student); s1.setMajor("Computer Science");
            userRepo.save(s1);

            User s2 = new User(); s2.setUsername("Vivek"); s2.setPassword(encoder.encode("Vivek"));
            s2.setName("Vivek"); s2.setRole(User.Role.student); s2.setMajor("Computer Science");
            userRepo.save(s2);

            User s3 = new User(); s3.setUsername("Raghuram"); s3.setPassword(encoder.encode("Raghuram"));
            s3.setName("Raghuram"); s3.setRole(User.Role.student); s3.setMajor("Computer Science");
            userRepo.save(s3);

            // Courses
            Course fsad = new Course(); fsad.setCode("FSAD"); fsad.setName("Full Stack Application Development"); fsad.setCredits(4); courseRepo.save(fsad);
            Course aiml = new Course(); aiml.setCode("AIML"); aiml.setName("Artificial Intelligence & Machine Learning"); aiml.setCredits(4); courseRepo.save(aiml);
            Course nlp = new Course(); nlp.setCode("NLP"); nlp.setName("Natural Language Processing"); nlp.setCredits(3); courseRepo.save(nlp);
            Course os = new Course(); os.setCode("OS"); os.setName("Operating Systems"); os.setCredits(3); courseRepo.save(os);

            List<User> students = userRepo.findByRole(User.Role.student);

            // Assessment 1 - FSAD
            Assessment a1 = new Assessment(); a1.setTitle("FSAD - Midterm"); a1.setCourse(fsad); a1.setTerm("Insem-1"); a1.setDate("2026-02-10"); a1.setMaxScore(100); a1.setWeight(30); a1.setLearningOutcome("Web Development");
            assessmentRepo.save(a1);
            int[] a1s = {85, 88, 92};
            for (int i = 0; i < students.size(); i++) { Score sc = new Score(); sc.setAssessment(a1); sc.setStudent(students.get(i)); sc.setScore(a1s[i]); scoreRepo.save(sc); }

            // Assessment 2 - AIML
            Assessment a2 = new Assessment(); a2.setTitle("AIML - Quiz 1"); a2.setCourse(aiml); a2.setTerm("Insem-1"); a2.setDate("2026-02-17"); a2.setMaxScore(50); a2.setWeight(10); a2.setLearningOutcome("Machine Learning");
            assessmentRepo.save(a2);
            int[] a2s = {45, 46, 48};
            for (int i = 0; i < students.size(); i++) { Score sc = new Score(); sc.setAssessment(a2); sc.setStudent(students.get(i)); sc.setScore(a2s[i]); scoreRepo.save(sc); }

            // Assessment 3 - NLP
            Assessment a3 = new Assessment(); a3.setTitle("NLP - Assignment"); a3.setCourse(nlp); a3.setTerm("Insem-2"); a3.setDate("2026-02-20"); a3.setMaxScore(100); a3.setWeight(20); a3.setLearningOutcome("Text Processing");
            assessmentRepo.save(a3);
            int[] a3s = {90, 92, 88};
            for (int i = 0; i < students.size(); i++) { Score sc = new Score(); sc.setAssessment(a3); sc.setStudent(students.get(i)); sc.setScore(a3s[i]); scoreRepo.save(sc); }

            // Assessment 4 - OS
            Assessment a4 = new Assessment(); a4.setTitle("OS - Final"); a4.setCourse(os); a4.setTerm("Endsem"); a4.setDate("2026-03-01"); a4.setMaxScore(100); a4.setWeight(40); a4.setLearningOutcome("Process Management");
            assessmentRepo.save(a4);
            int[] a4s = {88, 85, 91};
            for (int i = 0; i < students.size(); i++) { Score sc = new Score(); sc.setAssessment(a4); sc.setStudent(students.get(i)); sc.setScore(a4s[i]); scoreRepo.save(sc); }

            // Announcements
            Announcement an1 = new Announcement(); an1.setTitle("Mid-term Exams Schedule Released"); an1.setMessage("Check your exam schedule on the portal"); an1.setDate("2026-03-10"); an1.setPriority("high"); announcementRepo.save(an1);
            Announcement an2 = new Announcement(); an2.setTitle("Library Hours Extended"); an2.setMessage("Library will be open until 10 PM"); an2.setDate("2026-03-08"); an2.setPriority("low"); announcementRepo.save(an2);
            Announcement an3 = new Announcement(); an3.setTitle("Guest Lecture on AI"); an3.setMessage("Join us for an exciting AI lecture"); an3.setDate("2026-03-12"); an3.setPriority("medium"); announcementRepo.save(an3);
            Announcement an4 = new Announcement(); an4.setTitle("Project Submission Deadline"); an4.setMessage("Submit your projects before deadline"); an4.setDate("2026-03-15"); an4.setPriority("high"); announcementRepo.save(an4);

            // Calendar Events
            CalendarEvent e1 = new CalendarEvent(); e1.setEvent("FSAD Insem-1"); e1.setDescription("Full Stack mid-term exam"); e1.setDate("2026-03-15"); e1.setType("exam"); calendarRepo.save(e1);
            CalendarEvent e2 = new CalendarEvent(); e2.setEvent("AIML Quiz"); e2.setDescription("Machine Learning quiz"); e2.setDate("2026-03-18"); e2.setType("quiz"); calendarRepo.save(e2);
            CalendarEvent e3 = new CalendarEvent(); e3.setEvent("NLP Assignment Due"); e3.setDescription("Text classification assignment submission"); e3.setDate("2026-03-20"); e3.setType("assignment"); calendarRepo.save(e3);
            CalendarEvent e4 = new CalendarEvent(); e4.setEvent("OS Endsem"); e4.setDescription("Operating Systems final exam"); e4.setDate("2026-03-25"); e4.setType("exam"); calendarRepo.save(e4);
            CalendarEvent e5 = new CalendarEvent(); e5.setEvent("Summer Break"); e5.setDescription("Summer vacation begins"); e5.setDate("2026-03-28"); e5.setType("holiday"); calendarRepo.save(e5);

            // Schedule
            String[][] scheduleData = {
                {"Monday", "9:00 AM - 10:30 AM", "FSAD", "Lab 101"},
                {"Monday", "11:00 AM - 12:30 PM", "AIML", "Room 205"},
                {"Tuesday", "9:00 AM - 10:30 AM", "NLP", "Room 301"},
                {"Wednesday", "2:00 PM - 3:30 PM", "OS", "Lab 102"},
                {"Thursday", "9:00 AM - 10:30 AM", "FSAD", "Lab 101"},
                {"Friday", "11:00 AM - 12:30 PM", "AIML", "Room 205"}
            };
            for (String[] d : scheduleData) {
                Schedule sc = new Schedule(); sc.setDay(d[0]); sc.setTime(d[1]); sc.setSubject(d[2]); sc.setRoom(d[3]);
                scheduleRepo.save(sc);
            }

            // Homework
            Homework hw1 = new Homework(); hw1.setTitle("FSAD Project - Phase 1"); hw1.setSubject("FSAD"); hw1.setDueDate("2026-03-15"); hw1.setDescription("Build a full-stack web application"); hw1.setPoints(100);
            homeworkRepo.save(hw1);
            for (User s : students) { HomeworkSubmission sub = new HomeworkSubmission(); sub.setHomework(hw1); sub.setStudent(s); sub.setStatus("pending"); submissionRepo.save(sub); }

            Homework hw2 = new Homework(); hw2.setTitle("ML Model Training"); hw2.setSubject("AIML"); hw2.setDueDate("2026-03-20"); hw2.setDescription("Train and evaluate ML models"); hw2.setPoints(100);
            homeworkRepo.save(hw2);
            for (User s : students) { HomeworkSubmission sub = new HomeworkSubmission(); sub.setHomework(hw2); sub.setStudent(s); sub.setStatus("pending"); submissionRepo.save(sub); }

            Homework hw3 = new Homework(); hw3.setTitle("Text Classification"); hw3.setSubject("NLP"); hw3.setDueDate("2026-03-25"); hw3.setDescription("Implement text classification"); hw3.setPoints(50);
            homeworkRepo.save(hw3);
            for (User s : students) { HomeworkSubmission sub = new HomeworkSubmission(); sub.setHomework(hw3); sub.setStudent(s); sub.setStatus("pending"); submissionRepo.save(sub); }

            Homework hw4 = new Homework(); hw4.setTitle("Process Scheduling"); hw4.setSubject("OS"); hw4.setDueDate("2026-03-18"); hw4.setDescription("Implement scheduling algorithms"); hw4.setPoints(75);
            homeworkRepo.save(hw4);
            for (User s : students) { HomeworkSubmission sub = new HomeworkSubmission(); sub.setHomework(hw4); sub.setStudent(s); sub.setStatus("pending"); submissionRepo.save(sub); }
        };
    }
}
