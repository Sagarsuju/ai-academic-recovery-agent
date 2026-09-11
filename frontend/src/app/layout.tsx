import React from 'react';
import './globals.css';

export const metadata = {
  title: 'AI Academic Recovery & Course Progress Agent',
  description: 'Intelligent Academic Progress Tracking & Risk Recovery Engine for Educational Institutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
