'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import StatusMarker from '@/components/ui/StatusMarker';
import { CheckCircle2, TrendingUp, Sparkles, ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

export default function ClassUpdateConfirmationPage() {
  return (
    <AppShell>
      <div style={{ maxWidth: '680px', margin: '40px auto 0 auto' }}>
        {/* Ledger Success Card */}
        <div className="glass-card" style={{
          padding: '40px',
          textAlign: 'center',
          background: '#FFFFFF',
          borderColor: 'var(--line)',
          border: '1px solid var(--line)',
          borderRadius: '8px'
        }}>
          {/* Success Check Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--paper)',
            border: '2px solid var(--ontrack)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <CheckCircle2 size={36} color="var(--ontrack)" />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--ink)',
            marginBottom: '8px'
          }}>
            Class Update Confirmed!
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
            Lecture data has been synchronized with the HOD departmental tracking dashboard.
          </p>

          {/* Checklist of actions recorded */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '380px',
            margin: '0 auto 32px auto',
            textAlign: 'left',
            background: 'var(--paper)',
            padding: '16px 20px',
            borderRadius: '6px',
            border: '1px solid var(--line)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>
              <CheckCircle2 size={16} color="var(--ontrack)" /> <span>Attendance Recorded (52 Present / 3 Absent)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>
              <CheckCircle2 size={16} color="var(--ontrack)" /> <span>Topic Completion Logged ("SQL Joins")</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>
              <CheckCircle2 size={16} color="var(--ontrack)" /> <span>Syllabus Percentage Updated</span>
            </div>
          </div>

          {/* Syllabus Progress Bump Visual */}
          <div style={{
            background: 'var(--paper)',
            padding: '24px',
            borderRadius: '6px',
            border: '1px solid var(--line)',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} color="var(--ink)" /> Course Syllabus Progress
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ontrack)' }}>
                +2.0% Increase
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Previous Coverage</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)' }}>68%</div>
              </div>

              <div style={{ color: 'var(--ontrack)', fontWeight: 800, fontSize: '1.2rem' }}>
                ➜
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ontrack)' }}>New Coverage</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ontrack)', fontFamily: 'var(--font-serif)' }}>70%</div>
              </div>
            </div>

            <div className="progress-bar-bg" style={{ background: '#DDD7C8', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="progress-bar-fill" style={{ width: '70%', background: 'var(--ontrack)', height: '100%' }} />
            </div>

            <div style={{
              marginTop: '16px',
              padding: '10px',
              borderRadius: '6px',
              background: '#FFFFFF',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <StatusMarker status="ON_TRACK" label="Course is currently on track" />
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <Link href="/faculty" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '10px 22px' }}>
                Return to Dashboard <ArrowRight size={16} />
              </button>
            </Link>

            <Link href="/faculty/attendance" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ padding: '10px 22px' }}>
                Log Another Class
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
