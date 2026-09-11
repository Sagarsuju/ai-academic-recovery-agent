'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import RiskBadge from '@/components/ui/RiskBadge';
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
  Sparkles
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
        padding: '28px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>
              <Building size={12} /> Department of Computer Science & Engineering
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>•</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {currentDateFormatted}
            </span>
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            Welcome back, Prof. Ananya Sharma
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            You have <strong style={{ color: '#f8fafc' }}>{pendingCount} pending class updates</strong> to record for today.
          </p>
        </div>

        <Link href="/faculty/attendance" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
            <UserCheck size={18} /> Mark Attendance & Update Topic <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <StatCard
          title="Today's Classes"
          value={todayClasses.length}
          subtitle="Scheduled lectures"
          icon={<Clock size={20} color="#818cf8" />}
          glowColor="indigo"
        />

        <StatCard
          title="Completed Today"
          value={completedCount}
          subtitle="Attendance & Topic logged"
          icon={<CheckCircle2 size={20} color="#10b981" />}
          glowColor="emerald"
        />

        <StatCard
          title="Pending Updates"
          value={pendingCount}
          subtitle="Action required post-class"
          icon={<AlertCircle size={20} color="#f59e0b" />}
          glowColor="amber"
        />

        <StatCard
          title="Avg Syllabus Coverage"
          value="84%"
          subtitle="Across 3 assigned courses"
          icon={<BookOpen size={20} color="#8b5cf6" />}
          glowColor="indigo"
        />
      </div>

      {/* Today's Schedule Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
              Today's Class Schedule
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Real-time Sync</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {todayClasses.map((item) => (
              <div key={item.id} className="glass-card" style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: item.status === 'COMPLETED' ? '4px solid #10b981' : '4px solid #6366f1'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: item.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(99, 102, 241, 0.12)',
                    color: item.status === 'COMPLETED' ? '#10b981' : '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                        {item.courseName}
                      </span>
                      <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1' }}>
                        {item.section}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        ({item.courseCode})
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span><Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />{item.time}</span>
                      <span>• Room {item.room}</span>
                      <span>• {item.enrolledStudents} Students</span>
                    </div>

                    <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                      <strong style={{ color: '#818cf8' }}>Planned Topic:</strong> {item.plannedTopic}
                    </div>
                  </div>
                </div>

                <div>
                  {item.status === 'COMPLETED' ? (
                    <span className="badge badge-on-track">✓ Completed</span>
                  ) : (
                    <Link href="/faculty/attendance" style={{ textDecoration: 'none' }}>
                      <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                        Mark Update
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
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
            Assigned Courses
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {assignedCourses.map((course) => (
              <div key={course.id} className="glass-card" style={{ padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                    {course.name}
                  </span>
                  <RiskBadge level={course.riskLevel} showIcon={false} />
                </div>

                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Section: {course.section} • {course.code}
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span style={{ color: '#94a3b8' }}>Coverage</span>
                    <span style={{ fontWeight: 700, color: '#f8fafc' }}>{course.actualPercentage}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${course.actualPercentage}%`,
                        background: course.riskLevel === 'ON_TRACK' ? '#10b981' : course.riskLevel === 'MINOR_SLIPPAGE' ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                  <span>Target: {course.expectedPercentage}%</span>
                  <span>Gap: {course.gapPercentage > 0 ? `+${course.gapPercentage}% lag` : 'On Schedule'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
