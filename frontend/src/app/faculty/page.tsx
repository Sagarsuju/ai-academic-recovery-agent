'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import RiskBadge from '@/components/ui/RiskBadge';
import StatusMarker from '@/components/ui/StatusMarker';
import { getTodayClasses } from '@/services/attendanceService';
import { getCourses } from '@/services/courseService';
import { ClassScheduleItem, Course } from '@/types';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  UserCheck,
  Building,
  Sparkles,
  Users,
  MapPin
} from 'lucide-react';

export default function FacultyDashboardPage() {
  const [todayClasses, setTodayClasses] = useState<ClassScheduleItem[]>([]);
  const [assignedCourses, setAssignedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const classes = await getTodayClasses();
      const courses = await getCourses();
      setTodayClasses(classes);
      // Filter courses for Prof. Ananya Sharma
      setAssignedCourses(courses.filter((c) => c.facultyId === 'fac-102' || c.facultyId === 'fac-101'));
      setIsLoading(false);
    }
    loadData();
  }, []);

  const completedCount = todayClasses.filter((c) => c.status === 'COMPLETED').length;
  const pendingCount = todayClasses.filter((c) => c.status === 'UPCOMING' || c.status === 'IN_PROGRESS').length;

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AppShell>
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '24px 28px',
        marginBottom: '24px',
        background: 'rgba(255, 255, 255, 0.88)',
        border: '1px solid rgba(199, 210, 254, 0.6)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 4px 20px -2px rgba(108, 99, 255, 0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 10px',
              background: '#F0EEFF',
              color: '#6C63FF',
              border: '1px solid #E0DBFF',
              borderRadius: '999px'
            }}>
              <Building size={12} color="#6C63FF" /> Department of Computer Science & Engineering
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {currentDateFormatted}
            </span>
          </div>

          <h1 style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            marginBottom: '4px',
            letterSpacing: '-0.02em'
          }}>
            Welcome back, Prof. Ananya Sharma
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            You have <strong style={{ color: '#D97706' }}>{pendingCount} pending class updates</strong> to record for today.
          </p>
        </div>

        <Link href="/faculty/attendance" style={{ textDecoration: 'none' }}>
          <button className="btn-primary gradient-btn text-xs px-5 py-2.5">
            <UserCheck size={16} /> Mark Attendance & Topic <ArrowRight size={16} />
          </button>
        </Link>
      </div>

      {/* KPI Stats Grid - Faculty Color Mapping: Blue, Purple, Green, Yellow, Cyan */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <StatCard
          title="Assigned Courses"
          value={assignedCourses.length || 3}
          subtitle="CSE Theory & Lab"
          colorIdentity="blue"
          icon={<BookOpen size={18} />}
        />

        <StatCard
          title="Total Enrolled Students"
          value="184"
          subtitle="Across 3 sections"
          colorIdentity="purple"
          icon={<Users size={18} />}
        />

        <StatCard
          title="Completed Today"
          value={completedCount}
          subtitle="Attendance & topic logged"
          colorIdentity="green"
          trend="Pacing On Target"
          icon={<CheckCircle2 size={18} />}
        />

        <StatCard
          title="Pending Updates"
          value={pendingCount}
          subtitle="Action required post-class"
          colorIdentity="yellow"
          icon={<AlertCircle size={18} />}
        />

        <StatCard
          title="Today's Schedule"
          value={`${todayClasses.length} Slots`}
          subtitle="CSE-A & CSE-B"
          colorIdentity="cyan"
          icon={<Clock size={18} />}
        />
      </div>

      {/* Today's Schedule Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: '#ECFAFF',
                color: '#0284C7',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                Schedule
              </span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Today's Class Schedule
              </h2>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time Sync</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todayClasses.map((item) => (
              <div key={item.id} className="glass-card glass-card-interactive" style={{
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                borderLeft: item.status === 'COMPLETED' ? '4px solid #10B981' : '4px solid #4FACFE'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    padding: '10px',
                    borderRadius: '10px',
                    background: item.status === 'COMPLETED' ? '#ECFDF5' : '#EAF6FF',
                    color: item.status === 'COMPLETED' ? '#10B981' : '#4FACFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.status === 'COMPLETED' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--text-primary)' }}>
                        {item.courseName}
                      </span>
                      <span style={{
                        padding: '2px 7px',
                        borderRadius: '6px',
                        background: '#F1F5F9',
                        color: 'var(--text-secondary)',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}>
                        {item.section}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {item.time}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> Room {item.room}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <StatusMarker
                    status={item.status === 'COMPLETED' ? 'ON_PACE' : 'MONITOR'}
                    label={item.status === 'COMPLETED' ? 'Completed' : 'Pending Update'}
                  />

                  {item.status !== 'COMPLETED' && (
                    <Link href={`/faculty/attendance?classId=${item.id}`} style={{ textDecoration: 'none' }}>
                      <button className="btn-primary gradient-btn" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                        Update
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Courses Syllabus Snapshot */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{
              padding: '3px 8px',
              borderRadius: '6px',
              background: '#F0EEFF',
              color: '#6C63FF',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              Curriculum
            </span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              Assigned Courses
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {assignedCourses.map((course) => (
              <div key={course.id} className="glass-card" style={{
                padding: '18px',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    {course.name}
                  </span>
                  <RiskBadge level={course.riskLevel} />
                </div>

                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Section: {course.section} • <span style={{ fontFamily: 'monospace' }}>{course.code}</span>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Coverage</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {course.actualPercentage}%
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className={`progress-bar-fill ${course.riskLevel === 'ON_TRACK' ? 'on-track' : 'minor'}`}
                      style={{ width: `${course.actualPercentage}%` }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  <span>Target: {course.expectedPercentage}%</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>Pacing Healthy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
