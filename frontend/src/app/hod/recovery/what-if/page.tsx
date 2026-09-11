'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import StatusMarker from '@/components/ui/StatusMarker';
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
          <span className="badge" style={{ background: '#FFFFFF', color: 'var(--ink)', border: '1px solid var(--line)' }}>
            <Sliders size={12} color="var(--brass)" /> Interactive Syllabus Trajectory Simulator
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
          What-If Recovery Schedule Simulator
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem' }}>
          Simulate the impact of extra recovery classes on completion timelines in real-time.
        </p>
      </div>

      {/* Simulator Controls Card */}
      <div className="glass-card" style={{
        padding: '28px',
        marginBottom: '24px',
        background: '#FFFFFF',
        border: '1px solid var(--line)'
      }}>
        {/* Course Select Dropdown */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
            Select Target Course to Simulate:
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '450px',
              padding: '10px 14px',
              borderRadius: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontSize: '0.9rem',
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
          background: 'var(--paper)',
          padding: '20px 24px',
          borderRadius: '6px',
          border: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>
              Additional Extra Recovery Classes:
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
              Adjust counter to calculate revised completion trajectory
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setExtraClasses(Math.max(0, extraClasses - 1))}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: '#FFFFFF',
                color: 'var(--ink)',
                fontSize: '1.3rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              -
            </button>

            <span style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              color: 'var(--ink)',
              minWidth: '45px',
              textAlign: 'center'
            }}>
              {extraClasses}
            </span>

            <button
              onClick={() => setExtraClasses(extraClasses + 1)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: '#FFFFFF',
                color: 'var(--ink)',
                fontSize: '1.3rem',
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
          padding: '20px 24px',
          background: 'var(--paper)',
          border: '1px solid var(--line)',
          borderLeft: result.isBackOnTrack ? '4px solid var(--ontrack)' : '4px solid var(--monitor)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)' }}>
              Simulated Forecast Output
            </span>
            <StatusMarker
              status={result.isBackOnTrack ? 'ON_TRACK' : 'MONITOR'}
              label={result.statusText}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Baseline Completion</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--critical)', textDecoration: 'line-through', fontFamily: 'var(--font-serif)' }}>
                January 15, 2027
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ontrack)' }}>Revised Simulated Finish</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ontrack)', fontFamily: 'var(--font-serif)' }}>
                {result.newCompletionDate}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Simulated Coverage</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
                {result.newCoverage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation CTA (Single Primary CTA on this page) */}
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
