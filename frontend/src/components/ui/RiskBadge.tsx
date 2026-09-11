'use client';

import React from 'react';
import { RiskLevel } from '@/types';
import StatusMarker from './StatusMarker';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  return <StatusMarker status={level} />;
}
