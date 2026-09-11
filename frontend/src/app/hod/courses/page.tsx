'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import RiskBadge from '@/components/ui/RiskBadge';
import { getCourses } from '@/services/courseService';
import { Course, RiskLevel } from '@/types';
import { Search, Filter, BookOpen, ArrowRight, Calendar, AlertTriangle } from 'lucide-react';

export default function HodCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [sectionFilter, setSectionFilter] = useState<string>('ALL');

  useEffect(() => {
    async function loadData() {
      const data = await getCourses();
      setCourses(data);
    }
    loadData();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.code.toLowerCase().includes(search.toLowerCase()) ||
                          c.facultyName.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || c.riskLevel === riskFilter;
    const matchesSection = sectionFilter === 'ALL' || c.section === sectionFilter;

    return matchesSearch && matchesRisk && matchesSection;
  });

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: 'var(--ink)',
          marginBottom: '4px',
          letterSpacing: '-0.02em'
        }}>
          Department Course Progress Catalog
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem' }}>
          Comprehensive syllabus tracking, expected vs actual coverage, and predicted completion timelines.
        </p>
      </div>

      {/* Search & Filter Bar */}
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
        {/* Search Input */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--ink-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
          <input
            type="text"
            placeholder="Search by course, code, or faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
            <Filter size={14} /> Risk Tier:
          </div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          >
            <option value="ALL">All Risk Tiers</option>
            <option value="ON_TRACK">On Track</option>
            <option value="MINOR_SLIPPAGE">Minor Slippage</option>
            <option value="SIGNIFICANT_SLIPPAGE">Significant Slippage</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>

          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          >
            <option value="ALL">All Sections</option>
            <option value="CSE-A">CSE-A</option>
            <option value="CSE-B">CSE-B</option>
            <option value="CSE-C">CSE-C</option>
          </select>
        </div>
      </div>

      {/* Courses Data Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#FFFFFF', border: '1px solid var(--line)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Course</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Faculty</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Section</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Expected %</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Actual %</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Gap</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Risk Status</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Predicted Completion</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{course.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{course.code}</div>
                </td>

                <td style={{ padding: '16px 20px', color: 'var(--ink)', fontWeight: 500 }}>
                  {course.facultyName}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <span className="badge" style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                    {course.section}
                  </span>
                </td>

                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)' }}>
                  {course.expectedPercentage}%
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                    {course.actualPercentage}%
                  </div>
                  <div className="progress-bar-bg" style={{ width: '90px', background: '#DDD7C8', height: '6px', borderRadius: '3px' }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${course.actualPercentage}%`,
                        background: course.riskLevel === 'ON_TRACK' ? 'var(--ontrack)' : course.riskLevel === 'MINOR_SLIPPAGE' ? 'var(--monitor)' : 'var(--critical)',
                        height: '100%'
                      }}
                    />
                  </div>
                </td>

                <td style={{ padding: '16px 20px', fontWeight: 700, color: course.gapPercentage > 0 ? 'var(--atrisk)' : 'var(--ontrack)', fontFamily: 'var(--font-serif)' }}>
                  {course.gapPercentage > 0 ? `+${course.gapPercentage}% lag` : `${course.gapPercentage}% ahead`}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <RiskBadge level={course.riskLevel} />
                </td>

                <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-serif)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="var(--ink-muted)" /> {course.predictedCompletionDate}
                  </div>
                  {course.delayDays > 0 && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--critical)', marginTop: '2px', fontWeight: 600 }}>
                      ({course.delayDays} days late)
                    </div>
                  )}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <Link href={`/hod/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                      Details <ArrowRight size={13} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
