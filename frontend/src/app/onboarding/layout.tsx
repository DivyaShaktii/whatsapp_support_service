import Link from 'next/link';
import { Bot } from 'lucide-react';
import styles from './onboarding.module.css';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wizardContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Bot size={24} />
          <span>SupportAgent.ai</span>
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
