'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import VignanHeader from './VignanHeader';
import Sidebar from './Sidebar';
import { Role } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  
  const [role, setRole] = useState<Role>('HOD');

  useEffect(() => {
    if (pathname.startsWith('/faculty')) {
      setRole('FACULTY');
    } else if (pathname.startsWith('/hod')) {
      setRole('HOD');
    }
  }, [pathname]);

  if (pathname === '/login') {
    return <main>{children}</main>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
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
