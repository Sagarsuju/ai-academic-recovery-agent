'use client';

import React, { useState } from 'react';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import StatusMarker from '@/components/ui/StatusMarker';
import { FileText, Download, Printer, Filter, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

export default function HodReportsPage() {
  const [reportType, setReportType] = useState('WEEKLY');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 500);
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge" style={{ background: '#FFFFFF', color: 'var(--ink)', border: '1px solid var(--line)' }}>
            <FileText size={12} color="var(--brass)" /> Institutional Compliance & Progress Audit
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
          Academic Progress Reports
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem' }}>
          Export departmental syllabus coverage statistics, risk audit trails, and recovery schedule logs.
        </p>
      </div>

      {/* Control Bar */}
      <div className="glass-card" style={{
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: '#FFFFFF',
        border: '1px solid var(--line)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-muted)' }}>Report Frequency:</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="WEEKLY">Weekly Academic Report (Week 9)</option>
            <option value="MONTHLY">Monthly Department Summary</option>
            <option value="MIDTERM">Mid-Term Syllabus Audit</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleGenerate} className="btn-secondary" style={{ padding: '8px 16px' }}>
            <Printer size={16} /> {isGenerating ? 'Compiling Report...' : 'Generate Report'}
          </button>

          <button onClick={handleDownload} className="btn-primary" style={{ padding: '8px 18px' }}>
            <Download size={16} /> {isDownloaded ? 'PDF Downloaded ✓' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Summary KPI Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <StatCard title="Total Courses" value="24" subtitle="CSE Department" />
        <StatCard title="On Track" value="16" />
        <StatCard title="Minor Slippage" value="4" />
        <StatCard title="Significant Slippage" value="3" />
        <StatCard title="Critical Risk" value="1" />
      </div>

      {/* Faculty-wise & Section-wise Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Faculty-wise Progress Table */}
        <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
            Faculty-Wise Syllabus Execution Pace
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Dr. Ramesh Kumar', courses: 'DBMS, CN', coverage: '89%', status: 'ON_TRACK' as const },
              { name: 'Prof. Ananya Sharma', courses: 'Java, SE', coverage: '84%', status: 'MONITOR' as const },
              { name: 'Dr. Vikramaditya Rao', courses: 'Operating Systems', coverage: '64%', status: 'AT_RISK' as const },
              { name: 'Prof. Suresh Verma', courses: 'Artificial Intelligence', coverage: '48%', status: 'CRITICAL' as const }
            ].map((fac, idx) => (
              <div key={idx} style={{
                padding: '12px 16px',
                borderRadius: '6px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>{fac.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Courses: {fac.courses}</div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>{fac.coverage}</div>
                  <StatusMarker status={fac.status} label={fac.status.replace('_', ' ')} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section-wise Progress Table */}
        <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
            Section-Wise Performance Metric
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { section: 'CSE Section A', avgCoverage: '82%', laggingCourses: 1 },
              { section: 'CSE Section B', avgCoverage: '78%', laggingCourses: 2 },
              { section: 'CSE Section C', avgCoverage: '68%', laggingCourses: 1 }
            ].map((sec, idx) => (
              <div key={idx} style={{
                padding: '16px',
                borderRadius: '6px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>{sec.section}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{sec.laggingCourses} course lagging</div>
                </div>

                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
                  {sec.avgCoverage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
