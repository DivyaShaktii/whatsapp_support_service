'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  className?: string;
}

export function BackButton({ label = 'Back', className = '' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--text-muted)',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        padding: '0.5rem 0',
        transition: 'color 0.2s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
      onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
