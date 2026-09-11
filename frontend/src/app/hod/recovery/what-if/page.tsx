'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import { calculateWhatIf } from '@/services/recoveryService';
import { Sliders, Sparkles, TrendingUp, Calendar, CheckCircle2, AlertTriangle, ArrowRight, Zap } from 'lucide-react';

export default function HodWhatIfSimulatorPage() {
  const [extraClasses, setExtraClasses] = useState(2);
  const [selectedCourse, setSelectedCourse] = useState('Operating Systems (CS303 - CSE-A)');

  const result = calculateWhatIf(extraClasses);

  return (
    <AppShell>
      {/* Screen Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))', color: '#ec4899', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            <Sliders size={12} /> Interactive Syllabus Trajectory Simulator
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
          What-If Recovery Schedule Simulator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Simulate the impact of extra recovery classes on completion timelines in real-time.
        </p>
      </div>

      {/* Simulator Controls Card */}
      <div className="glass-card" style={{
        padding: '32px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.3)'
      }}>
        {/* Course Select Dropdown */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px' }}>
            Select Target Course to Simulate:
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '450px',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              fontSize: '0.95rem',
              fontWeight: 700,
              outline: 'none'
            }}
          >
            <option value="Operating Systems (CS303 - CSE-A)">Operating Systems (CS303 - CSE-A) • 18% Lag</option>
            <option value="Artificial Intelligence (CS304 - CSE-C)">Artificial Intelligence (CS304 - CSE-C) • 32% Lag</option>
            <option value="Java Programming (CS302 - CSE-B)">Java Programming (CS302 - CSE-B) • 10% Lag</option>
          </select>
        </div>

        {/* Counter Widget */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
              Additional Extra Recovery Classes:
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Adjust counter to calculate revised completion trajectory
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => setExtraClasses(Math.max(0, extraClasses - 1))}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#fff',
                fontSize: '1.4rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              -
            </button>

            <span style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: '#818cf8',
              minWidth: '50px',
              textAlign: 'center'
            }}>
              {extraClasses}
            </span>

            <button
              onClick={() => setExtraClasses(extraClasses + 1)}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#fff',
                fontSize: '1.4rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Dynamic Simulation Result Box */}
        <div className="glass-card" style={{
          padding: '24px',
          background: result.isBackOnTrack ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
          borderColor: result.isBackOnTrack ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: result.isBackOnTrack ? '#10b981' : '#f59e0b' }}>
              Simulated Forecast Output
            </span>
            <span className={result.isBackOnTrack ? 'badge badge-on-track' : 'badge badge-minor'}>
              {result.statusText}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Baseline Completion</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444', textDecoration: 'line-through' }}>
                January 15, 2027
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Revised Simulated Finish</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-heading)' }}>
                {result.newCompletionDate}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#818cf8' }}>Simulated Coverage</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#818cf8', fontFamily: 'var(--font-heading)' }}>
                {result.newCoverage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div style={{ textAlign: 'right' }}>
        <Link href="/hod/timetable" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '12px 24px' }}>
            <Zap size={18} /> Apply {extraClasses} Extra Classes in Timetable <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </AppShell>
  );
}
