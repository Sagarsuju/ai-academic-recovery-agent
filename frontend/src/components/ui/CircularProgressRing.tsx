'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  status?: 'ON_TRACK' | 'MINOR_SLIPPAGE' | 'SIGNIFICANT_SLIPPAGE' | 'CRITICAL' | 'COMPLETED' | string;
  showText?: boolean;
}

export default function CircularProgressRing({
  percentage,
  size = 76,
  strokeWidth = 6.5,
  status = 'ON_TRACK',
  showText = true
}: CircularProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  const gradientId = `ring-grad-${status}-${Math.round(clamped)}-${size}`;

  const getGradientColors = () => {
    switch (status) {
      case 'ON_TRACK':
      case 'ON_PACE':
        return { start: '#34D399', end: '#10B981' };
      case 'MINOR_SLIPPAGE':
      case 'MONITOR':
        return { start: '#FCD34D', end: '#FB923C' };
      case 'SIGNIFICANT_SLIPPAGE':
      case 'AT_RISK':
        return { start: '#FB923C', end: '#F87171' };
      case 'CRITICAL':
        return { start: '#F87171', end: '#EF4444' };
      case 'COMPLETED':
        return { start: '#6C63FF', end: '#4FACFE' };
      default:
        return clamped >= 75
          ? { start: '#34D399', end: '#10B981' }
          : clamped >= 60
          ? { start: '#FCD34D', end: '#FB923C' }
          : { start: '#F87171', end: '#EF4444' };
    }
  };

  const { start, end } = getGradientColors();

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        </defs>

        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EEF2F6"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Animated Fill Circle with Soft Gradient */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className="text-xs font-bold text-[#1E2333]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {clamped}%
          </span>
        </div>
      )}
    </div>
  );
}
