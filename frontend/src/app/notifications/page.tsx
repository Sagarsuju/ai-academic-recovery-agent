'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/ui/AppShell';
import { NotificationItem } from '@/types';
import { Bell, ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2, ArrowRight, Check } from 'lucide-react';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    type: 'CRITICAL',
    title: 'Critical Progress Deficit Alert',
    message: 'Artificial Intelligence (CS304 - CSE-C) is 32% behind expected progress. 4 lectures missed.',
    timestamp: '10 minutes ago',
    read: false,
    link: '/hod/courses/course-ai-c'
  },
  {
    id: 'n-2',
    type: 'WARNING',
    title: 'Syllabus Lag Warning',
    message: 'Operating Systems (CS303 - CSE-A) is 18% behind expected schedule.',
    timestamp: '1 hour ago',
    read: false,
    link: '/hod/recovery?courseId=course-os-a'
  },
  {
    id: 'n-3',
    type: 'INFO',
    title: 'Pending Topics Reminder',
    message: 'DBMS (CS301) has 2 pending topics remaining in Unit 4.',
    timestamp: '3 hours ago',
    read: true,
    link: '/hod/courses/course-dbms-a'
  },
  {
    id: 'n-4',
    type: 'SUCCESS',
    title: 'Recovery Plan Approved',
    message: 'Recovery schedule for Operating Systems has been approved and added to Tuesday/Thursday timetable.',
    timestamp: 'Yesterday at 4:30 PM',
    read: true,
    link: '/hod/timetable'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>('ALL');

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filtered = filter === 'ALL' ? notifications : notifications.filter((n) => n.type === filter);

  return (
    <AppShell>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            System Notifications & Alerts
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Real-time notifications dispatched by the AI predictive monitoring engine.
          </p>
        </div>

        <button onClick={markAllAsRead} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
          <Check size={16} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        {['ALL', 'CRITICAL', 'WARNING', 'INFO', 'SUCCESS'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: filter === f ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              background: filter === f ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              color: filter === f ? '#fff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((item) => {
          const getIcon = () => {
            switch (item.type) {
              case 'CRITICAL':
                return <ShieldAlert size={20} color="#ef4444" />;
              case 'WARNING':
                return <AlertTriangle size={20} color="#f59e0b" />;
              case 'INFO':
                return <AlertCircle size={20} color="#6366f1" />;
              case 'SUCCESS':
                return <CheckCircle2 size={20} color="#10b981" />;
            }
          };

          return (
            <div key={item.id} className="glass-card" style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: item.read ? 'rgba(17, 24, 39, 0.6)' : 'rgba(31, 41, 55, 0.85)',
              borderLeft: item.type === 'CRITICAL' ? '4px solid #ef4444' : item.type === 'WARNING' ? '4px solid #f59e0b' : item.type === 'SUCCESS' ? '4px solid #10b981' : '4px solid #6366f1'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)'
                }}>
                  {getIcon()}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc' }}>
                      {item.title}
                    </span>
                    {!item.read && (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '4px' }}>
                    {item.message}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {item.timestamp}
                  </div>
                </div>
              </div>

              {item.link && (
                <Link href={item.link} style={{ textDecoration: 'none' }}>
                  <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.78rem' }}>
                    View Action <ArrowRight size={14} />
                  </button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
