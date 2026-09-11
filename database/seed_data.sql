-- Initial Seed Data for AI Academic Recovery & Course Progress Agent

-- 1. USERS
INSERT INTO users (id, email, password_hash, role, name, department) VALUES
('user-hod', 'hod.cse@vignan.edu.in', 'pbkdf2:sha256:hash_hod', 'HOD', 'Dr. R. K. Prasad', 'Computer Science & Engineering'),
('user-fac1', 'prof.ananya@vignan.edu.in', 'pbkdf2:sha256:hash_fac1', 'FACULTY', 'Prof. Ananya Sharma', 'Computer Science & Engineering'),
('user-fac2', 'dr.ramesh@vignan.edu.in', 'pbkdf2:sha256:hash_fac2', 'FACULTY', 'Dr. Ramesh Kumar', 'Computer Science & Engineering'),
('user-fac3', 'dr.vikram@vignan.edu.in', 'pbkdf2:sha256:hash_fac3', 'FACULTY', 'Dr. Vikramaditya Rao', 'Computer Science & Engineering'),
('user-fac4', 'prof.suresh@vignan.edu.in', 'pbkdf2:sha256:hash_fac4', 'FACULTY', 'Prof. Suresh Verma', 'Computer Science & Engineering');

-- 2. FACULTY
INSERT INTO faculty (id, user_id, name, email, department, designation) VALUES
('fac-101', 'user-fac2', 'Dr. Ramesh Kumar', 'dr.ramesh@vignan.edu.in', 'Computer Science & Engineering', 'Professor'),
('fac-102', 'user-fac1', 'Prof. Ananya Sharma', 'prof.ananya@vignan.edu.in', 'Computer Science & Engineering', 'Assistant Professor'),
('fac-103', 'user-fac3', 'Dr. Vikramaditya Rao', 'dr.vikram@vignan.edu.in', 'Computer Science & Engineering', 'Associate Professor'),
('fac-104', 'user-fac4', 'Prof. Suresh Verma', 'prof.suresh@vignan.edu.in', 'Computer Science & Engineering', 'Assistant Professor');

-- 3. COURSES
INSERT INTO courses (id, code, name, department, section, faculty_id, total_hours, completed_hours, expected_percentage, actual_percentage, risk_level, risk_score, predicted_completion_date, planned_completion_date, delay_days) VALUES
('course-dbms-a', 'CS301', 'Database Management Systems', 'Computer Science & Engineering', 'CSE-A', 'fac-101', 60, 55, 90.0, 92.0, 'ON_TRACK', 12, 'December 08, 2026', 'December 10, 2026', -2),
('course-java-b', 'CS302', 'Java & Object Oriented Programming', 'Computer Science & Engineering', 'CSE-B', 'fac-102', 60, 46, 88.0, 78.0, 'MINOR_SLIPPAGE', 42, 'December 14, 2026', 'December 10, 2026', 4),
('course-os-a', 'CS303', 'Operating Systems', 'Computer Science & Engineering', 'CSE-A', 'fac-103', 60, 38, 82.0, 64.0, 'SIGNIFICANT_SLIPPAGE', 82, 'December 22, 2026', 'December 10, 2026', 12),
('course-ai-c', 'CS304', 'Artificial Intelligence & Machine Learning', 'Computer Science & Engineering', 'CSE-C', 'fac-104', 60, 29, 80.0, 48.0, 'CRITICAL', 94, 'January 05, 2027', 'December 10, 2026', 26),
('course-cn-b', 'CS305', 'Computer Networks', 'Computer Science & Engineering', 'CSE-B', 'fac-101', 60, 52, 86.0, 86.0, 'ON_TRACK', 15, 'December 10, 2026', 'December 10, 2026', 0),
('course-se-a', 'CS306', 'Software Engineering & Agile Methodologies', 'Computer Science & Engineering', 'CSE-A', 'fac-102', 60, 54, 88.0, 90.0, 'ON_TRACK', 8, 'December 07, 2026', 'December 10, 2026', -3);

