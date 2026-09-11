'use client';

import React from 'react';
import AppShell from '@/components/ui/AppShell';
import NotificationsView from '@/components/ui/NotificationsView';
import { NotificationItem } from '@/types';

const STUDENT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'sn-1',
    type: 'WARNING',
    title: 'Attendance Alert: Operating Systems (71%)',
    message: 'Your current attendance in CS303 (Operating Systems) is 71%, which is below the mandatory 75% SEE examination threshold. Attending weekend recovery classes is required to qualify for condonation.',
    timestamp: '25 minutes ago',
    read: false,
    link: '/student/dashboard'
  },
  {
    id: 'sn-2',
    type: 'CRITICAL',
    title: 'Mandatory Extra Class: Operating Systems',
    message: 'Recovery lecture scheduled for Friday 02:00 PM - 03:00 PM in Room AB2-104 with Dr. Vikramaditya Rao. Attendance is strictly monitored.',
    timestamp: '1 hour ago',
    read: false,
    link: '/student/timetable'
  },
  {
    id: 'sn-3',
    type: 'INFO',
    title: 'Upcoming Remedial Class: AI & ML (CS304)',
    message: 'Saturday 10:00 AM - 11:00 AM remedial tutorial scheduled in AB1-Seminar Hall on Supervised Learning & Backpropagation.',
    timestamp: '4 hours ago',
    read: false,
    link: '/student/timetable'
  },
  {
    id: 'sn-4',
    type: 'SUCCESS',
    title: 'DBMS Unit 4 Completion Milestone',
    message: 'Prof. Ramesh Kumar completed Transaction Processing & Two-Phase Locking. DBMS syllabus coverage is now 92% (On Track).',
    timestamp: 'Yesterday at 5:00 PM',
    read: true,
    link: '/student/dashboard'
  },
  {
    id: 'sn-5',
    type: 'INFO',
    title: 'Condonation Application Window Open',
    message: 'Academic Council notification: Condonation applications for attendance between 65% and 74% are open until Dec 01 with HOD approval.',
    timestamp: '2 days ago',
    read: true,
    link: '/student/dashboard'
  }
];

export default function StudentNotificationsPage() {
  return (
    <AppShell>
      <NotificationsView
        title="Student Notifications & Recovery Alerts"
        subtitle="Live alerts on attendance thresholds, remedial classes, and syllabus milestones."
        initialNotifications={STUDENT_NOTIFICATIONS}
      />
    </AppShell>
  );
}
