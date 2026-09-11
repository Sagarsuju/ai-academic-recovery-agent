-- Database Schema for AI Academic Recovery & Course Progress Agent
-- Database Engine: PostgreSQL / SQLite Compatible

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('HOD', 'FACULTY', 'STUDENT', 'ADMIN')),
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faculty (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) DEFAULT 'Assistant Professor'
);

CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    section VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    section VARCHAR(20) NOT NULL,
    faculty_id VARCHAR(50) REFERENCES faculty(id),
    total_hours INT DEFAULT 60,
    completed_hours INT DEFAULT 0,
    expected_percentage FLOAT DEFAULT 0.0,
    actual_percentage FLOAT DEFAULT 0.0,
    risk_level VARCHAR(30) DEFAULT 'ON_TRACK',
    risk_score INT DEFAULT 0,
    predicted_completion_date VARCHAR(50),
    planned_completion_date VARCHAR(50),
    delay_days INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL,
    unit_title VARCHAR(150) NOT NULL,
    topic_title VARCHAR(200) NOT NULL,
    estimated_hours INT DEFAULT 2,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    is_completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS lesson_plans (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    total_hours INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(id),
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    date VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'PRESENT',
    present_count INT DEFAULT 1,
    absent_count INT DEFAULT 0,
    total_count INT DEFAULT 1,
    topic_status VARCHAR(30) DEFAULT 'COMPLETED',
    actual_topic_covered TEXT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sync_status (
    integration_name VARCHAR(50) PRIMARY KEY,
    last_sync_time TIMESTAMP,
    last_sync_status VARCHAR(20),
    records_synced INT DEFAULT 0,
    details TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS timetables (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    day VARCHAR(20) NOT NULL,
    start_time VARCHAR(20) NOT NULL,
    end_time VARCHAR(20) NOT NULL,
    room VARCHAR(50) NOT NULL,
    is_extra_slot BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS progress_records (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    expected_percentage FLOAT NOT NULL,
    actual_percentage FLOAT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recovery_plans (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    current_coverage FLOAT NOT NULL,
    expected_coverage FLOAT NOT NULL,
    gap FLOAT NOT NULL,
    weeks_remaining INT NOT NULL,
    predicted_delay_weeks INT NOT NULL,
    additional_classes_required INT NOT NULL,
    priority_topics TEXT,
    recommended_pace VARCHAR(100),
    status VARCHAR(30) DEFAULT 'PENDING'
);

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id),
    type VARCHAR(20) NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS academic_calendar (
    id VARCHAR(50) PRIMARY KEY,
    event_name VARCHAR(150) NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    event_type VARCHAR(50) NOT NULL
);
