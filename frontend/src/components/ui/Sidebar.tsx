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

  const navItems: NavItem[] = currentRole === 'HOD' ? hodNavItems : facultyNavItems;

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(17, 24, 39, 0.75)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '24px 16px',
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
          color: '#64748b',
          marginBottom: '16px',
          paddingLeft: '12px'
        }}>
          {currentRole === 'HOD' ? 'HOD Administration' : 'Faculty Workstation'}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/hod' && item.href !== '/faculty' && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#ffffff' : '#94a3b8',
                  background: isActive
                    ? item.isAi
                      ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(139, 92, 246, 0.25))'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))'
                    : 'transparent',
                  border: isActive
                    ? item.isAi
                      ? '1px solid rgba(236, 72, 153, 0.4)'
                      : '1px solid rgba(99, 102, 241, 0.3)'
                    : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} color={isActive ? (item.isAi ? '#ec4899' : '#818cf8') : '#64748b'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: '#a5b4fc',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      {item.badge}
                    </span>
                  )}

                  {item.isNew && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#fff'
                    }}>
                      NEW
                    </span>
                  )}

                  {item.isAi && !isActive && (
                    <Sparkles size={14} color="#ec4899" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* AI Assistant Quick Widget at Sidebar Footer */}
      <div className="glass-card" style={{
        padding: '14px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={16} color="#818cf8" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
            Recovery Engine Active
          </span>
        </div>
        <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
          Syllabus predictions updated daily. 1 course requires immediate timetable slot allocation.
        </p>
        <Link href="/hod/recovery" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{
            width: '100%',
            marginTop: '10px',
            padding: '6px 12px',
            fontSize: '0.75rem'
          }}>
            Review Plans
          </button>
        </Link>
      </div>
    </aside>
  );
}
