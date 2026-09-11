import { Course, DepartmentSummary } from '@/types';
import { fetchWithFallback, mockFetch } from './api';

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-dbms-a',
    code: 'CS301',
    name: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    section: 'CSE-A',
    facultyId: 'fac-101',
    facultyName: 'Dr. Ramesh Kumar',
    totalHours: 60,
    completedHours: 55,
    expectedPercentage: 90,
    actualPercentage: 92,
    gapPercentage: -2,
    riskLevel: 'ON_TRACK',
    riskScore: 12,
    riskReasons: ['Progress is on track with scheduled syllabus timeline', 'High student attendance average (94%)'],
    predictedCompletionDate: 'December 08, 2026',
    plannedCompletionDate: 'December 10, 2026',
    delayDays: -2,
    units: [
      { unitNumber: 1, unitTitle: 'Introduction & ER Modeling', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 2, unitTitle: 'Relational Model & SQL', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 3, unitTitle: 'Normalization & Dependencies', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 4, unitTitle: 'Transaction Processing & Concurrency', percentage: 80, status: 'IN_PROGRESS' },
      { unitNumber: 5, unitTitle: 'NoSQL & Distributed Databases', percentage: 0, status: 'NOT_STARTED' },
    ],
    pendingTopics: [
      { id: 't1', topicTitle: 'Two-Phase Locking Protocol', unitNumber: 4, estimatedHours: 2, priority: 'HIGH' },
      { id: 't2', topicTitle: 'MongoDB Document Data Model', unitNumber: 5, estimatedHours: 3, priority: 'MEDIUM' }
    ]
  },
  {
    id: 'course-java-b',
    code: 'CS302',
    name: 'Java & Object Oriented Programming',
    department: 'Computer Science & Engineering',
    section: 'CSE-B',
    facultyId: 'fac-102',
    facultyName: 'Prof. Ananya Sharma',
    totalHours: 60,
    completedHours: 46,
    expectedPercentage: 88,
    actualPercentage: 78,
    gapPercentage: 10,
    riskLevel: 'MINOR_SLIPPAGE',
    riskScore: 42,
    riskReasons: [
      '10% gap from expected syllabus timeline',
      'Complex Unit 3 topics required extra explanation hours',
      '2 topics pending for upcoming mid-term evaluation'
    ],
    predictedCompletionDate: 'December 14, 2026',
    plannedCompletionDate: 'December 10, 2026',
    delayDays: 4,
    units: [
      { unitNumber: 1, unitTitle: 'Java Fundamentals & OOP Concepts', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 2, unitTitle: 'Inheritance, Interfaces & Packages', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 3, unitTitle: 'Multithreading & Exception Handling', percentage: 70, status: 'IN_PROGRESS' },
      { unitNumber: 4, unitTitle: 'Java Collections Framework', percentage: 20, status: 'BEHIND' },
      { unitNumber: 5, unitTitle: 'JavaFX & GUI Application Dev', percentage: 0, status: 'NOT_STARTED' },
    ],
    pendingTopics: [
      { id: 't3', topicTitle: 'Thread Synchronization & Inter-thread Comm', unitNumber: 3, estimatedHours: 2, priority: 'HIGH' },
      { id: 't4', topicTitle: 'HashMap & Concurrent HashMap Internals', unitNumber: 4, estimatedHours: 3, priority: 'HIGH' }
    ]
  },
  {
    id: 'course-os-a',
    code: 'CS303',
    name: 'Operating Systems',
    department: 'Computer Science & Engineering',
    section: 'CSE-A',
    facultyId: 'fac-103',
    facultyName: 'Dr. Vikramaditya Rao',
    totalHours: 60,
    completedHours: 38,
    expectedPercentage: 82,
    actualPercentage: 64,
    gapPercentage: 18,
    riskLevel: 'SIGNIFICANT_SLIPPAGE',
    riskScore: 82,
    riskReasons: [
      '18% behind expected syllabus progress',
      'Low recent teaching pace due to departmental duties',
      '5 critical topics pending in Unit 3 & 4',
      'Only 4 weeks remaining before final examinations'
    ],
    predictedCompletionDate: 'December 22, 2026',
    plannedCompletionDate: 'December 10, 2026',
    delayDays: 12,
    units: [
      { unitNumber: 1, unitTitle: 'OS Structures & Process Management', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 2, unitTitle: 'CPU Scheduling Algorithms', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 3, unitTitle: 'Process Synchronization & Deadlocks', percentage: 50, status: 'BEHIND' },
      { unitNumber: 4, unitTitle: 'Memory Management & Paging', percentage: 20, status: 'BEHIND' },
      { unitNumber: 5, unitTitle: 'File System Implementation & Storage', percentage: 0, status: 'NOT_STARTED' },
    ],
    pendingTopics: [
      { id: 't5', topicTitle: 'Bankers Algorithm for Deadlock Avoidance', unitNumber: 3, estimatedHours: 2, priority: 'HIGH' },
      { id: 't6', topicTitle: 'Virtual Memory & Page Replacement (LRU, FIFO)', unitNumber: 4, estimatedHours: 4, priority: 'HIGH' },
      { id: 't7', topicTitle: 'File Allocation Methods & Inode Structure', unitNumber: 5, estimatedHours: 3, priority: 'MEDIUM' }
    ]
  },
  {
    id: 'course-ai-c',
    code: 'CS304',
    name: 'Artificial Intelligence & Machine Learning',
    department: 'Computer Science & Engineering',
    section: 'CSE-C',
    facultyId: 'fac-104',
    facultyName: 'Prof. Suresh Verma',
    totalHours: 60,
    completedHours: 29,
    expectedPercentage: 80,
    actualPercentage: 48,
    gapPercentage: 32,
    riskLevel: 'CRITICAL',
    riskScore: 94,
    riskReasons: [
      '32% critical progress deficit',
      '4 consecutive classes missed due to leave',
      'Unit 3 & Unit 4 completely uninitiated',
      'Urgent recovery scheduling mandated by HOD'
    ],
    predictedCompletionDate: 'January 05, 2027',
    plannedCompletionDate: 'December 10, 2026',
    delayDays: 26,
    units: [
      { unitNumber: 1, unitTitle: 'Problem Solving & State Space Search', percentage: 100, status: 'COMPLETED' },
      { unitNumber: 2, unitTitle: 'Knowledge Representation & Logic', percentage: 60, status: 'BEHIND' },
      { unitNumber: 3, unitTitle: 'Supervised Learning Algorithms', percentage: 0, status: 'NOT_STARTED' },
      { unitNumber: 4, unitTitle: 'Neural Networks & Deep Learning Intro', percentage: 0, status: 'NOT_STARTED' },
      { unitNumber: 5, unitTitle: 'Natural Language Processing & Ethics', percentage: 0, status: 'NOT_STARTED' },
    ],
    pendingTopics: [
      { id: 't8', topicTitle: 'First Order Logic & Resolution Inference', unitNumber: 2, estimatedHours: 3, priority: 'HIGH' },
      { id: 't9', topicTitle: 'Decision Trees & Random Forests', unitNumber: 3, estimatedHours: 4, priority: 'HIGH' },
      { id: 't10', topicTitle: 'Backpropagation Neural Networks', unitNumber: 4, estimatedHours: 5, priority: 'HIGH' }
    ]
  }
];

export const MOCK_DEPARTMENT_SUMMARY: DepartmentSummary = {
  department: 'Computer Science & Engineering',
  totalCourses: 24,
  onTrack: 16,
  minorSlippage: 4,
  significantSlippage: 3,
  critical: 1,
  overallSyllabusCoverage: 76
};

export async function getCourses(): Promise<Course[]> {
  return fetchWithFallback<Course[]>('/courses/', undefined, MOCK_COURSES);
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const fallback = MOCK_COURSES.find((c) => c.id === id || c.code.toLowerCase() === id.toLowerCase());
  return fetchWithFallback<Course>(`/courses/${id}`, undefined, fallback);
}

export async function getDepartmentSummary(): Promise<DepartmentSummary> {
  return fetchWithFallback<DepartmentSummary>('/courses/summary', undefined, MOCK_DEPARTMENT_SUMMARY);
}
