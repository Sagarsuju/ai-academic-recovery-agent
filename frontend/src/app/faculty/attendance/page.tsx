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
            <span className="badge" style={{ background: '#FFFFFF', color: 'var(--ink)', border: '1px solid var(--line)' }}>
              <CheckSquare size={12} color="var(--brass)" /> Combined Class Recording Workflow
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--ink)',
            marginBottom: '4px',
            letterSpacing: '-0.02em'
          }}>
            Mark Attendance & Log Topic Completion
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem' }}>
            Attendance and syllabus progress are recorded together post-lecture for instant departmental progress calculation.
          </p>
        </div>

        {/* Course Info Header Card */}
        <div className="glass-card" style={{
          padding: '24px',
          marginBottom: '24px',
          background: '#FFFFFF',
          border: '1px solid var(--line)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>
                  Database Management Systems
                </h2>
                <span className="badge" style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                  CSE-A
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                  (CS301)
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                Faculty: Prof. Ananya Sharma • Department of Computer Science & Engineering
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            background: 'var(--paper)',
            padding: '14px 18px',
            borderRadius: '6px',
            border: '1px solid var(--line)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="var(--ink)" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Time</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>10:00 AM - 11:00 AM</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="var(--ink)" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Venue</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>Room AB1-302</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={18} color="var(--ink)" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Total Enrolled</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>55 Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* SECTION 1: Attendance Section */}
          <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--ink)" /> 1. Student Attendance Summary
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              {/* Present Count Card */}
              <div style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '16px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--ontrack)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px' }}>
                  <UserCheck size={16} /> Present
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setPresent(Math.max(0, present - 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: '1px solid var(--line)',
                      background: '#FFFFFF',
                      color: 'var(--ink)',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>

                  <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
                    {present}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPresent(Math.min(total, present + 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: '1px solid var(--line)',
                      background: '#FFFFFF',
                      color: 'var(--ink)',
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
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '16px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--atrisk)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px' }}>
                  <UserX size={16} /> Absent
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setAbsent(Math.max(0, absent - 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: '1px solid var(--line)',
                      background: '#FFFFFF',
                      color: 'var(--ink)',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>

                  <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--atrisk)' }}>
                    {absent}
                  </span>

                  <button
                    type="button"
                    onClick={() => setAbsent(absent + 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: '1px solid var(--line)',
                      background: '#FFFFFF',
                      color: 'var(--ink)',
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
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '16px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--ink-muted)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px' }}>
                  Attendance %
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
                  {Math.round((present / total) * 100)}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)' }}>
                  {present} of {total} present
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Topic Completion Section */}
          <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--ink)" /> 2. Syllabus Topic Logging
            </h3>

            <div style={{
              padding: '14px 18px',
              borderRadius: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Today's Planned Syllabus Topic
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)', marginTop: '2px', fontFamily: 'var(--font-serif)' }}>
                "SQL Joins (Inner Join, Left/Right Outer Join, Cross Join)"
              </div>
            </div>

            {/* Topic Status Radio Buttons */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' }}>
                Topic Status
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setTopicStatus('COMPLETED')}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: topicStatus === 'COMPLETED' ? '2px solid var(--ontrack)' : '1px solid var(--line)',
                    background: topicStatus === 'COMPLETED' ? 'rgba(47, 158, 119, 0.08)' : '#FFFFFF',
                    color: topicStatus === 'COMPLETED' ? 'var(--ontrack)' : 'var(--ink-muted)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={16} /> Completed
                </button>

                <button
                  type="button"
                  onClick={() => setTopicStatus('PARTIALLY_COMPLETED')}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: topicStatus === 'PARTIALLY_COMPLETED' ? '2px solid var(--monitor)' : '1px solid var(--line)',
                    background: topicStatus === 'PARTIALLY_COMPLETED' ? 'rgba(217, 143, 43, 0.08)' : '#FFFFFF',
                    color: topicStatus === 'PARTIALLY_COMPLETED' ? 'var(--monitor)' : 'var(--ink-muted)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Clock size={16} /> Partially Completed
                </button>

                <button
                  type="button"
                  onClick={() => setTopicStatus('NOT_COMPLETED')}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: topicStatus === 'NOT_COMPLETED' ? '2px solid var(--critical)' : '1px solid var(--line)',
                    background: topicStatus === 'NOT_COMPLETED' ? 'rgba(140, 47, 57, 0.08)' : '#FFFFFF',
                    color: topicStatus === 'NOT_COMPLETED' ? 'var(--critical)' : 'var(--ink-muted)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <UserX size={16} /> Not Completed
                </button>
              </div>
            </div>

            {/* Optional Actual Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
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
                  borderRadius: '6px',
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Submit Action Button (Single Primary CTA with Brass left border) */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{
              padding: '14px',
              fontSize: '1rem',
              fontWeight: 700,
              width: '100%'
            }}
          >
            {isSubmitting ? 'Recording Updates...' : 'Submit Class Update'} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
