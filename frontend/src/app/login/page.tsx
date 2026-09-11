'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert, UserCheck, Lock, Mail, ArrowRight, Sparkles, GraduationCap, Settings, Cpu } from 'lucide-react';
import { Role } from '@/types';
import RobotMascot from '@/components/ui/RobotMascot';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('HOD');
  const [email, setEmail] = useState('hod.cse@vignan.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vignan_user_role', role);
      localStorage.setItem('vignan_user_email', email);
    }
    setTimeout(() => {
      if (role === 'HOD') {
        router.push('/hod');
      } else if (role === 'FACULTY') {
        router.push('/faculty');
      } else if (role === 'STUDENT') {
        router.push('/student/dashboard');
      } else if (role === 'ADMIN') {
        router.push('/admin/users');
      }
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#F7F9FC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '24px',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Top-Right Corner Animated 3D AI Robot Mascot */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '24px',
        zIndex: 30
      }}>
        <RobotMascot />
      </div>

      {/* 4 Large Blurred Pastel Gradient Blobs */}
      {/* 1. Purple top-left */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: '-100px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167, 139, 250, 0.28) 0%, rgba(108, 99, 255, 0.08) 60%, transparent 80%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      {/* 2. Blue top-right */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        width: '460px',
        height: '460px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 172, 254, 0.25) 0%, rgba(125, 211, 252, 0.08) 60%, transparent 80%)',
        filter: 'blur(65px)',
        pointerEvents: 'none'
      }} />

      {/* 3. Cyan bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '10%',
        width: '480px',
        height: '480px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(147, 197, 253, 0.07) 60%, transparent 80%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      {/* 4. Green bottom-right */}
      <div style={{
        position: 'absolute',
        bottom: '-120px',
        right: '-100px',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52, 211, 153, 0.20) 0%, rgba(110, 231, 183, 0.06) 60%, transparent 80%)',
        filter: 'blur(75px)',
        pointerEvents: 'none'
      }} />

      {/* Faint Academic Geometric Grid Pattern Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Login Card with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '40px 44px',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 20px 40px -15px rgba(108, 99, 255, 0.08), 0 0 0 1px rgba(232, 236, 243, 0.8)',
          borderRadius: '20px'
        }}
      >
        {/* Animated 3D AI Robot Mascot Sitting on Top-Right Corner */}
        <div style={{
          position: 'absolute',
          top: '-70px',
          right: '-45px',
          zIndex: 50
        }}>
          <RobotMascot />
        </div>

        {/* Branding & Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 800,
            marginBottom: '6px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            Academic Recovery Portal
          </h1>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#6C63FF',
            background: '#F0EEFF',
            padding: '4px 14px',
            borderRadius: '999px',
            border: '1px solid #E0DBFF'
          }}>
            <Sparkles size={14} color="#6C63FF" /> Department of Computer Science & Engineering
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: '#F1F5F9',
          padding: '6px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => {
              setRole('HOD');
              setEmail('hod.cse@vignan.edu.in');
            }}
            style={{
              padding: '9px 10px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'HOD' ? '#FFFFFF' : 'transparent',
              color: role === 'HOD' ? '#6C63FF' : '#64748B',
              boxShadow: role === 'HOD' ? '0 2px 8px rgba(108, 99, 255, 0.14)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <ShieldAlert size={14} color={role === 'HOD' ? '#6C63FF' : '#64748B'} /> HOD Portal
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('FACULTY');
              setEmail('prof.ananya@vignan.edu.in');
            }}
            style={{
              padding: '9px 10px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'FACULTY' ? '#FFFFFF' : 'transparent',
              color: role === 'FACULTY' ? '#4FACFE' : '#64748B',
              boxShadow: role === 'FACULTY' ? '0 2px 8px rgba(79, 172, 254, 0.15)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <UserCheck size={14} color={role === 'FACULTY' ? '#4FACFE' : '#64748B'} /> Faculty Portal
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('STUDENT');
              setEmail('kavya.cse23@vignan.edu.in');
            }}
            style={{
              padding: '9px 10px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'STUDENT' ? '#FFFFFF' : 'transparent',
              color: role === 'STUDENT' ? '#10B981' : '#64748B',
              boxShadow: role === 'STUDENT' ? '0 2px 8px rgba(52, 211, 153, 0.15)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <GraduationCap size={14} color={role === 'STUDENT' ? '#10B981' : '#64748B'} /> Student Portal
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('ADMIN');
              setEmail('admin.academic@vignan.edu.in');
            }}
            style={{
              padding: '9px 10px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'ADMIN' ? '#FFFFFF' : 'transparent',
              color: role === 'ADMIN' ? '#818CF8' : '#64748B',
              boxShadow: role === 'ADMIN' ? '0 2px 8px rgba(129, 140, 248, 0.15)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <Settings size={14} color={role === 'ADMIN' ? '#818CF8' : '#64748B'} /> Admin Portal
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              Institutional Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 42px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 42px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary gradient-btn"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '0.95rem',
              borderRadius: '10px',
              marginTop: '6px'
            }}
          >
            {isLoading ? 'Authenticating...' : `Enter ${role} Portal`} <ArrowRight size={17} />
          </button>
        </form>



        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          Authorized access only • Vignan AI Academic Monitoring System v2.4
        </div>
      </motion.div>
    </div>
  );
}
