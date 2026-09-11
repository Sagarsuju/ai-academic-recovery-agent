import { mockFetch } from './api';

export interface ProgressTrendPoint {
  week: string;
  expectedPercentage: number;
  actualPercentage: number;
}

export const MOCK_PROGRESS_TRENDS: ProgressTrendPoint[] = [
  { week: 'Week 1', expectedPercentage: 10, actualPercentage: 10 },
  { week: 'Week 2', expectedPercentage: 20, actualPercentage: 19 },
  { week: 'Week 3', expectedPercentage: 30, actualPercentage: 28 },
  { week: 'Week 4', expectedPercentage: 40, actualPercentage: 36 },
  { week: 'Week 5', expectedPercentage: 50, actualPercentage: 45 },
  { week: 'Week 6', expectedPercentage: 60, actualPercentage: 54 },
  { week: 'Week 7', expectedPercentage: 70, actualPercentage: 62 },
  { week: 'Week 8', expectedPercentage: 80, actualPercentage: 70 },
  { week: 'Week 9 (Current)', expectedPercentage: 90, actualPercentage: 76 }
];

export async function getDepartmentProgressTrends(): Promise<ProgressTrendPoint[]> {
  return mockFetch(MOCK_PROGRESS_TRENDS);
}
