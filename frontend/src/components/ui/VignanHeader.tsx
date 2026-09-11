'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Search, ShieldAlert, UserCheck, Sparkles, LogOut } from 'lucide-react';
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
    }
  };

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '2px solid #e2e8f0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Top University Official Branding Bar */}
      <div style={{
        padding: '12px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f1f5f9',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* TOP LEFT: Official Vignan University Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Shield Crest Icon */}
              <svg width="44" height="52" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5L90 20V55C90 82 72 105 50 115C28 105 10 82 10 55V20L50 5Z" fill="#7c3aed" stroke="#6d28d9" strokeWidth="4" />
                <circle cx="50" cy="52" r="28" fill="#ffffff" stroke="#2563eb" strokeWidth="4" />
                <path d="M50 32L54 44H66L56 52L60 64L50 56L40 64L44 52L34 44H46L50 32Z" fill="#0284c7" />
              </svg>

              <div>
                <div style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  fontFamily: 'Inter, sans-serif',
                  color: '#e11d48',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}>
                  VIGNAN'S
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  Foundation for Science, Technology & Research
                </div>
              </div>
            </div>

            {/* Blue Banner */}
            <div style={{
              background: '#0284c7',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '4px',
              marginTop: '4px',
              textAlign: 'center',
              letterSpacing: '0.02em'
            }}>
              (Deemed to be University) - Estd. u/s 3 of UGC Act 1956
            </div>
          </div>
        </div>

        {/* TOP CENTER: Project Header Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#64748b',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '2px'
          }}>
            DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING PRESENTS
          </div>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: 900,
            fontFamily: 'Outfit, sans-serif',
            color: '#0f172a',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Sparkles size={20} color="#7c3aed" /> AI ACADEMIC RECOVERY & COURSE PROGRESS AGENT
          </div>
        </div>

        {/* TOP RIGHT: The 5 Circular Accreditation Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Badge 1: NAAC A+ */}
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '2px solid #7c3aed',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.15)'
          }}>
            <span style={{ fontSize: '0.52rem', fontWeight: 800, color: '#475569' }}>NAAC</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>A+</span>
            <span style={{ fontSize: '0.45rem', color: '#64748b', fontWeight: 700 }}>3.49 CGPA</span>
          </div>

          {/* Badge 2: NIRF 75 */}
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '2px solid #f59e0b',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.15)'
          }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#1e3a8a' }}>nirf</span>
            <span style={{ fontSize: '0.52rem', fontWeight: 800, color: '#0f172a' }}>Rank 75</span>
            <span style={{ fontSize: '0.45rem', color: '#64748b', fontWeight: 700 }}>2023</span>
          </div>

          {/* Badge 3: NBA Accredited */}
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '2px solid #ec4899',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            boxShadow: '0 2px 8px rgba(236, 72, 153, 0.15)'
          }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#ea580c' }}>NBA</span>
            <span style={{ fontSize: '0.45rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', lineHeight: 1 }}>CSE, ECE, EEE</span>
          </div>

          {/* Badge 4: AICTE Approved */}
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '2px solid #0284c7',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            boxShadow: '0 2px 8px rgba(2, 132, 199, 0.15)'
          }}>
            <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#d97706' }}>AICTE</span>
            <span style={{ fontSize: '0.45rem', color: '#64748b', fontWeight: 700 }}>Approved</span>
          </div>

          {/* Badge 5: UGC 12(B) */}
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '2px solid #10b981',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)'
          }}>
            <span style={{ fontSize: '0.52rem', fontWeight: 800, color: '#1e3a8a' }}>UGC 12(B)</span>
            <span style={{ fontSize: '0.48rem', fontWeight: 900, color: '#047857' }}>STATUS</span>
          </div>
        </div>
      </div>

      {/* Lower Navigation & Controls Bar */}
      <div style={{
        padding: '10px 28px',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {/* Global Search Input */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          <input
            type="text"
            placeholder="Search courses, faculty, topics..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Role Toggle Switcher & Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Role Toggle Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#e2e8f0',
            padding: '3px',
            borderRadius: '8px'
          }}>
            <button
              onClick={() => handleRoleToggle('HOD')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: currentRole === 'HOD' ? '#1e3a8a' : 'transparent',
                color: currentRole === 'HOD' ? '#ffffff' : '#475569',
                boxShadow: currentRole === 'HOD' ? '0 2px 8px rgba(30, 58, 138, 0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <ShieldAlert size={14} /> HOD Portal
            </button>

            <button
              onClick={() => handleRoleToggle('FACULTY')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: currentRole === 'FACULTY' ? '#1e3a8a' : 'transparent',
                color: currentRole === 'FACULTY' ? '#ffffff' : '#475569',
                boxShadow: currentRole === 'FACULTY' ? '0 2px 8px rgba(30, 58, 138, 0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <UserCheck size={14} /> Faculty Portal
            </button>
          </div>

          {/* Notifications Link */}
          <Link href="/notifications" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Bell size={18} color="#334155" />
              {unreadNotificationsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#dc2626',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
          </Link>

          {/* Logout button */}
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
