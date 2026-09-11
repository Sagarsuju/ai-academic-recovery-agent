'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import RiskBadge from '@/components/ui/RiskBadge';
import { getCourseById } from '@/services/courseService';
import { Course } from '@/types';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = (params?.courseId as string) || 'course-os-a';

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getCourseById(courseId);
      setCourse(data || null);
      setIsLoading(false);
    }
    loadData();
  }, [courseId]);

  if (isLoading || !course) {
    return (
      <AppShell>
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
          Loading course detail analytics...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Top Navigation Back Link */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/hod/courses" style={{ textDecoration: 'none', color: '#818cf8', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Course Catalog
        </Link>
      </div>

      {/* Course Header Glass Card */}
      <div className="glass-card" style={{
        padding: '28px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>
              {course.code}
            </span>
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1' }}>
              Section {course.section}
            </span>
            <RiskBadge level={course.riskLevel} />
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
            {course.name}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span><UserCheck size={14} style={{ display: 'inline', marginRight: '4px' }} /> Faculty: <strong style={{ color: '#f8fafc' }}>{course.facultyName}</strong></span>
            <span>• {course.department}</span>
          </p>
        </div>

        {/* Generate Recovery Plan CTA Button */}
        <div>
          <Link href={`/hod/recovery?courseId=${course.id}`} style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '14px 24px', fontSize: '0.95rem', boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)' }}>
              <Zap size={18} /> Generate Recovery Plan <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>

      {/* Metrics Row (Expected vs Actual & Prediction) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {/* Expected vs Actual Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '12px' }}>
            Syllabus Coverage Breakdown
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#f8fafc' }}>
              {course.actualPercentage}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Actual / <strong style={{ color: '#6366f1' }}>{course.expectedPercentage}% Expected</strong>
            </div>
          </div>

          <div className="progress-bar-bg" style={{ height: '10px', marginBottom: '12px' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${course.actualPercentage}%`,
                background: course.gapPercentage > 10 ? '#ef4444' : course.gapPercentage > 0 ? '#f59e0b' : '#10b981'
              }}
            />
          </div>

          <div style={{ fontSize: '0.8rem', color: course.gapPercentage > 0 ? '#ef4444' : '#10b981', fontWeight: 700 }}>
            {course.gapPercentage > 0 ? `⚠ ${course.gapPercentage}% syllabus deficit from timeline` : '✓ On schedule'}
          </div>
        </div>

        {/* Prediction Box */}
        <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(17, 24, 39, 0.8) 100%)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ef4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> AI Predicted Delay Forecast
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Planned Target</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>{course.plannedCompletionDate}</div>
            </div>

            <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.2rem' }}>
              ➔
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>Predicted Finish</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444' }}>{course.predictedCompletionDate}</div>
            </div>
          </div>

          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            fontSize: '0.85rem',
            fontWeight: 700,
            textAlign: 'center'
          }}>
            AI Prediction: {course.delayDays > 0 ? `${course.delayDays} days late` : 'On Time'}
          </div>
        </div>
      </div>

      {/* Unit Level Progress & Pending Topics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Unit-Level Progress Breakdown */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '20px' }}>
            Unit-Level Syllabus Coverage
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {course.units.map((unit) => (
              <div key={unit.unitNumber}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                    Unit {unit.unitNumber}: {unit.unitTitle}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: unit.percentage === 100 ? '#10b981' : unit.percentage >= 50 ? '#f59e0b' : '#ef4444' }}>
                    {unit.percentage}% {unit.percentage === 100 ? '✓' : unit.percentage >= 50 ? '⚠' : '🔴'}
                  </span>
                </div>

                <div className="progress-bar-bg" style={{ height: '8px' }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${unit.percentage}%`,
                      background: unit.percentage === 100 ? '#10b981' : unit.percentage >= 50 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Critical Topics */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '20px' }}>
            Pending High-Priority Topics
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {course.pendingTopics.map((topic) => (
              <div key={topic.id} style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                    {topic.topicTitle}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Unit {topic.unitNumber} • Est. {topic.estimatedHours} Lecture Hours
                  </div>
                </div>

                <span className="badge" style={{
                  background: topic.priority === 'HIGH' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: topic.priority === 'HIGH' ? '#ef4444' : '#f59e0b',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {topic.priority} PRIORITY
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
