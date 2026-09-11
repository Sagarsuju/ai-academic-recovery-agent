'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/ui/AppShell';
import {
  CheckSquare,
  Users,
  UserCheck,
  UserX,
  BookOpen,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { submitAttendanceAndUpdate } from '@/services/attendanceService';

export default function FacultyAttendancePage() {
  const router = useRouter();

  const [present, setPresent] = useState(52);
  const [absent, setAbsent] = useState(3);
  const total = present + absent;

  const [topicStatus, setTopicStatus] = useState<'COMPLETED' | 'PARTIALLY_COMPLETED' | 'NOT_COMPLETED'>('COMPLETED');
  const [actualTopic, setActualTopic] = useState('Covered Inner Join, Left/Right Outer Join with hands-on queries in MySQL.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitAttendanceAndUpdate({
      courseId: 'course-dbms-a',
      date: new Date().toISOString(),
      presentCount: present,
      absentCount: absent,
      totalCount: total,
      topicStatus,
      actualTopicCovered: actualTopic
    });
    router.push('/faculty/class-update');
  };

  return (
    <AppShell>
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        {/* Screen Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <CheckSquare size={12} /> Combined Class Recording Workflow
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Mark Attendance & Log Topic Completion
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Attendance and syllabus progress are recorded together post-lecture for instant departmental progress calculation.
          </p>
        </div>

        {/* Course Info Header Card */}
        <div className="glass-card" style={{
          padding: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                  Database Management Systems
                </h2>
                <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>
                  CSE-A
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  (CS301)
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Faculty: Prof. Ananya Sharma • Department of Computer Science & Engineering
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '14px 18px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#818cf8" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Time</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>10:00 AM - 11:00 AM</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="#818cf8" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Venue</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Room AB1-302</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={18} color="#818cf8" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Enrolled</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>55 Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* SECTION 1: Attendance Section */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#818cf8" /> 1. Student Attendance Summary
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px'
            }}>
              {/* Present Count Card */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '16px',
                borderRadius: '14px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  <UserCheck size={16} /> Present
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setPresent(Math.max(0, present - 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#fff',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>

                  <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#f8fafc' }}>
                    {present}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPresent(Math.min(total, present + 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#fff',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Absent Count Card */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                padding: '16px',
                borderRadius: '14px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  <UserX size={16} /> Absent
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setAbsent(Math.max(0, absent - 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      background: 'rgba(239, 68, 68, 0.2)',
                      color: '#fff',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>

                  <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#f8fafc' }}>
                    {absent}
                  </span>

                  <button
                    type="button"
                    onClick={() => setAbsent(absent + 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      background: 'rgba(239, 68, 68, 0.2)',
                      color: '#fff',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Class Strength */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '16px',
                borderRadius: '14px',
                textAlign: 'center'
              }}>
                <div style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  Attendance %
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#6366f1' }}>
                  {Math.round((present / total) * 100)}%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {present} of {total} present
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Topic Completion Section */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="#818cf8" /> 2. Syllabus Topic Logging
            </h3>

            <div style={{
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Today's Planned Syllabus Topic
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>
                "SQL Joins (Inner Join, Left/Right Outer Join, Cross Join)"
              </div>
            </div>

            {/* Topic Status Radio Buttons */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>
                Topic Status
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setTopicStatus('COMPLETED')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: topicStatus === 'COMPLETED' ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: topicStatus === 'COMPLETED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: topicStatus === 'COMPLETED' ? '#10b981' : '#94a3b8',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={18} /> Completed
                </button>

                <button
                  type="button"
                  onClick={() => setTopicStatus('PARTIALLY_COMPLETED')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: topicStatus === 'PARTIALLY_COMPLETED' ? '2px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: topicStatus === 'PARTIALLY_COMPLETED' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: topicStatus === 'PARTIALLY_COMPLETED' ? '#f59e0b' : '#94a3b8',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Clock size={18} /> Partially Completed
                </button>

                <button
                  type="button"
                  onClick={() => setTopicStatus('NOT_COMPLETED')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: topicStatus === 'NOT_COMPLETED' ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: topicStatus === 'NOT_COMPLETED' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: topicStatus === 'NOT_COMPLETED' ? '#ef4444' : '#94a3b8',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <UserX size={18} /> Not Completed
                </button>
              </div>
            </div>

            {/* Optional Actual Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px' }}>
                Actual Topic Details / Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={actualTopic}
                onChange={(e) => setActualTopic(e.target.value)}
                placeholder="Enter specific topics covered or reasons for partial coverage..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#f8fafc',
                  fontSize: '0.88rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{
              padding: '16px',
              fontSize: '1.05rem',
              fontWeight: 800,
              width: '100%',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
            }}
          >
            {isSubmitting ? 'Recording Updates...' : 'Submit Class Update'} <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
