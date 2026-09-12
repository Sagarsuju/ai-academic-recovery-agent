'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Search, ShieldAlert, UserCheck, Sparkles, LogOut, GraduationCap, Settings, User } from 'lucide-react';
import { Role } from '@/types';

interface VignanHeaderProps {
  currentRole: Role;
  onRoleChange?: (role: Role) => void;
  unreadNotificationsCount?: number;
}

export default function VignanHeader({ currentRole, onRoleChange, unreadNotificationsCount = 3 }: VignanHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoleToggle = (newRole: Role) => {
    if (onRoleChange) onRoleChange(newRole);
    if (newRole === 'FACULTY' && !pathname.startsWith('/faculty')) {
      router.push('/faculty');
    } else if (newRole === 'HOD' && !pathname.startsWith('/hod')) {
      router.push('/hod');
    } else if (newRole === 'STUDENT' && !pathname.startsWith('/student')) {
      router.push('/student/dashboard');
    } else if (newRole === 'ADMIN' && !pathname.startsWith('/admin')) {
      router.push('/admin/users');
    }
  };

  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.90)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 2px 12px -2px rgba(108, 99, 255, 0.04)'
    }}>
      {/* Top University Official Branding Bar */}
      <div style={{
        padding: '10px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* TOP LEFT: Official Vignan University Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: '#FFFFFF',
            padding: '4px 10px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 1px 3px rgba(30, 35, 51, 0.03)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img
              src="/logo.png"
              alt="Vignan University Logo"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* TOP CENTER: Project Header Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '2px',
            fontFamily: 'var(--font-sans)'
          }}>
            DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
          </div>
          <div style={{
            fontSize: '1.18rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #6C63FF, #4FACFE)',
              color: '#FFFFFF'
            }}>
              <Sparkles size={14} />
            </span>
            <span>AI ACADEMIC RECOVERY & COURSE PROGRESS AGENT</span>
          </div>
        </div>

        {/* TOP RIGHT: Accreditation Badges Image */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            background: '#FFFFFF',
            padding: '4px 8px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 1px 3px rgba(30, 35, 51, 0.03)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img
              src="/accreditation_badges.jpg"
              alt="Vignan Accreditation Badges"
              style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      {/* Lower Navigation & Controls Bar */}
      <div style={{
        padding: '8px 28px',
        background: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Global Search Input with Cmd+K Badge */}
        <div
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
          }}
          style={{ position: 'relative', width: '340px', cursor: 'pointer' }}
        >
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '10px' }} />
          <input
            type="text"
            readOnly
            placeholder="Search tools, courses, topics..."
            style={{
              width: '100%',
              padding: '8px 70px 8px 38px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(30, 35, 51, 0.03)'
            }}
          />
          <span style={{
            position: 'absolute',
            right: '10px',
            top: '7px',
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            fontWeight: 700,
            padding: '2px 7px',
            borderRadius: '6px',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            color: '#64748B'
          }}>
            ⌘K
          </span>
        </div>

        {/* Role Toggle Switcher & Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Role Toggle Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F1F5F9',
            padding: '3px',
            borderRadius: '10px',
            gap: '3px'
          }}>
            <button
              onClick={() => handleRoleToggle('HOD')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: currentRole === 'HOD' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: currentRole === 'HOD' ? '#FFFFFF' : 'transparent',
                color: currentRole === 'HOD' ? '#6C63FF' : '#64748B',
                boxShadow: currentRole === 'HOD' ? '0 2px 6px rgba(108, 99, 255, 0.12)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <ShieldAlert size={14} color={currentRole === 'HOD' ? '#6C63FF' : '#64748B'} /> HOD
            </button>

            <button
              onClick={() => handleRoleToggle('FACULTY')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: currentRole === 'FACULTY' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: currentRole === 'FACULTY' ? '#FFFFFF' : 'transparent',
                color: currentRole === 'FACULTY' ? '#4FACFE' : '#64748B',
                boxShadow: currentRole === 'FACULTY' ? '0 2px 6px rgba(79, 172, 254, 0.15)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <UserCheck size={14} color={currentRole === 'FACULTY' ? '#4FACFE' : '#64748B'} /> Faculty
            </button>

            <button
              onClick={() => handleRoleToggle('STUDENT')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: currentRole === 'STUDENT' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: currentRole === 'STUDENT' ? '#FFFFFF' : 'transparent',
                color: currentRole === 'STUDENT' ? '#10B981' : '#64748B',
                boxShadow: currentRole === 'STUDENT' ? '0 2px 6px rgba(52, 211, 153, 0.15)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <GraduationCap size={14} color={currentRole === 'STUDENT' ? '#10B981' : '#64748B'} /> Student
            </button>

            <button
              onClick={() => handleRoleToggle('ADMIN')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: currentRole === 'ADMIN' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: currentRole === 'ADMIN' ? '#FFFFFF' : 'transparent',
                color: currentRole === 'ADMIN' ? '#818CF8' : '#64748B',
                boxShadow: currentRole === 'ADMIN' ? '0 2px 6px rgba(129, 140, 248, 0.15)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <Settings size={14} color={currentRole === 'ADMIN' ? '#818CF8' : '#64748B'} /> Admin
            </button>
          </div>

          {/* AI Assistant Quick Nav */}
          <Link href="/hod/ai-assistant" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#F0EEFF',
              border: '1px solid #E0DBFF',
              color: '#6C63FF',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}>
              <Sparkles size={14} color="#6C63FF" />
              <span>AI Chat</span>
            </div>
          </Link>

          {/* Notifications Link with Soft Pastel Red Badge */}
          <Link href={currentRole === 'STUDENT' ? "/student/notifications" : "/notifications"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(30, 35, 51, 0.04)',
              transition: 'all 0.15s ease'
            }}>
              <Bell size={18} color="#64748B" />
              {unreadNotificationsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F87171, #EF4444)',
                  color: '#FFFFFF',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(248, 113, 113, 0.4)'
                }}>
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
          </Link>

          {/* Profile Soft Indigo Avatar */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#EEF2FF',
            border: '1px solid #C7D2FE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4F46E5',
            fontWeight: 700,
            fontSize: '0.85rem'
          }} title="Current Profile">
            <User size={18} color="#4F46E5" />
          </div>

          {/* Logout button */}
          <button
            onClick={() => router.push('/login')}
            title="Logout"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
