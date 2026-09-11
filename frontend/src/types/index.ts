export type Role = 'HOD' | 'FACULTY' | 'STUDENT' | 'ADMIN';

export type RiskLevel = 'ON_TRACK' | 'MINOR_SLIPPAGE' | 'SIGNIFICANT_SLIPPAGE' | 'CRITICAL';

export interface UnitProgress {
  unitNumber: number;
  unitTitle: string;
  percentage: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'BEHIND' | 'NOT_STARTED';
}

export interface PendingTopic {
  id: string;
  topicTitle: string;
  unitNumber: number;
  estimatedHours: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  section: string;
  facultyId: string;
  facultyName: string;
  totalHours: number;
  completedHours: number;
  expectedPercentage: number;
  actualPercentage: number;
  gapPercentage: number;
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100
  riskReasons: string[];
  predictedCompletionDate: string;
  plannedCompletionDate: string;
  delayDays: number;
  units: UnitProgress[];
  pendingTopics: PendingTopic[];
}

export interface ClassScheduleItem {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  section: string;
  time: string;
  room: string;
  status: 'COMPLETED' | 'UPCOMING' | 'IN_PROGRESS';
  plannedTopic: string;
  enrolledStudents: number;
}

export interface AttendanceRecord {
  courseId: string;
  date: string;
  presentCount: number;
  absentCount: number;
  totalCount: number;
  topicStatus: 'COMPLETED' | 'PARTIALLY_COMPLETED' | 'NOT_COMPLETED';
  actualTopicCovered?: string;
}

export interface RecoveryPlan {
  courseId: string;
  courseCode: string;
  courseName: string;
  facultyName: string;
  section: string;
  currentCoverage: number;
  expectedCoverage: number;
  gap: number;
  weeksRemaining: number;
  predictedDelayWeeks: number;
  additionalClassesRequired: number;
  priorityTopics: string[];
  recommendedPace: string;
}

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  facultyAvailable: boolean;
  studentsAvailable: boolean;
  roomAvailable: boolean;
  noConflict: boolean;
  selected?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  dataWidget?: any;
}

export interface NotificationItem {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface DepartmentSummary {
  department: string;
  totalCourses: number;
  onTrack: number;
  minorSlippage: number;
  significantSlippage: number;
  critical: number;
  overallSyllabusCoverage: number;
}

export interface StudentCourseProgress {
  id: string;
  code: string;
  name: string;
  section: string;
  facultyName: string;
  attendancePercentage: number;
  syllabusCoverage: number;
  riskLevel: RiskLevel;
  nextClassSlot?: string;
  pendingTopicsCount: number;
  isRecoveryEnrolled: boolean;
}

export interface WeeklyTimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseName: string;
  room: string;
  facultyName: string;
  isRecovery: boolean;
  topicTitle?: string;
}

export interface AdminUserAccount {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  designationOrSection: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin: string;
}

export interface SystemIntegrationStatus {
  attendance_system: {
    integration_name: string;
    last_sync_time?: string;
    last_sync_status: string;
    records_synced: number;
    details?: string;
  };
  lesson_plan_system: {
    integration_name: string;
    last_sync_time?: string;
    last_sync_status: string;
    records_synced: number;
    details?: string;
  };
  scheduler_running: boolean;
}

export interface RagDocumentItem {
  source_filename: string;
  doc_type: string;
  upload_date: string;
  chunk_count: number;
}
