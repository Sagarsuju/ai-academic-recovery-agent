'use client';

import React from 'react';
import { RiskLevel } from '@/types';

export type MarkerStatus = 'ON_PACE' | 'ON_TRACK' | 'MONITOR' | 'MINOR_SLIPPAGE' | 'AT_RISK' | 'SIGNIFICANT_SLIPPAGE' | 'CRITICAL' | 'COMPLETED' | 'PENDING' | string;

interface StatusMarkerProps {
  status: MarkerStatus;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function StatusMarker({ status, label, size = 'md', className = '' }: StatusMarkerProps) {
  const norm = (status || '').toUpperCase();

  let category: 'ON_PACE' | 'MONITOR' | 'AT_RISK' | 'CRITICAL' | 'COMPLETED' | 'PENDING' = 'ON_PACE';
  let defaultText = 'On Track';
  let bg = '#ECFDF5';
  let text = '#059669';
  let border = '#A7F3D0';

  if (norm === 'CRITICAL') {
    category = 'CRITICAL';
    defaultText = 'Critical';
    bg = '#FEF2F2';
    text = '#DC2626';
    border = '#FECACA';
  } else if (norm === 'AT_RISK' || norm === 'SIGNIFICANT_SLIPPAGE') {
    category = 'AT_RISK';
    defaultText = 'At Risk';
    bg = '#FFF7ED';
    text = '#EA580C';
    border = '#FED7AA';
  } else if (norm === 'MONITOR' || norm === 'MINOR_SLIPPAGE') {
    category = 'MONITOR';
    defaultText = 'Attention';
    bg = '#FFFBEB';
    text = '#D97706';
    border = '#FDE68A';
  } else if (norm === 'COMPLETED') {
    category = 'COMPLETED';
    defaultText = 'Completed';
    bg = '#EEF2FF';
    text = '#4F46E5';
    border = '#C7D2FE';
  } else if (norm === 'PENDING') {
    category = 'PENDING';
    defaultText = 'Pending';
    bg = '#F1F5F9';
    text = '#64748B';
    border = '#E2E8F0';
  } else {
    category = 'ON_PACE';
    defaultText = 'On Track';
    bg = '#ECFDF5';
    text = '#059669';
    border = '#A7F3D0';
  }

  const displayText = label || defaultText;

  // Shapes designed for dual visual cue + greyscale accessibility
  const renderShape = () => {
    switch (category) {
      case 'ON_PACE':
        return (
          <svg width="9" height="9" viewBox="0 0 10 10" className="flex-shrink-0">
            <circle cx="5" cy="5" r="4.5" fill="#10B981" />
          </svg>
        );
      case 'MONITOR':
        return (
          <svg width="10" height="10" viewBox="0 0 12 12" className="flex-shrink-0">
            <polygon points="6,1 11,6 6,11 1,6" fill="#F59E0B" />
          </svg>
        );
      case 'AT_RISK':
        return (
          <svg width="10" height="10" viewBox="0 0 12 12" className="flex-shrink-0">
            <polygon points="6,1 11,10 1,10" fill="#F97316" />
          </svg>
        );
      case 'CRITICAL':
        return (
          <svg width="10" height="10" viewBox="0 0 12 12" className="flex-shrink-0">
            <polygon points="6,1 11.5,10.5 0.5,10.5" fill="#EF4444" />
            <circle cx="6" cy="8.8" r="0.8" fill="#FFFFFF" />
            <line x1="6" y1="4.2" x2="6" y2="7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );
      case 'COMPLETED':
        return (
          <svg width="10" height="10" viewBox="0 0 10 10" className="flex-shrink-0">
            <circle cx="5" cy="5" r="4.5" fill="#6366F1" />
          </svg>
        );
      case 'PENDING':
        return (
          <svg width="9" height="9" viewBox="0 0 10 10" className="flex-shrink-0">
            <circle cx="5" cy="5" r="4" fill="#94A3B8" />
          </svg>
        );
    }
  };

  const pad = size === 'sm' ? 'py-0.5 px-2 text-[11px]' : 'py-1 px-2.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${pad} ${className}`}
      style={{
        backgroundColor: bg,
        color: text,
        border: `1px solid ${border}`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}
    >
      {renderShape()}
      <span className="font-semibold tracking-wide">{displayText}</span>
    </span>
  );
}
