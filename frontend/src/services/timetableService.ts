import { TimetableSlot } from '@/types';
import { mockFetch } from './api';

export const MOCK_RECOVERY_SLOTS: TimetableSlot[] = [
  {
    id: 'slot-1',
    day: 'Tuesday',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    room: 'AB1-Lab3',
    facultyAvailable: true,
    studentsAvailable: true,
    roomAvailable: true,
    noConflict: true,
    selected: true
  },
  {
    id: 'slot-2',
    day: 'Thursday',
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    room: 'AB2-104',
    facultyAvailable: true,
    studentsAvailable: true,
    roomAvailable: true,
    noConflict: true,
    selected: true
  },
  {
    id: 'slot-3',
    day: 'Saturday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    room: 'AB1-Seminar Hall',
    facultyAvailable: true,
    studentsAvailable: true,
    roomAvailable: true,
    noConflict: true,
    selected: true
  }
];

export async function getRecommendedRecoverySlots(courseId: string): Promise<TimetableSlot[]> {
  return mockFetch(MOCK_RECOVERY_SLOTS);
}

export async function approveRecoveryTimetable(selectedSlotIds: string[]): Promise<{ success: boolean; message: string }> {
  return mockFetch({
    success: true,
    message: 'Recovery Schedule Approved! Notifications sent to faculty & students.'
  });
}
