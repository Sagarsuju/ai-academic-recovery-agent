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
        <Link href="/hod/courses" style={{ textDecoration: 'none', color: 'var(--ink)', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Course Catalog
        </Link>
      </div>

      {/* Course Header Glass Card */}
      <div className="glass-card" style={{
        padding: '28px',
        marginBottom: '24px',
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span className="badge" style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
              {course.code}
            </span>
            <span className="badge" style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
              Section {course.section}
            </span>
            <RiskBadge level={course.riskLevel} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--ink)',
            marginBottom: '6px',
            letterSpacing: '-0.02em'
          }}>
            {course.name}
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span><UserCheck size={14} style={{ display: 'inline', marginRight: '4px' }} /> Faculty: <strong style={{ color: 'var(--ink)' }}>{course.facultyName}</strong></span>
            <span>• {course.department}</span>
          </p>
        </div>

        {/* Generate Recovery Plan CTA Button (Single Primary CTA per page) */}
        <div>
          <Link href={`/hod/recovery?courseId=${course.id}`} style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
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
        marginBottom: '24px'
      }}>
        {/* Expected vs Actual Card */}
        <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: '12px' }}>
            Syllabus Coverage Breakdown
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
              {course.actualPercentage}%
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
              Actual / <strong style={{ color: 'var(--ink)' }}>{course.expectedPercentage}% Expected</strong>
            </div>
          </div>

          <div className="progress-bar-bg" style={{ height: '8px', marginBottom: '12px', background: '#DDD7C8', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${course.actualPercentage}%`,
                background: course.gapPercentage > 10 ? 'var(--critical)' : course.gapPercentage > 0 ? 'var(--atrisk)' : 'var(--ontrack)',
                height: '100%'
              }}
            />
          </div>

          <div style={{ fontSize: '0.8rem', color: course.gapPercentage > 0 ? 'var(--atrisk)' : 'var(--ontrack)', fontWeight: 700 }}>
            {course.gapPercentage > 0 ? `⚠ ${course.gapPercentage}% syllabus deficit from timeline` : '✓ On schedule'}
          </div>
        </div>

        {/* Prediction Box */}
        <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)', borderLeft: '4px solid var(--critical)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--critical)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> AI Predicted Delay Forecast
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Planned Target</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>{course.plannedCompletionDate}</div>
            </div>

            <div style={{ color: 'var(--critical)', fontWeight: 800, fontSize: '1.2rem' }}>
              ➔
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--critical)' }}>Predicted Finish</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--critical)', fontFamily: 'var(--font-serif)' }}>{course.predictedCompletionDate}</div>
            </div>
          </div>

          <div style={{
            padding: '10px 14px',
            borderRadius: '6px',
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            color: 'var(--critical)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textAlign: 'center'
          }}>
            AI Prediction: {course.delayDays > 0 ? `${course.delayDays} days late` : 'On Time'}
          </div>
        </div>
      </div>

      {/* Unit Level Progress & Pending Topics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Unit-Level Progress Breakdown */}
        <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '20px' }}>
            Unit-Level Syllabus Coverage
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {course.units.map((unit) => (
              <div key={unit.unitNumber}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>
                    Unit {unit.unitNumber}: {unit.unitTitle}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: unit.percentage === 100 ? 'var(--ontrack)' : unit.percentage >= 50 ? 'var(--monitor)' : 'var(--critical)', fontFamily: 'var(--font-serif)' }}>
                    {unit.percentage}% {unit.percentage === 100 ? '✓' : unit.percentage >= 50 ? '•' : '▲'}
                  </span>
                </div>

                <div className="progress-bar-bg" style={{ height: '6px', background: '#DDD7C8', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${unit.percentage}%`,
                      background: unit.percentage === 100 ? 'var(--ontrack)' : unit.percentage >= 50 ? 'var(--monitor)' : 'var(--critical)',
                      height: '100%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Critical Topics */}
        <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '20px' }}>
            Pending High-Priority Topics
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {course.pendingTopics.map((topic) => (
              <div key={topic.id} style={{
                padding: '14px',
                borderRadius: '6px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                    {topic.topicTitle}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    Unit {topic.unitNumber} • Est. {topic.estimatedHours} Lecture Hours
                  </div>
                </div>

                <span className="badge" style={{
                  background: '#FFFFFF',
                  color: topic.priority === 'HIGH' ? 'var(--critical)' : 'var(--monitor)',
                  border: '1px solid var(--line)'
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
