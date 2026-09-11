'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootHomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b0f19',
      color: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <p>Redirecting to AI Academic Recovery Portal...</p>
    </div>
  );
}
