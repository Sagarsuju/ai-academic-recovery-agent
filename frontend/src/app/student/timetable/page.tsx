'use client';

import React, { useState } from 'react';
import AppShell from '@/components/ui/AppShell';
import { WeeklyTimetableSlot } from '@/types';
import StatusMarker from '@/components/ui/StatusMarker';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Zap,
  BookOpen,
  Filter,
  CheckCircle2,
  Printer,
  Sparkles
} from 'lucide-react';

const WEEKLY_SCHEDULE: WeeklyTimetableSlot[] = [
  // Monday
  {
    id: 's-mon-1',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS301',
    courseName: 'Database Management Systems',
    room: 'AB1-302',
    facultyName: 'Dr. Ramesh Kumar',
    isRecovery: false,
    topicTitle: 'Transaction ACID Properties'
  },
  {
    id: 's-mon-2',
    day: 'Monday',
    startTime: '10:15 AM',
    endTime: '11:15 AM',
    courseCode: 'CS302',
    courseName: 'Java & OOP',
    room: 'AB1-Lab3',
    facultyName: 'Prof. Ananya Sharma',
    isRecovery: false,
    topicTitle: 'Collections Framework: ArrayList & LinkedList'
  },
  {
    id: 's-mon-3',
    day: 'Monday',
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    courseCode: 'CS306',
    courseName: 'Software Engineering & Agile',
    room: 'AB1-304',
    facultyName: 'Prof. Ananya Sharma',
    isRecovery: false,
    topicTitle: 'Sprint Planning & User Story Estimation'
  },

  // Tuesday
  {
    id: 's-tue-1',
    day: 'Tuesday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS303',
    courseName: 'Operating Systems',
    room: 'AB2-104',
    facultyName: 'Dr. Vikramaditya Rao',
    isRecovery: false,
    topicTitle: 'Process Synchronization & Semaphores'
  },
  {
    id: 's-tue-2',
    day: 'Tuesday',
    startTime: '11:15 AM',
    endTime: '12:15 PM',
    courseCode: 'CS305',
    courseName: 'Computer Networks',
    room: 'AB2-205',
    facultyName: 'Dr. Ramesh Kumar',
    isRecovery: false,
    topicTitle: 'TCP Sliding Window Protocol'
  },
  {
    id: 's-tue-3',
    day: 'Tuesday',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    courseCode: 'CS301',
    courseName: 'DBMS Laboratory',
    room: 'AB1-Lab2',
    facultyName: 'Dr. Ramesh Kumar',
    isRecovery: false,
    topicTitle: 'SQL Trigger & PL/SQL Stored Procedures'
  },

  // Wednesday
  {
    id: 's-wed-1',
    day: 'Wednesday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS304',
    courseName: 'Artificial Intelligence',
    room: 'AB1-Seminar Hall',
    facultyName: 'Prof. Suresh Verma',
    isRecovery: false,
    topicTitle: 'Uninformed & Heuristic Search (A* Search)'
  },
  {
    id: 's-wed-2',
    day: 'Wednesday',
    startTime: '10:15 AM',
    endTime: '11:15 AM',
    courseCode: 'CS301',
    courseName: 'Database Management Systems',
    room: 'AB1-302',
    facultyName: 'Dr. Ramesh Kumar',
    isRecovery: false,
    topicTitle: 'Two-Phase Locking & Serializability'
  },
  {
    id: 's-wed-3',
    day: 'Wednesday',
    startTime: '01:30 PM',
    endTime: '02:30 PM',
    courseCode: 'CS302',
    courseName: 'Java & OOP',
    room: 'AB1-302',
    facultyName: 'Prof. Ananya Sharma',
    isRecovery: false,
    topicTitle: 'Exception Handling & Custom Exceptions'
  },

  // Thursday
  {
    id: 's-thu-1',
    day: 'Thursday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS305',
    courseName: 'Computer Networks',
    room: 'AB2-205',
    facultyName: 'Dr. Ramesh Kumar',
    isRecovery: false,
    topicTitle: 'Routing Information Protocol (RIP & OSPF)'
  },
  {
    id: 's-thu-2',
    day: 'Thursday',
    startTime: '10:15 AM',
    endTime: '11:15 AM',
    courseCode: 'CS303',
    courseName: 'Operating Systems',
    room: 'AB2-104',
    facultyName: 'Dr. Vikramaditya Rao',
    isRecovery: false,
    topicTitle: 'Deadlock Detection & Recovery Strategies'
  },
  {
    id: 's-thu-3',
    day: 'Thursday',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    courseCode: 'CS302',
    courseName: 'Java Programming Lab',
    room: 'AB1-Lab3',
    facultyName: 'Prof. Ananya Sharma',
    isRecovery: false,
    topicTitle: 'Multithreading & Synchronization Lab Exercise'
  },

  // Friday (Includes Recovery Class)
  {
    id: 's-fri-1',
    day: 'Friday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS304',
    courseName: 'Artificial Intelligence',
    room: 'AB1-Seminar Hall',
    facultyName: 'Prof. Suresh Verma',
    isRecovery: false,
    topicTitle: 'Propositional Logic & Inference Rules'
  },
  {
    id: 's-fri-2',
    day: 'Friday',
    startTime: '10:15 AM',
    endTime: '11:15 AM',
    courseCode: 'CS306',
    courseName: 'Software Engineering',
    room: 'AB1-304',
    facultyName: 'Prof. Ananya Sharma',
    isRecovery: false,
    topicTitle: 'Design Patterns: Factory & Singleton'
  },
  {
    id: 's-fri-rec-1',
    day: 'Friday',
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    courseCode: 'CS303',
    courseName: 'Operating Systems (Remedial Recovery)',
    room: 'AB2-104',
    facultyName: 'Dr. Vikramaditya Rao',
    isRecovery: true,
    topicTitle: 'Banker\'s Algorithm & Resource Allocation Graphs (Remedial Session)'
  },

  // Saturday (Includes Recovery Class)
  {
    id: 's-sat-rec-1',
    day: 'Saturday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    courseCode: 'CS304',
    courseName: 'Artificial Intelligence (Remedial Recovery)',
    room: 'AB1-Seminar Hall',
    facultyName: 'Prof. Suresh Verma',
    isRecovery: true,
    topicTitle: 'Supervised Learning: Decision Trees & Information Gain (Remedial Session)'
  },
  {
    id: 's-sat-rec-2',
    day: 'Saturday',
    startTime: '11:15 AM',
    endTime: '12:15 PM',
    courseCode: 'CS301',
    courseName: 'DBMS (Tutorial & Q&A)',
    room: 'AB1-Lab2',
    facultyName: 'Dr. Ramesh Kumar',
    isRecovery: true,
    topicTitle: 'NoSQL & MongoDB Query Review Workshop'
  }
];

