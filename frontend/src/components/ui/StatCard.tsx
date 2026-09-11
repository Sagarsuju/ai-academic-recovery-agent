'use client';

import React from 'react';

export type StatColorIdentity = 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'cyan' | 'indigo' | 'emerald' | 'amber' | 'crimson';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  glowColor?: StatColorIdentity;
  colorIdentity?: StatColorIdentity;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  glowColor,
  colorIdentity
}: StatCardProps) {
  const chosenColor = colorIdentity || glowColor || 'purple';

  // Map to soft pastel colors
  const colorStyles: Record<string, { bg: string; iconBg: string; text: string; border: string }> = {
    purple: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#F0EEFF', text: '#6C63FF', border: 'rgba(108, 99, 255, 0.12)' },
    indigo: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#EEF2FF', text: '#818CF8', border: 'rgba(129, 140, 248, 0.12)' },
    blue: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#EAF6FF', text: '#4FACFE', border: 'rgba(79, 172, 254, 0.12)' },
    cyan: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#ECFAFF', text: '#0284C7', border: 'rgba(56, 189, 248, 0.12)' },
    green: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#ECFDF5', text: '#10B981', border: 'rgba(52, 211, 153, 0.12)' },
    emerald: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#ECFDF5', text: '#059669', border: 'rgba(5, 150, 105, 0.12)' },
    yellow: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#FFFBEB', text: '#D97706', border: 'rgba(251, 191, 36, 0.15)' },
    amber: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#FFFBEB', text: '#B45309', border: 'rgba(245, 158, 11, 0.15)' },
    red: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#FEF2F2', text: '#DC2626', border: 'rgba(248, 113, 113, 0.15)' },
    crimson: { bg: 'rgba(255, 255, 255, 0.88)', iconBg: '#FEF2F2', text: '#B91C1C', border: 'rgba(220, 38, 38, 0.15)' }
  };

  const currentStyle = colorStyles[chosenColor] || colorStyles.purple;

  return (
    <div
      className="glass-card glass-card-interactive"
      style={{
        padding: '20px 22px',
        backgroundColor: currentStyle.bg,
        border: `1px solid ${currentStyle.border}`,
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '120px',
        boxShadow: '0 4px 18px -2px rgba(108, 99, 255, 0.04), 0 2px 6px -1px rgba(30, 35, 51, 0.02)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${currentStyle.text}, transparent)`
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {title}
        </span>
        {icon && (
          <div
            style={{
              padding: '8px',
              borderRadius: '10px',
              backgroundColor: currentStyle.iconBg,
              color: currentStyle.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: '2.15rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}
      >
        {value}
      </div>

      {(subtitle || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {trend && (
            <span
              style={{
                fontWeight: 700,
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: trend.startsWith('+') ? '#ECFDF5' : trend.startsWith('-') ? '#FEF2F2' : '#F1F5F9',
                color: trend.startsWith('+') ? '#059669' : trend.startsWith('-') ? '#DC2626' : '#64748B'
              }}
            >
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
