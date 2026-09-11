'use client';

import React, { useState } from 'react';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
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
          <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <FileText size={12} /> Institutional Compliance & Progress Audit
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
          Academic Progress Reports
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Export departmental syllabus coverage statistics, risk audit trails, and recovery schedule logs.
        </p>
      </div>

      {/* Control Bar */}
      <div className="glass-card" style={{
        padding: '20px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>Report Frequency:</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
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
          <button onClick={handleGenerate} className="btn-secondary" style={{ padding: '10px 18px' }}>
            <Printer size={16} /> {isGenerating ? 'Compiling Report...' : 'Generate Report'}
          </button>

          <button onClick={handleDownload} className="btn-primary" style={{ padding: '10px 18px' }}>
            <Download size={16} /> {isDownloaded ? 'PDF Downloaded ✓' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Summary KPI Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <StatCard title="Total Courses" value="24" subtitle="CSE Department" />
        <StatCard title="On Track" value="16" glowColor="emerald" />
        <StatCard title="Minor Slippage" value="4" glowColor="amber" />
        <StatCard title="Significant Slippage" value="3" glowColor="amber" />
        <StatCard title="Critical Risk" value="1" glowColor="crimson" />
      </div>

      {/* Faculty-wise & Section-wise Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Faculty-wise Progress Table */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
            Faculty-Wise Syllabus Execution Pace
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { name: 'Dr. Ramesh Kumar', courses: 'DBMS, CN', coverage: '89%', status: 'ON_TRACK' },
              { name: 'Prof. Ananya Sharma', courses: 'Java, SE', coverage: '84%', status: 'MINOR_SLIPPAGE' },
              { name: 'Dr. Vikramaditya Rao', courses: 'Operating Systems', coverage: '64%', status: 'SIGNIFICANT_SLIPPAGE' },
              { name: 'Prof. Suresh Verma', courses: 'Artificial Intelligence', coverage: '48%', status: 'CRITICAL' }
            ].map((fac, idx) => (
              <div key={idx} style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>{fac.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Courses: {fac.courses}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>{fac.coverage}</div>
                  <span className="badge" style={{
                    fontSize: '0.65rem',
                    background: fac.status === 'ON_TRACK' ? 'rgba(16,185,129,0.15)' : fac.status === 'CRITICAL' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                    color: fac.status === 'ON_TRACK' ? '#10b981' : fac.status === 'CRITICAL' ? '#ef4444' : '#f59e0b'
                  }}>
                    {fac.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section-wise Progress Table */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
            Section-Wise Performance Metric
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { section: 'CSE Section A', avgCoverage: '82%', laggingCourses: 1 },
              { section: 'CSE Section B', avgCoverage: '78%', laggingCourses: 2 },
              { section: 'CSE Section C', avgCoverage: '68%', laggingCourses: 1 }
            ].map((sec, idx) => (
              <div key={idx} style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>{sec.section}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{sec.laggingCourses} course lagging</div>
                </div>

                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#818cf8', fontFamily: 'var(--font-heading)' }}>
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
