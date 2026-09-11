'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  Calendar,
  Bot,
  Sliders,
  FileText,
  Bell,
  CheckSquare,
  Sparkles,
  Users,
  Server,
  LucideIcon
} from 'lucide-react';
import { Role } from '@/types';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  isNew?: boolean;
  isAi?: boolean;
}

interface SidebarProps {
  currentRole: Role;
}

export default function Sidebar({ currentRole }: SidebarProps) {
  const pathname = usePathname();

  const hodNavItems: NavItem[] = [
    { label: 'HOD Dashboard', href: '/hod', icon: LayoutDashboard },
    { label: 'Course Progress', href: '/hod/courses', icon: BookOpen },
    { label: 'Recovery Plans', href: '/hod/recovery', icon: Zap },
    { label: 'Timetable Recovery', href: '/hod/timetable', icon: Calendar },
    { label: 'What-If Simulator', href: '/hod/recovery/what-if', icon: Sliders, isNew: true },
    { label: 'Academic AI Assistant', href: '/hod/ai-assistant', icon: Bot, isAi: true },
    { label: 'Academic Reports', href: '/hod/reports', icon: FileText },
    { label: 'Notifications', href: '/notifications', icon: Bell }
  ];

  const facultyNavItems: NavItem[] = [
    { label: 'Faculty Dashboard', href: '/faculty', icon: LayoutDashboard },
    { label: 'Mark Attendance & Topic', href: '/faculty/attendance', icon: CheckSquare, badge: 'Pending' },
    { label: 'Class Update Result', href: '/faculty/class-update', icon: Zap },
    { label: 'Notifications', href: '/notifications', icon: Bell }
  ];

  const studentNavItems: NavItem[] = [
    { label: 'Student Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Weekly Timetable', href: '/student/timetable', icon: Calendar },
    { label: 'Notifications', href: '/student/notifications', icon: Bell, badge: '2 New' }
  ];

  const adminNavItems: NavItem[] = [
    { label: 'User Accounts', href: '/admin/users', icon: Users },
    { label: 'Course Management', href: '/admin/courses', icon: BookOpen },
    { label: 'System & Integrations', href: '/admin/system', icon: Server, badge: 'Live' }
  ];

  let navItems = hodNavItems;
  let roleTitle = 'HOD Administration';

  if (currentRole === 'FACULTY') {
    navItems = facultyNavItems;
    roleTitle = 'Faculty Workstation';
  } else if (currentRole === 'STUDENT') {
    navItems = studentNavItems;
    roleTitle = 'Student Learning Portal';
  } else if (currentRole === 'ADMIN') {
    navItems = adminNavItems;
    roleTitle = 'System Administration';
  }

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border-subtle)',
      boxShadow: '2px 0 16px -4px rgba(108, 99, 255, 0.03)',
      padding: '24px 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 'calc(100vh - 70px)'
    }}>
      <div>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginBottom: '16px',
          paddingLeft: '12px'
        }}>
          {roleTitle}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (
              item.href !== '/hod' && 
              item.href !== '/faculty' && 
              item.href !== '/student/dashboard' &&
              item.href !== '/admin/users' &&
              pathname.startsWith(item.href)
            );

            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div
                  className="nav-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#6C63FF' : '#475569',
                    backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                    border: isActive ? '1px solid #C7D2FE' : '1px solid transparent',
                    boxShadow: isActive ? '0 2px 8px -2px rgba(108, 99, 255, 0.12)' : 'none',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#F0EEFF';
                      e.currentTarget.style.color = '#6C63FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={17} color={isActive ? '#6C63FF' : '#64748B'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '6px',
                      backgroundColor: item.badge === 'Live' ? '#ECFDF5' : '#FFFBEB',
                      color: item.badge === 'Live' ? '#059669' : '#D97706',
                      border: `1px solid ${item.badge === 'Live' ? '#A7F3D0' : '#FDE68A'}`
                    }}>
                      {item.badge}
                    </span>
                  )}

                  {item.isNew && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '5px',
                      background: 'linear-gradient(135deg, #6C63FF, #4FACFE)',
                      color: '#FFFFFF'
                    }}>
                      NEW
                    </span>
                  )}

                  {item.isAi && !isActive && (
                    <Sparkles size={14} color="#6C63FF" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* AI Assistant Quick Widget at Sidebar Footer */}
      <div
        className="glass-card"
        style={{
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(240, 238, 255, 0.7), rgba(234, 246, 255, 0.7))',
          border: '1px solid rgba(199, 210, 254, 0.6)',
          borderRadius: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #6C63FF, #4FACFE)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={13} color="#FFFFFF" />
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Recovery Engine Active
          </span>
        </div>
        <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
          Academic pacing active. 1 course flagged for timetable recovery slot formulation.
        </p>
        <Link href="/hod/recovery" style={{ textDecoration: 'none' }}>
          <button className="gradient-btn" style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: '0.78rem',
            borderRadius: '8px'
          }}>
            Open Recovery <Zap size={13} />
          </button>
        </Link>
      </div>
    </aside>
  );
}
