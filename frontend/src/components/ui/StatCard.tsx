import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  glowColor?: 'indigo' | 'emerald' | 'amber' | 'crimson';
}

export default function StatCard({ title, value, subtitle, icon, trend, glowColor = 'indigo' }: StatCardProps) {
  const getGlowStyle = () => {
    switch (glowColor) {
      case 'emerald':
        return 'rgba(16, 185, 129, 0.15)';
      case 'amber':
        return 'rgba(245, 158, 11, 0.15)';
      case 'crimson':
        return 'rgba(239, 68, 68, 0.15)';
      default:
        return 'rgba(99, 102, 241, 0.15)';
    }
  };

  return (
    <div className="glass-card glass-card-interactive" style={{
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, ${getGlowStyle()} 100%)`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8' }}>
          {title}
        </span>
        {icon && (
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {icon}
          </div>
        )}
      </div>

      <div style={{
        fontSize: '2rem',
        fontWeight: 800,
        fontFamily: 'var(--font-heading)',
        color: '#f8fafc',
        marginBottom: '4px'
      }}>
        {value}
      </div>

      {(subtitle || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748b' }}>
          {trend && (
            <span style={{
              fontWeight: 700,
              color: trend.startsWith('+') ? '#10b981' : trend.startsWith('-') ? '#ef4444' : '#cbd5e1'
            }}>
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
