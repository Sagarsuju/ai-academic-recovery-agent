'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import CircularProgressRing from '@/components/ui/CircularProgressRing';
import Topics3DWidget from '@/components/3d/Topics3DWidget';
import StatusMarker from '@/components/ui/StatusMarker';
import { StudentCourseProgress } from '@/types';
import {
  GraduationCap,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  User,
  MapPin,
  Layers,
  HeartHandshake,
  Award
} from 'lucide-react';

const ENROLLED_COURSES: StudentCourseProgress[] = [
  {
    id: 'c-1',
    code: 'CS301',
    name: 'Database Management Systems',
    section: 'CSE-A',
    facultyName: 'Dr. Ramesh Kumar',
    attendancePercentage: 88.0,
    syllabusCoverage: 92.0,
    riskLevel: 'ON_TRACK',
    nextClassSlot: 'Tomorrow, 09:00 AM (AB1-302)',
    pendingTopicsCount: 2,
    isRecoveryEnrolled: false
  },
  {
    id: 'c-2',
    code: 'CS302',
    name: 'Java & Object Oriented Programming',
    section: 'CSE-A',
    facultyName: 'Prof. Ananya Sharma',
    attendancePercentage: 82.5,
    syllabusCoverage: 78.0,
    riskLevel: 'MINOR_SLIPPAGE',
    nextClassSlot: 'Wednesday, 11:00 AM (AB1-Lab3)',
    pendingTopicsCount: 3,
    isRecoveryEnrolled: false
  },
  {
    id: 'c-3',
    code: 'CS303',
    name: 'Operating Systems',
    section: 'CSE-A',
    facultyName: 'Dr. Vikramaditya Rao',
    attendancePercentage: 74.0,
    syllabusCoverage: 68.0,
    riskLevel: 'SIGNIFICANT_SLIPPAGE',
    nextClassSlot: 'Friday, 02:00 PM (Tutoring - AB2-104)',
    pendingTopicsCount: 4,
    isRecoveryEnrolled: true
  },
  {
    id: 'c-4',
    code: 'CS304',
    name: 'Artificial Intelligence & Machine Learning',
    section: 'CSE-A',
    facultyName: 'Prof. Suresh Verma',
    attendancePercentage: 70.0,
    syllabusCoverage: 55.0,
    riskLevel: 'CRITICAL',
    nextClassSlot: 'Saturday, 10:00 AM (Assisted Lab - AB1-Seminar Hall)',
    pendingTopicsCount: 6,
    isRecoveryEnrolled: true
  },
  {
    id: 'c-5',
    code: 'CS305',
    name: 'Computer Networks',
    section: 'CSE-A',
    facultyName: 'Dr. Ramesh Kumar',
    attendancePercentage: 86.0,
    syllabusCoverage: 86.0,
    riskLevel: 'ON_TRACK',
    nextClassSlot: 'Thursday, 10:00 AM (AB2-205)',
    pendingTopicsCount: 1,
    isRecoveryEnrolled: false
  },
  {
    id: 'c-6',
    code: 'CS306',
    name: 'Software Engineering & Agile',
    section: 'CSE-A',
    facultyName: 'Prof. Ananya Sharma',
    attendancePercentage: 91.0,
    syllabusCoverage: 90.0,
    riskLevel: 'ON_TRACK',
    nextClassSlot: 'Monday, 02:00 PM (AB1-304)',
    pendingTopicsCount: 1,
    isRecoveryEnrolled: false
  }
];

