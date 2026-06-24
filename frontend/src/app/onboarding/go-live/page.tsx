import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../onboarding.module.css';
import { CheckCircle2 } from 'lucide-react';

export default function GoLiveStep() {
  return (
    <div className={styles.contentWrapper}>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CheckCircle2 size={64} style={{ color: 'var(--success)', margin: '0 auto 1.5rem' }} />
        <h1 className={styles.title}>You're ready to go live!</h1>
        <p className={styles.subtitle} style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Your AI assistant is fully configured and ready to serve customers.
        </p>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'left', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Deployment Summary</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
              <strong>Channels connected:</strong> WhatsApp
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
              <strong>Knowledge indexed:</strong> 2 sources
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
              <strong>Assistant tone:</strong> Friendly & Professional
            </li>
          </ul>
        </div>

        <Link href="/dashboard">
          <Button variant="primary" size="lg" style={{ minWidth: '200px' }}>Deploy to Production</Button>
        </Link>
      </div>
    </div>
  );
}
