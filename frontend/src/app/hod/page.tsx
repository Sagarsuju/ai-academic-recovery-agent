'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import RiskBadge from '@/components/ui/RiskBadge';
import CircularProgressRing from '@/components/ui/CircularProgressRing';
import Topics3DWidget from '@/components/3d/Topics3DWidget';
import { getCourses, getDepartmentSummary } from '@/services/courseService';
import { Course, DepartmentSummary } from '@/types';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  ArrowRight,
  Zap,
  Building,
  Layers,
  Sparkles,
  Activity
} from 'lucide-react';

export default function HodDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [summary, setSummary] = useState<DepartmentSummary | null>(null);

  useEffect(() => {
    async function loadData() {
      const c = await getCourses();
      const s = await getDepartmentSummary();
      setCourses(c);
      setSummary(s);
    }
    loadData();
  }, []);

  return (
    <AppShell>
      {/* Header Executive Command Banner */}
      <div className="glass-card" style={{
        padding: '24px 28px',
        marginBottom: '24px',
        background: 'rgba(255, 255, 255, 0.88)',
        border: '1px solid rgba(199, 210, 254, 0.5)',
        boxShadow: '0 4px 20px -2px rgba(108, 99, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
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
              <Building size={13} color="#6C63FF" /> Department of Computer Science & Engineering
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
            <span style={{
              fontSize: '0.75rem',
              color: '#059669',
              fontWeight: 700,
              padding: '3px 9px',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '999px'
            }}>
              Semester 5 Active
            </span>
          </div>

          <h1 style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            marginBottom: '4px',
            letterSpacing: '-0.02em'
          }}>
            HOD Executive Academic Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Real-time syllabus completion tracking, AI risk flagging, and intelligent timetable recovery.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/hod/recovery" style={{ textDecoration: 'none' }}>
            <button className="btn-primary gradient-btn text-xs px-5 py-2.5">
              <Zap size={15} /> Open Recovery Engine <ArrowRight size={15} />
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid with Distinct Pastel Color Identities */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <StatCard
          title="Overall Performance"
          value={`${summary?.overallSyllabusCoverage || 76}%`}
          subtitle="Dept Average Pace"
          colorIdentity="purple"
          trend="+4.2% vs target"
          icon={<TrendingUp size={18} />}
        />

        <StatCard
          title="Active Courses"
          value={summary?.totalCourses || 24}
          subtitle="All CSE Sections"
          colorIdentity="blue"
          icon={<BookOpen size={18} />}
        />

        <StatCard
          title="On Pace"
          value={summary?.onTrack || 16}
          subtitle="Matching target timeline"
          colorIdentity="green"
          trend="66% of catalog"
          icon={<CheckCircle2 size={18} />}
        />

        <StatCard
          title="Attention Required"
          value={summary?.minorSlippage || 4}
          subtitle="5% - 12% syllabus gap"
          colorIdentity="yellow"
          icon={<AlertCircle size={18} />}
        />

        <StatCard
          title="At Risk / Action"
          value={summary?.significantSlippage || 3}
          subtitle="12% - 25% syllabus gap"
          colorIdentity="amber"
          icon={<AlertTriangle size={18} />}
        />

        <StatCard
          title="Critical Deficit"
          value={summary?.critical || 1}
          subtitle="> 25% gap / Action required"
          colorIdentity="red"
          icon={<ShieldAlert size={18} />}
        />
      </div>

      {/* Academic Health Summary + Trajectory Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '28px' }}>
        {/* Progress Comparison SVG Chart Card */}
        <div className="glass-card" style={{
          padding: '22px 24px',
          background: 'rgba(255, 255, 255, 0.88)',
          border: '1px solid rgba(226, 232, 240, 0.9)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
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
                  Analytics
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                  Expected vs Actual Syllabus Trajectory
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Aggregated syllabus progress curve across 24 Department of CSE courses
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                <span style={{ width: '10px', height: '3px', background: '#94A3B8' }} /> Planned Target
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 700 }}>
                <span style={{ width: '10px', height: '3px', background: '#10B981', borderRadius: '2px' }} /> Delivered
              </span>
            </div>
          </div>

          {/* Inline SVG Chart */}
          <div style={{ width: '100%', height: '180px' }}>
            <svg viewBox="0 0 500 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="hodChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="140" x2="500" y2="140" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="0" y1="95" x2="500" y2="95" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
              <path
                d="M 20 140 Q 120 110, 250 70 T 480 30"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 20 140 Q 120 120, 250 90 T 480 55"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 20 140 Q 120 120, 250 90 T 480 55 L 480 140 L 20 140 Z"
                fill="url(#hodChartGrad)"
              />
            </svg>
          </div>
        </div>

        {/* Academic Health Visual Summary Card */}
        <div className="glass-card" style={{
          padding: '22px 24px',
          background: 'rgba(255, 255, 255, 0.88)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: '#F0EEFF',
                color: '#6C63FF',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                Department Summary
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Academic Health
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#059669', fontWeight: 700 }}>On Pace (66%)</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>16 Courses</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill on-track" style={{ width: '66%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#D97706', fontWeight: 700 }}>Attention (17%)</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>4 Courses</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill minor" style={{ width: '17%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#EA580C', fontWeight: 700 }}>At Risk (13%)</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>3 Courses</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill significant" style={{ width: '13%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#DC2626', fontWeight: 700 }}>Critical Deficit (4%)</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>1 Course</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill critical" style={{ width: '4%' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '10px 12px',
            borderRadius: '8px',
            background: '#F0EEFF',
            border: '1px solid #E0DBFF',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            color: '#6C63FF'
          }}>
            <Sparkles size={14} />
            <span>AI recovery suggested for CS304 (Unit 3 slippage)</span>
          </div>
        </div>
      </div>

      {/* Courses Requiring Attention Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: '#FFF7ED',
                color: '#EA580C',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                Action Priority
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Courses Flagged for Review
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Deterministic syllabus predictions comparing planned vs covered units
            </p>
          </div>

          <Link href="/hod/courses" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              View All 24 Courses <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* Clean Styled Table of Courses */}
        <div className="glass-card" style={{
          padding: '0',
          overflow: 'hidden',
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          boxShadow: '0 4px 20px -2px rgba(108, 99, 255, 0.04)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Course & Code</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Faculty</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Section</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Coverage</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status Flag</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr
                  key={course.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: idx % 2 === 1 ? '#FAFCFF' : '#FFFFFF',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#FAFCFF' : '#FFFFFF')}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{course.name}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{course.code}</div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>
                    {course.facultyName}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      padding: '3px 9px',
                      borderRadius: '6px',
                      background: '#F1F5F9',
                      color: 'var(--text-secondary)',
                      fontSize: '0.76rem',
                      fontWeight: 700
                    }}>
                      {course.section}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CircularProgressRing
                        percentage={course.actualPercentage}
                        status={course.riskLevel}
                        size={46}
                        strokeWidth={4.5}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.96rem', fontFamily: 'var(--font-heading)' }}>
                          {course.actualPercentage}%
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Exp {course.expectedPercentage}%
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <RiskBadge level={course.riskLevel} />
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href={`/hod/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                      <button className="btn-secondary" style={{ padding: '7px 14px', fontSize: '0.78rem' }}>
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3D Syllabus Topics Visualizer for HOD */}
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
              Interactive 3D
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="#6C63FF" />
              Curriculum Unit Visualizer
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Inspect core curriculum syllabus units in interactive WebGL. Units color-coded by syllabus pace.
          </p>
        </div>

        <Topics3DWidget
          courseCode="CS304"
          courseTitle="Artificial Intelligence & Search • Lagging Unit Inspection"
        />
      </div>
    </AppShell>
  );
}
