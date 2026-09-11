'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, ShieldAlert, UserCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Role } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('HOD');
  const [email, setEmail] = useState('hod.cse@vignan.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (role === 'HOD') {
        router.push('/hod');
      } else {
        router.push('/faculty');
      }
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px'
    }}>
      {/* Background Glowing Ambient Orbs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* Login Glass Card */}
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '460px',
        padding: '40px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Branding & Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)'
          }}>
            <GraduationCap size={36} color="#ffffff" />
          </div>

          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            marginBottom: '6px',
            background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Vignan University
          </h1>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#818cf8',
            background: 'rgba(99, 102, 241, 0.1)',
            padding: '4px 12px',
            borderRadius: '9999px',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <Sparkles size={13} /> AI Academic Recovery Portal
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '28px'
        }}>
          <button
            type="button"
            onClick={() => {
              setRole('HOD');
              setEmail('hod.cse@vignan.edu.in');
            }}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: role === 'HOD' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
              color: role === 'HOD' ? '#ffffff' : '#94a3b8',
              boxShadow: role === 'HOD' ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldAlert size={16} /> HOD Portal
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('FACULTY');
              setEmail('prof.ananya@vignan.edu.in');
            }}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: role === 'FACULTY' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
              color: role === 'FACULTY' ? '#ffffff' : '#94a3b8',
              boxShadow: role === 'FACULTY' ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={16} /> Faculty Portal
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#94a3b8',
              marginBottom: '8px'
            }}>
              Institutional Email / Username
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#94a3b8',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              marginTop: '10px'
            }}
          >
            {isLoading ? 'Authenticating...' : `Enter ${role} Portal`} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          Authorized access only. Vignan AI Academic Monitoring System v2.4
        </div>
      </div>
    </div>
  );
}
