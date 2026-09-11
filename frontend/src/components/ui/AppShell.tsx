'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import VignanHeader from './VignanHeader';
import Sidebar from './Sidebar';
import CommandPalette from './CommandPalette';
import { Role } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [role, setRole] = useState<Role>('HOD');

  useEffect(() => {
    let targetRole: Role = 'HOD';
    if (pathname.startsWith('/faculty')) {
      targetRole = 'FACULTY';
    } else if (pathname.startsWith('/hod')) {
      targetRole = 'HOD';
    } else if (pathname.startsWith('/student')) {
      targetRole = 'STUDENT';
    } else if (pathname.startsWith('/admin')) {
      targetRole = 'ADMIN';
    }

    setRole(targetRole);

    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('vignan_user_role') as Role | null;
      if (storedRole) {
        // Enforce role-based route protection
        if (storedRole === 'STUDENT' && (pathname.startsWith('/admin') || pathname.startsWith('/hod') || pathname.startsWith('/faculty'))) {
          router.replace('/student/dashboard');
          return;
        }
        if (storedRole === 'FACULTY' && pathname.startsWith('/admin')) {
          router.replace('/faculty');
          return;
        }
      }
    }
  }, [pathname, router]);

  if (pathname === '/login') {
    return <main>{children}</main>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      <CommandPalette />
      <VignanHeader currentRole={role} onRoleChange={(r) => setRole(r)} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar currentRole={role} />
        <main style={{
          flex: 1,
          padding: '28px 32px',
          maxWidth: '1600px',
          width: '100%',
          margin: '0 auto',
          overflowX: 'hidden'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