export default function StudentDashboardPage() {
  const [courses] = useState<StudentCourseProgress[]>(ENROLLED_COURSES);

  // Computed metrics
  const avgAttendance = (courses.reduce((acc, c) => acc + c.attendancePercentage, 0) / courses.length).toFixed(1);
  const avgCoverage = (courses.reduce((acc, c) => acc + c.syllabusCoverage, 0) / courses.length).toFixed(1);
  const recoveryEnrolledCount = courses.filter((c) => c.isRecoveryEnrolled).length;
  const needAttentionCourses = courses.filter((c) => c.attendancePercentage < 75.0);

  // Course deterministic soft styling based on index
  const courseAccentStyles = [
    { bg: '#F0F9FF', border: '#BAE6FD', text: '#0284C7', icon: BookOpen },
    { bg: '#F5F3FF', border: '#DDD6FE', text: '#7C3AED', icon: Sparkles },
    { bg: '#ECFAFF', border: '#BAE6FD', text: '#0284C7', icon: Layers },
    { bg: '#FFFBEB', border: '#FDE68A', text: '#D97706', icon: Clock },
    { bg: '#ECFDF5', border: '#A7F3D0', text: '#059669', icon: CheckCircle2 },
    { bg: '#EEF2FF', border: '#C7D2FE', text: '#4F46E5', icon: Award }
  ];

  return (
    <AppShell>
      {/* Friendly Student Welcome Banner */}
      <div className="glass-card" style={{
        padding: '26px 30px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(240, 238, 255, 0.75), rgba(234, 246, 255, 0.85))',
        border: '1px solid rgba(199, 210, 254, 0.7)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 4px 20px -2px rgba(108, 99, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6C63FF, #4FACFE)',
            boxShadow: '0 4px 12px rgba(108, 99, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <GraduationCap size={30} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                background: '#FFFFFF',
                color: '#6C63FF',
                border: '1px solid #E0DBFF',
                borderRadius: '999px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <Sparkles size={12} color="#6C63FF" /> B.Tech CSE • Year 3 • Semester 5
              </span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: '999px',
                background: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0'
              }}>
                Section CSE-A
              </span>
            </div>
            <h1 style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
              marginBottom: '2px',
              letterSpacing: '-0.02em'
            }}>
              Welcome back, Kavya!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Registration No: <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>221FA04001</strong> • Keep up the great pace towards final exams!
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/student/timetable" style={{ textDecoration: 'none' }}>
            <button className="btn-primary gradient-btn text-xs font-semibold px-5 py-2.5">
              <Calendar size={15} /> Weekly Timetable <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid - Friendly, Positive Color Hierarchy */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <StatCard
          title="Overall Attendance"
          value={`${avgAttendance}%`}
          subtitle="Above 75% required target"
          colorIdentity="green"
          trend="Eligible for Exams"
          icon={<CheckCircle2 size={18} />}
        />
        <StatCard
          title="Active Courses"
          value={courses.length}
          subtitle="6 Enrolled Modules"
          colorIdentity="blue"
          icon={<BookOpen size={18} />}
        />
        <StatCard
          title="Syllabus Mastery"
          value={`${avgCoverage}%`}
          subtitle="Great progress this semester"
          colorIdentity="purple"
          trend="+5.4% this month"
          icon={<Sparkles size={18} />}
        />
        <StatCard
          title="Academic Support"
          value={`${recoveryEnrolledCount} Sessions`}
          subtitle="Guided recovery available"
          colorIdentity="cyan"
          icon={<HeartHandshake size={18} />}
        />
      </div>

      {/* Friendly Academic Advisory Notice (instead of punitive warning) */}
      {needAttentionCourses.length > 0 && (
        <div className="glass-card" style={{
          padding: '16px 22px',
          marginBottom: '24px',
          background: '#FFFDF9',
          border: '1px solid #FDE68A',
          borderLeft: '4px solid #F59E0B',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              padding: '8px',
              borderRadius: '10px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              color: '#D97706'
            }}>
              <HeartHandshake size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                Academic Support Opportunity Available
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                You have an attendance booster available in <strong>AI & Machine Learning (70.0%)</strong>. Joining the Saturday session guarantees full exam eligibility!
              </div>
            </div>
          </div>
          <Link href="/student/timetable" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '7px 16px', borderRadius: '8px' }}>
              View Support Slots <ArrowRight size={13} />
            </button>
          </Link>
        </div>
      )}

      {/* Enrolled Courses Grid with Circular Progress Rings & Deterministic Pastels */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: '#EAF6FF',
                color: '#0284C7',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                Learning Trajectory
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Your Course Progress
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Interactive syllabus completion rings and upcoming lecture schedules
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
          {courses.map((course, idx) => {
            const accent = courseAccentStyles[idx % courseAccentStyles.length];
            const Icon = accent.icon;

            // Encouraging status label
            let encouragement = "You're on track";
            let statusCategory = 'ON_PACE';
            if (course.riskLevel === 'CRITICAL') {
              encouragement = "Recovery opportunity";
              statusCategory = 'AT_RISK';
            } else if (course.riskLevel === 'SIGNIFICANT_SLIPPAGE') {
              encouragement = "Needs attention";
              statusCategory = 'MONITOR';
            } else if (course.riskLevel === 'MINOR_SLIPPAGE') {
              encouragement = "Good progress";
              statusCategory = 'MONITOR';
            } else {
              encouragement = "Great progress";
              statusCategory = 'ON_PACE';
            }

            return (
              <div
                key={course.id}
                className="glass-card glass-card-interactive"
                style={{
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 18px -2px rgba(108, 99, 255, 0.04)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle top accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: accent.border
                  }}
                />

                <div>
                  {/* Course Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{
                        padding: '10px',
                        borderRadius: '12px',
                        backgroundColor: accent.bg,
                        color: accent.text,
                        border: `1px solid ${accent.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: accent.text,
                            background: accent.bg,
                            border: `1px solid ${accent.border}`,
                            padding: '2px 7px',
                            borderRadius: '6px'
                          }}>
                            {course.code}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{course.section}</span>
                        </div>
                        <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                          {course.name}
                        </h3>
                      </div>
                    </div>

                    <StatusMarker status={statusCategory} label={encouragement} />
                  </div>

                  {/* Instructor Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    <User size={14} color="#64748B" />
                    <span>Instructor: <strong style={{ color: 'var(--text-primary)' }}>{course.facultyName}</strong></span>
                  </div>

                  {/* Metrics Breakdown Box with Circular Ring */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    background: '#F8FAFC',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '16px'
                  }}>
                    {/* Animated Circular Progress Ring */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <CircularProgressRing
                        percentage={course.syllabusCoverage}
                        status={course.riskLevel}
                        size={66}
                        strokeWidth={5}
                      />
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                        Syllabus
                      </span>
                    </div>

                    {/* Attendance Info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>My Attendance</span>
                          <span style={{
                            fontWeight: 700,
                            color: course.attendancePercentage >= 75 ? '#059669' : '#D97706',
                            fontFamily: 'var(--font-heading)'
                          }}>
                            {course.attendancePercentage}%
                          </span>
                        </div>
                        <div className="progress-bar-bg">
                          <div
                            className={`progress-bar-fill ${course.attendancePercentage >= 75 ? 'on-track' : 'minor'}`}
                            style={{ width: `${course.attendancePercentage}%` }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        <span>Target: 75% for SEE</span>
                        <strong style={{ color: course.attendancePercentage >= 75 ? '#059669' : '#D97706' }}>
                          {course.attendancePercentage >= 75 ? 'Eligible for Exams' : 'Remedial Available'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Class Slot & Recovery Pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} color="#64748B" />
                    <span>Next: <strong style={{ color: 'var(--text-primary)' }}>{course.nextClassSlot}</strong></span>
                  </div>

                  {course.isRecoveryEnrolled && (
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      background: '#ECFAFF',
                      color: '#0284C7',
                      border: '1px solid #BAE6FD',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}>
                      Support Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Syllabus Topics Visualizer */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              padding: '3px 8px',
              borderRadius: '6px',
              background: '#F0EEFF',
              color: '#6C63FF',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              Mastery View
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="#6C63FF" />
              Interactive Syllabus Topic Mastery Visualizer
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Interactive WebGL representation of course units. Blocks colored by module pace.
          </p>
        </div>

        <Topics3DWidget
          courseCode="CS301"
          courseTitle="Database Management Systems • Unit Mastery Blocks"
        />
      </div>
    </AppShell>
  );
}
