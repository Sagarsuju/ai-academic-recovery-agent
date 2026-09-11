'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import { CheckCircle2, TrendingUp, Sparkles, ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

export default function ClassUpdateConfirmationPage() {
  return (
    <AppShell>
      <div style={{ maxWidth: '680px', margin: '40px auto 0 auto' }}>
        {/* Animated Success Glass Card */}
        <div className="glass-card" style={{
          padding: '40px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
          borderColor: 'rgba(16, 185, 129, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated Glow Circle */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)'
          }}>
            <CheckCircle2 size={46} color="#ffffff" />
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            Class Update Confirmed!
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '28px' }}>
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
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '16px 20px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600, color: '#10b981' }}>
              <CheckCircle2 size={18} /> <span>Attendance Recorded (52 Present / 3 Absent)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600, color: '#10b981' }}>
              <CheckCircle2 size={18} /> <span>Topic Completion Logged ("SQL Joins")</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600, color: '#10b981' }}>
              <CheckCircle2 size={18} /> <span>Syllabus Percentage Updated</span>
            </div>
          </div>

          {/* Syllabus Progress Bump Visual */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.8)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} /> Course Syllabus Progress
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
                +2.0% Increase
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Previous Coverage</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#94a3b8' }}>68%</div>
              </div>

              <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1.2rem' }}>
                ➜
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>New Coverage</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>70%</div>
              </div>
            </div>

            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '70%', background: 'linear-gradient(90deg, #6366f1, #10b981)' }} />
            </div>

            <div style={{
              marginTop: '16px',
              padding: '10px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <Sparkles size={16} /> Great! Course is currently on track.
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <Link href="/faculty" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '12px 24px' }}>
                Return to Dashboard <ArrowRight size={18} />
              </button>
            </Link>

            <Link href="/faculty/attendance" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ padding: '12px 24px' }}>
                Log Another Class
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