-- 4. TOPICS
INSERT INTO topics (id, course_id, unit_number, unit_title, topic_title, estimated_hours, priority, is_completed) VALUES
('t1', 'course-dbms-a', 4, 'Transaction Processing', 'Two-Phase Locking Protocol', 2, 'HIGH', FALSE),
('t2', 'course-dbms-a', 5, 'NoSQL Databases', 'MongoDB Document Model', 3, 'MEDIUM', FALSE),
('t3', 'course-java-b', 3, 'Multithreading', 'Thread Synchronization Internals', 2, 'HIGH', FALSE),
('t4', 'course-java-b', 4, 'Collections', 'HashMap & Concurrent HashMap', 3, 'HIGH', FALSE),
('t5', 'course-os-a', 3, 'Deadlocks', 'Bankers Algorithm for Avoidance', 2, 'HIGH', FALSE),
('t6', 'course-os-a', 4, 'Memory Management', 'Virtual Memory & Page Replacement (LRU)', 4, 'HIGH', FALSE),
('t7', 'course-os-a', 5, 'File Systems', 'File Allocation Methods & Inodes', 3, 'MEDIUM', FALSE),
('t8', 'course-ai-c', 2, 'Knowledge Logic', 'First Order Logic & Resolution', 3, 'HIGH', FALSE),
('t9', 'course-ai-c', 3, 'Supervised Learning', 'Decision Trees & Random Forests', 4, 'HIGH', FALSE),
('t10', 'course-ai-c', 4, 'Neural Networks', 'Backpropagation Neural Networks', 5, 'HIGH', FALSE);

-- 5. ATTENDANCE LOGS
INSERT INTO attendance (id, course_id, date, present_count, absent_count, total_count, topic_status, actual_topic_covered) VALUES
('att-1', 'course-dbms-a', '2026-09-11', 52, 3, 55, 'COMPLETED', 'Covered Inner Join, Left/Right Outer Join with hands-on queries in MySQL.'),
('att-2', 'course-java-b', '2026-09-10', 48, 4, 52, 'COMPLETED', 'Covered Interfaces and Abstract Class hierarchy.'),
('att-3', 'course-os-a', '2026-09-09', 50, 8, 58, 'PARTIALLY_COMPLETED', 'Covered Semaphore intro, Banker Algorithm deferred.');

-- 6. RECOVERY PLANS
INSERT INTO recovery_plans (id, course_id, current_coverage, expected_coverage, gap, weeks_remaining, predicted_delay_weeks, additional_classes_required, priority_topics, recommended_pace, status) VALUES
('plan-os-a', 'course-os-a', 64.0, 82.0, 18.0, 4, 2, 3, 'Deadlocks, Virtual Memory LRU, File System Inodes', '3 topics per week', 'APPROVED'),
('plan-ai-c', 'course-ai-c', 48.0, 80.0, 32.0, 4, 4, 6, 'First Order Logic, Decision Trees, Backpropagation Networks', '4 topics per week', 'PENDING');

-- 7. NOTIFICATIONS
INSERT INTO notifications (id, user_id, type, title, message, is_read, link) VALUES
('n-1', 'user-hod', 'CRITICAL', 'Critical Progress Deficit Alert', 'Artificial Intelligence (CS304 - CSE-C) is 32% behind expected progress. 4 lectures missed.', FALSE, '/hod/courses/course-ai-c'),
('n-2', 'user-hod', 'WARNING', 'Syllabus Lag Warning', 'Operating Systems (CS303 - CSE-A) is 18% behind expected schedule.', FALSE, '/hod/recovery?courseId=course-os-a'),
('n-3', 'user-hod', 'INFO', 'Pending Topics Reminder', 'DBMS (CS301) has 2 pending topics remaining in Unit 4.', TRUE, '/hod/courses/course-dbms-a'),
('n-4', 'user-hod', 'SUCCESS', 'Recovery Plan Approved', 'Recovery schedule for Operating Systems has been approved and added to Tuesday/Thursday timetable.', TRUE, '/hod/timetable');
