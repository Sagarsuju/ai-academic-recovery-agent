import React from 'react';
import { RiskLevel } from '@/types';
import { CheckCircle2, AlertCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
}

export default function RiskBadge({ level, showIcon = true }: RiskBadgeProps) {
  switch (level) {
    case 'ON_TRACK':
      return (
        <span className="badge badge-on-track">
          {showIcon && <CheckCircle2 size={12} />} On Track
        </span>
      );
    case 'MINOR_SLIPPAGE':
      return (
        <span className="badge badge-minor">
          {showIcon && <AlertCircle size={12} />} Minor Slippage
        </span>
      );
    case 'SIGNIFICANT_SLIPPAGE':
      return (
        <span className="badge badge-significant">
          {showIcon && <AlertTriangle size={12} />} Significant Slippage
        </span>
      );
    case 'CRITICAL':
      return (
        <span className="badge badge-critical">
          {showIcon && <ShieldAlert size={12} />} Critical Risk
        </span>
      );
    default:
      return null;
  }
}
