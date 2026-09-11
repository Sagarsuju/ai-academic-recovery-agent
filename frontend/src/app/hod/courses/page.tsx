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
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
          Department Course Progress Catalog
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
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
        gap: '16px'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="Search by course, code, or faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
            <Filter size={14} /> Risk Tier:
          </div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
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
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
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
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Course</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Faculty</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Section</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Expected %</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Actual %</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Gap</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Risk Status</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Predicted Completion</th>
              <th style={{ padding: '14px 20px', color: '#94a3b8', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: '#f8fafc' }}>{course.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{course.code}</div>
                </td>

                <td style={{ padding: '16px 20px', color: '#cbd5e1' }}>
                  {course.facultyName}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1' }}>
                    {course.section}
                  </span>
                </td>

                <td style={{ padding: '16px 20px', fontWeight: 600, color: '#94a3b8' }}>
                  {course.expectedPercentage}%
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
                    {course.actualPercentage}%
                  </div>
                  <div className="progress-bar-bg" style={{ width: '90px' }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${course.actualPercentage}%`,
                        background: course.riskLevel === 'ON_TRACK' ? '#10b981' : course.riskLevel === 'MINOR_SLIPPAGE' ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                </td>

                <td style={{ padding: '16px 20px', fontWeight: 700, color: course.gapPercentage > 0 ? '#ef4444' : '#10b981' }}>
                  {course.gapPercentage > 0 ? `+${course.gapPercentage}% lag` : `${course.gapPercentage}% ahead`}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <RiskBadge level={course.riskLevel} />
                </td>

                <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="#94a3b8" /> {course.predictedCompletionDate}
                  </div>
                  {course.delayDays > 0 && (
                    <div style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '2px', fontWeight: 600 }}>
                      ({course.delayDays} days late)
                    </div>
                  )}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <Link href={`/hod/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      Details <ArrowRight size={14} />
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
