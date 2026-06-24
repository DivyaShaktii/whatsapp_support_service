import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../onboarding.module.css';

export default function WelcomeStep() {
  return (
    <div className={styles.contentWrapper}>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1 className={styles.title}>Welcome to SupportAgent.ai</h1>
        <p className={styles.subtitle} style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          Let's set up your AI assistant.
        </p>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Estimated setup time: <strong>5–10 minutes</strong>
        </p>
        
        <Link href="/onboarding/workspace">
          <Button variant="primary" size="lg">Start Setup</Button>
        </Link>
      </div>
    </div>
  );
}
