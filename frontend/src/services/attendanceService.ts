import { ClassScheduleItem, AttendanceRecord } from '@/types';
import { mockFetch } from './api';

export const MOCK_TODAY_CLASSES: ClassScheduleItem[] = [
  {
    id: 'cls-1',
    courseId: 'course-dbms-a',
    courseCode: 'CS301',
    courseName: 'Database Management Systems',
    section: 'CSE-A',
    time: '10:00 AM - 11:00 AM',
    room: 'AB1-302',
    status: 'COMPLETED',
    plannedTopic: 'SQL Joins (Inner, Outer, Cross)',
    enrolledStudents: 55
  },
  {
    id: 'cls-2',
    courseId: 'course-os-a',
    courseCode: 'CS303',
    courseName: 'Operating Systems',
    section: 'CSE-A',
    time: '12:00 PM - 1:00 PM',
    room: 'AB2-104',
    status: 'UPCOMING',
    plannedTopic: 'Bankers Algorithm & Deadlock Detection',
    enrolledStudents: 58
  },
  {
    id: 'cls-3',
    courseId: 'course-java-b',
    courseCode: 'CS302',
    courseName: 'Java & Object Oriented Programming',
    section: 'CSE-B',
    time: '02:30 PM - 03:30 PM',
    room: 'AB1-205',
    status: 'UPCOMING',
    plannedTopic: 'Custom Exceptions & Throwable Class Hierarchy',
    enrolledStudents: 52
  }
];

export async function getTodayClasses(): Promise<ClassScheduleItem[]> {
  return mockFetch(MOCK_TODAY_CLASSES);
}

export async function submitAttendanceAndUpdate(record: AttendanceRecord): Promise<{ success: boolean; updatedPercentage: number; previousPercentage: number }> {
  // Simulate syllabus progress increment
  return mockFetch({
    success: true,
    previousPercentage: 68,
    updatedPercentage: 70
  });
}
