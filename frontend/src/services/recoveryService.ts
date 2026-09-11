import { RecoveryPlan } from '@/types';
import { mockFetch } from './api';

export const MOCK_RECOVERY_PLANS: Record<string, RecoveryPlan> = {
  'course-os-a': {
    courseId: 'course-os-a',
    courseCode: 'CS303',
    courseName: 'Operating Systems',
    facultyName: 'Dr. Vikramaditya Rao',
    section: 'CSE-A',
    currentCoverage: 62,
    expectedCoverage: 80,
    gap: 18,
    weeksRemaining: 4,
    predictedDelayWeeks: 2,
    additionalClassesRequired: 3,
    priorityTopics: [
      'Deadlocks & Banker\'s Avoidance Algorithm',
      'Virtual Memory & Page Replacement Strategies (LRU)',
      'File System Implementation & Inodes'
    ],
    recommendedPace: '3 topics per week'
  },
  'course-ai-c': {
    courseId: 'course-ai-c',
    courseCode: 'CS304',
    courseName: 'Artificial Intelligence & Machine Learning',
    facultyName: 'Prof. Suresh Verma',
    section: 'CSE-C',
    currentCoverage: 48,
    expectedCoverage: 80,
    gap: 32,
    weeksRemaining: 4,
    predictedDelayWeeks: 4,
    additionalClassesRequired: 6,
    priorityTopics: [
      'First Order Logic & Resolution Principles',
      'Supervised Learning: Decision Trees & SVMs',
      'Neural Networks & Backpropagation Algorithm'
    ],
    recommendedPace: '4 topics per week'
  }
};

export async function getRecoveryPlan(courseId: string): Promise<RecoveryPlan> {
  const plan = MOCK_RECOVERY_PLANS[courseId] || MOCK_RECOVERY_PLANS['course-os-a'];
  return mockFetch(plan);
}

export function calculateWhatIf(additionalClasses: number, currentCoverage = 62, targetDate = new Date(2027, 0, 15)) {
  // Each extra class adds 5% coverage
  const bonusCoverage = additionalClasses * 5;
  const newCoverage = Math.min(100, currentCoverage + bonusCoverage);

  // Each class pulls forward completion by ~3.5 days
  const daysSaved = Math.round(additionalClasses * 3.5);
  const newCompletionDate = new Date(targetDate);
  newCompletionDate.setDate(newCompletionDate.getDate() - daysSaved);

  const formattedDate = newCompletionDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const isBackOnTrack = newCoverage >= 80;

  return {
    additionalClasses,
    newCoverage,
    newCompletionDate: formattedDate,
    isBackOnTrack,
    statusText: isBackOnTrack ? '✓ Back on track' : '⚠ Partial Recovery (More classes recommended)'
  };
}
