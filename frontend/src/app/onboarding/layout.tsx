import Link from 'next/link';
import { Bot } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import styles from './onboarding.module.css';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.wizardContainer} glass-panel`} style={{ background: 'transparent' }}>
      <header className={`${styles.header} glass-panel`} style={{ borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BackButton />
          <div className={styles.logo}>
            <Bot size={24} color="var(--primary)" />
            <span>SupportAgent.ai</span>
          </div>
        </div>
        <div className={styles.stepIndicator}>
          Setup Wizard
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
