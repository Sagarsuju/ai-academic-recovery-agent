'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NotificationItem } from '@/types';
import StatusMarker from '@/components/ui/StatusMarker';
import { Bell, ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2, ArrowRight, Check } from 'lucide-react';

interface NotificationsViewProps {
  title?: string;
  subtitle?: string;
  initialNotifications?: NotificationItem[];
}

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
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
    message: 'Operating Systems (CS303 - CSE-A) is 18% behind expected schedule. 3 recovery sessions needed.',
    timestamp: '1 hour ago',
    read: false,
    link: '/hod/recovery?courseId=course-os-a'
  },
  {
    id: 'n-3',
    type: 'INFO',
    title: 'Mandatory Recovery Class Scheduled',
    message: 'Recovery session for Operating Systems scheduled for Friday 02:00 PM - 03:00 PM in Room AB2-104.',
    timestamp: '2 hours ago',
    read: false,
    link: '/student/timetable'
  },
  {
    id: 'n-4',
    type: 'WARNING',
    title: 'Attendance Alert: Operating Systems (71%)',
    message: 'Your current attendance in CS303 is 71% (below the 75% SEE examination threshold). Remedial tutorial attendance required for condonation.',
    timestamp: '3 hours ago',
    read: false,
    link: '/student/dashboard'
  },
  {
    id: 'n-5',
    type: 'SUCCESS',
    title: 'Recovery Plan Approved',
    message: 'Recovery schedule for Operating Systems has been approved and added to Friday/Saturday timetable.',
    timestamp: 'Yesterday at 4:30 PM',
    read: true,
    link: '/student/timetable'
  }
];

export default function NotificationsView({
  title = 'System Notifications & Alerts',
  subtitle = 'Real-time notifications dispatched by the AI predictive monitoring engine.',
  initialNotifications = DEFAULT_NOTIFICATIONS
}: NotificationsViewProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<string>('ALL');

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filtered = filter === 'ALL' ? notifications : notifications.filter((n) => n.type === filter);

  const getMarkerStatus = (type: NotificationItem['type']): 'CRITICAL' | 'AT_RISK' | 'MONITOR' | 'ON_TRACK' => {
    switch (type) {
      case 'CRITICAL': return 'CRITICAL';
      case 'WARNING': return 'AT_RISK';
      case 'SUCCESS': return 'ON_TRACK';
      default: return 'MONITOR';
    }
  };

  const getTypeBorderColor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'CRITICAL': return '#F87171';
      case 'WARNING': return '#FBBF24';
      case 'SUCCESS': return '#34D399';
      default: return '#4FACFE';
    }
  };

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'CRITICAL': return <ShieldAlert size={18} color="#DC2626" />;
      case 'WARNING': return <AlertTriangle size={18} color="#D97706" />;
      case 'SUCCESS': return <CheckCircle2 size={18} color="#059669" />;
      default: return <AlertCircle size={18} color="#0284C7" />;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.85rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '4px',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {subtitle}
          </p>
        </div>

        <button onClick={markAllAsRead} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
          <Check size={16} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['ALL', 'CRITICAL', 'WARNING', 'INFO', 'SUCCESS'].map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                border: isActive ? '1px solid #C7D2FE' : '1px solid var(--border-subtle)',
                background: isActive ? '#EEF2FF' : '#FFFFFF',
                color: isActive ? '#6C63FF' : '#64748B',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: isActive ? '0 2px 6px rgba(108, 99, 255, 0.12)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '14px' }}>
            <Bell size={36} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} color="#6C63FF" />
            <p>No notifications found matching filter "{filter}".</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-interactive"
              style={{
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: item.read ? '#FFFFFF' : '#FAFCFF',
                border: '1px solid var(--border-subtle)',
                borderLeft: `4px solid ${getTypeBorderColor(item.type)}`,
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(30, 35, 51, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  padding: '10px',
                  borderRadius: '10px',
                  background: item.type === 'CRITICAL' ? '#FEF2F2' : item.type === 'WARNING' ? '#FFFBEB' : item.type === 'SUCCESS' ? '#ECFDF5' : '#EAF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getTypeIcon(item.type)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                      {item.title}
                    </span>
                    {!item.read && (
                      <span style={{
                        padding: '2px 7px',
                        borderRadius: '999px',
                        background: '#EEF2FF',
                        color: '#6C63FF',
                        fontSize: '0.68rem',
                        fontWeight: 800
                      }}>
                        NEW
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
                    {item.message}
                  </p>

                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {item.timestamp}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusMarker status={getMarkerStatus(item.type)} label={item.type} />
                {item.link && (
                  <Link href={item.link} style={{ textDecoration: 'none' }}>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                      Review <ArrowRight size={13} />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
