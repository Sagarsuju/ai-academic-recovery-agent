'use client';

import React from 'react';
import AppShell from '@/components/ui/AppShell';
import NotificationsView from '@/components/ui/NotificationsView';

export default function NotificationsPage() {
  return (
    <AppShell>
      <NotificationsView />
    </AppShell>
  );
}
