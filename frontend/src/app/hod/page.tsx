'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import RiskBadge from '@/components/ui/RiskBadge';
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
  Building
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
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
              Semester 5 Overview
            </span>
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            Head of Department Executive Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Predictive syllabus completion engine • 4 courses flagged for syllabus adjustment.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/hod/recovery" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
              <Zap size={16} /> Recovery Engine <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <StatCard
          title="Total Courses"
          value={summary?.totalCourses || 24}
          subtitle="All CSE Sections"
          icon={<BookOpen size={20} color="#818cf8" />}
          glowColor="indigo"
        />

        <StatCard
          title="On Track"
          value={summary?.onTrack || 16}
          subtitle="Pace matching target"
          icon={<CheckCircle2 size={20} color="#10b981" />}
          glowColor="emerald"
        />

        <StatCard
          title="Minor Slippage"
          value={summary?.minorSlippage || 4}
          subtitle="5% - 12% gap"
          icon={<AlertCircle size={20} color="#f59e0b" />}
          glowColor="amber"
        />

        <StatCard
          title="Significant Slippage"
          value={summary?.significantSlippage || 3}
          subtitle="12% - 25% gap"
          icon={<AlertTriangle size={20} color="#f97316" />}
          glowColor="amber"
        />

        <StatCard
          title="Critical Deficit"
          value={summary?.critical || 1}
          subtitle="> 25% gap / Action required"
          icon={<ShieldAlert size={20} color="#ef4444" />}
          glowColor="crimson"
        />

        <StatCard
          title="Overall Coverage"
          value={`${summary?.overallSyllabusCoverage || 76}%`}
          subtitle="Dept Average"
          icon={<TrendingUp size={20} color="#818cf8" />}
          glowColor="indigo"
        />
      </div>

      {/* Charts & Analytics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Progress Comparison SVG Chart Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                Expected vs Actual Department Progress
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Weekly syllabus completion trajectory across CSE department
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6366f1' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#6366f1' }} /> Expected %
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10b981' }} /> Actual %
              </div>
            </div>
          </div>

          {/* SVG Line Graph */}
          <div style={{ width: '100%', height: '220px', position: 'relative' }}>
            <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="165" x2="500" y2="165" stroke="rgba(255,255,255,0.06)" />

              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeDasharray="6 4"
                points="0,165 62,145 125,125 187,105 250,85 312,65 375,45 437,25 500,10"
              />

              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                points="0,165 62,147 125,130 187,112 250,96 312,80 375,66 437,50 500,38"
              />

              <circle cx="500" cy="38" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '12px' }}>
            <span>Week 1</span>
            <span>Week 3</span>
            <span>Week 5</span>
            <span>Week 7</span>
            <span>Week 9 (Current)</span>
          </div>
        </div>

        {/* Course Progress Distribution Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
            Course Progress Distribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#10b981', fontWeight: 600 }}>On Track (66%)</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>16 Courses</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '66%', background: '#10b981' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>Minor Slippage (17%)</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>4 Courses</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '17%', background: '#f59e0b' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#f97316', fontWeight: 600 }}>Significant Slippage (13%)</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>3 Courses</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '13%', background: '#f97316' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>Critical Deficit (4%)</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>1 Course</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '4%', background: '#ef4444' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Requiring Attention Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
              Courses Requiring Immediate Attention
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Flagged by predictive completion engine for progress deficit
            </p>
          </div>

          <Link href="/hod/courses" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
              View All 24 Courses <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* Table of Courses */}
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Course & Code</th>
                <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Faculty</th>
                <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Section</th>
                <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Coverage (Exp vs Act)</th>
                <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Progress Status</th>
                <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: 700, color: '#f8fafc' }}>{course.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{course.code}</div>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#cbd5e1' }}>
                    {course.facultyName}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1' }}>
                      {course.section}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, color: '#f8fafc' }}>{course.actualPercentage}%</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>(Exp {course.expectedPercentage}%)</span>
                    </div>
                    <div className="progress-bar-bg" style={{ width: '120px' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${course.actualPercentage}%`,
                          background: course.riskLevel === 'ON_TRACK' ? '#10b981' : course.riskLevel === 'MINOR_SLIPPAGE' ? '#f59e0b' : course.riskLevel === 'SIGNIFICANT_SLIPPAGE' ? '#f97316' : '#ef4444'
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <RiskBadge level={course.riskLevel} />
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <Link href={`/hod/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                      <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
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
    </AppShell>
  );
}