const DAYS = ['ALL', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = useState<string>('ALL');
  const [onlyRecovery, setOnlyRecovery] = useState<boolean>(false);

  const filteredSlots = WEEKLY_SCHEDULE.filter((slot) => {
    const dayMatches = selectedDay === 'ALL' || slot.day === selectedDay;
    const recoveryMatches = !onlyRecovery || slot.isRecovery;
    return dayMatches && recoveryMatches;
  });

  const recoveryCount = WEEKLY_SCHEDULE.filter((s) => s.isRecovery).length;

  return (
    <AppShell>
      {/* Screen Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '2px 8px',
              background: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--line)',
              borderRadius: '4px'
            }}>
              <Calendar size={12} color="var(--brass)" /> Section CSE-A Master Schedule
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--line)' }}>•</span>
            <StatusMarker status="CRITICAL" label={`${recoveryCount} Remedial Sessions Active`} />
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--ink)', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            Weekly Academic & Remedial Timetable
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem' }}>
            Full schedule of regular theory, laboratory, and AI-scheduled remedial recovery classes.
          </p>
        </div>

        <button onClick={() => window.print()} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
          <Printer size={15} /> Print Timetable
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card" style={{
        padding: '14px 20px',
        marginBottom: '20px',
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Day Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: selectedDay === d ? 700 : 500,
                border: '1px solid var(--line)',
                borderLeft: selectedDay === d ? '3px solid var(--brass)' : '1px solid var(--line)',
                background: selectedDay === d ? 'var(--ink)' : 'var(--paper)',
                color: selectedDay === d ? '#FAF8F3' : 'var(--ink-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Recovery Only Toggle */}
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: onlyRecovery ? 'var(--critical)' : 'var(--ink-muted)'
        }}>
          <input
            type="checkbox"
            checked={onlyRecovery}
            onChange={(e) => setOnlyRecovery(e.target.checked)}
            style={{ accentColor: 'var(--critical)', width: '15px', height: '15px', cursor: 'pointer' }}
          />
          Show Remedial Recovery Classes Only
        </label>
      </div>

      {/* Timetable Card List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSlots.length === 0 ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-muted)', background: '#FFFFFF', border: '1px solid var(--line)' }}>
            <Calendar size={32} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
            <p>No classes scheduled for the selected filter.</p>
          </div>
        ) : (
          filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className="glass-card"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: '1px solid var(--line)',
                borderLeft: slot.isRecovery ? '4px solid var(--critical)' : '4px solid var(--line-strong)',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              {/* Left Column: Timing & Day */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', minWidth: '220px' }}>
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: slot.isRecovery ? 'var(--critical)' : 'var(--ink-muted)' }}>
                    {slot.day}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                    {slot.startTime}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                    to {slot.endTime}
                  </div>
                </div>

                {/* Course Details */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--ink-muted)' }}>
                      {slot.courseCode}
                    </span>
                    {slot.isRecovery && (
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '3px',
                        background: 'var(--paper)',
                        color: 'var(--critical)',
                        border: '1px solid var(--line)'
                      }}>
                        Recovery Session
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '2px' }}>
                    {slot.courseName}
                  </h3>
                  {slot.topicTitle && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                      Planned Topic: <strong style={{ color: 'var(--ink)' }}>{slot.topicTitle}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Faculty & Room Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--ink)' }}>
                  <User size={14} color="var(--ink-muted)" />
                  <span>{slot.facultyName}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--ink)' }}>
                  <MapPin size={14} color="var(--brass)" />
                  <span style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontFamily: 'monospace'
                  }}>
                    {slot.room}
                  </span>
                </div>

                <StatusMarker
                  status={slot.isRecovery ? 'CRITICAL' : 'ON_PACE'}
                  label={slot.isRecovery ? 'Remedial' : 'Confirmed'}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
