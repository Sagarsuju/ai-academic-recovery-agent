'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Search, GraduationCap, UserCheck, ShieldAlert, Sparkles, LogOut } from 'lucide-react';
import { Role } from '@/types';

interface NavbarProps {
  currentRole: Role;
  onRoleChange?: (role: Role) => void;
  unreadNotificationsCount?: number;
}

export default function Navbar({ currentRole, onRoleChange, unreadNotificationsCount = 3 }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoleToggle = (newRole: Role) => {
    if (onRoleChange) onRoleChange(newRole);
    if (newRole === 'FACULTY' && !pathname.startsWith('/faculty')) {
      router.push('/faculty');
    } else if (newRole === 'HOD' && !pathname.startsWith('/hod')) {
      router.push('/hod');
    }
  };

  return (
    <header style={{
      height: '70px',
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand & Institution Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
        }}>
          <GraduationCap size={24} color="#ffffff" />
        </div>
        <div>
          <div style={{
            fontSize: '1rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Vignan Institute of Technology
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} /> AI Academic Recovery & Course Progress Agent
          </div>
        </div>
      </div>

      {/* Global Search & Search Input */}
      <div style={{
        position: 'relative',
        width: '320px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
        <input
          type="text"
          placeholder="Search courses, faculty, topics..."
          style={{
            width: '100%',
            padding: '8px 12px 8px 36px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#f8fafc',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Role Toggle Switcher & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Role Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={() => handleRoleToggle('HOD')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: currentRole === 'HOD' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
              color: currentRole === 'HOD' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldAlert size={14} /> HOD Portal
          </button>

          <button
            onClick={() => handleRoleToggle('FACULTY')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: currentRole === 'FACULTY' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
              color: currentRole === 'FACULTY' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={14} /> Faculty Portal
          </button>
        </div>

        {/* Notifications Icon with Badge */}
        <Link href="/notifications" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <Bell size={18} color="#cbd5e1" />
            {unreadNotificationsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#ef4444',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
              }}>
                {unreadNotificationsCount}
              </span>
            )}
          </div>
        </Link>

        {/* User Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#fff',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            {currentRole === 'HOD' ? 'RK' : 'AS'}
          </div>
          <div style={{ display: 'none', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              {currentRole === 'HOD' ? 'Dr. R. K. Prasad' : 'Prof. Ananya Sharma'}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              {currentRole === 'HOD' ? 'Head of Dept (CSE)' : 'Assistant Professor'}
            </span>
          </div>

          <button
            onClick={() => router.push('/login')}
            title="Logout"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              padding: '6px'
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
