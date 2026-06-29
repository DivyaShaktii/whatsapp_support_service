import React from 'react';
import Link from 'next/link';
import { BookOpen, Bot, Play, ArrowRight } from 'lucide-react';
import styles from './configuration.module.css';

export default function ConfigurationPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Configuration</h1>
        <p className={styles.subtitle}>Manage your assistant's knowledge, behaviour, and setup.</p>
      </header>

      <div className={styles.stepperContainer}>
        <div className={styles.step}>
          <span className={styles.stepNumber}>1</span>
          <span className={styles.stepLabel}>Setup Knowledge Base</span>
        </div>
        <ArrowRight size={16} className={styles.stepArrow} />
        <div className={styles.step}>
          <span className={styles.stepNumber}>2</span>
          <span className={styles.stepLabel}>Configure AI Assistant</span>
        </div>
        <ArrowRight size={16} className={styles.stepArrow} />
        <div className={styles.step}>
          <span className={styles.stepNumber}>3</span>
          <span className={styles.stepLabel}>Test Setup</span>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Card 1: Knowledge Base */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <BookOpen size={24} />
          </div>
          <h2 className={styles.cardTitle}>Knowledge Base</h2>
          <p className={styles.cardDescription}>
            Manage the documents, files, and web sources your assistant uses to answer questions. 
            Keep your knowledge current for accurate responses.
          </p>
          <div className={styles.cardActions}>
            <Link href="/dashboard/knowledge" className={styles.primaryButton}>
              Manage Knowledge Base
            </Link>
            <Link href="/dashboard/knowledge" className={styles.secondaryLink}>
              Add New Source
            </Link>
          </div>
        </div>

        {/* Card 2: AI Assistant Configuration */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <Bot size={24} />
          </div>
          <h2 className={styles.cardTitle}>AI Assistant Configuration</h2>
          <p className={styles.cardDescription}>
            Configure your assistant's persona, tone, language, business hours, 
            fallback behaviour, and conversation rules.
          </p>
          <div className={styles.cardActions}>
            <Link href="/onboarding/ai-config" className={styles.primaryButton}>
              Configure Assistant
            </Link>
          </div>
        </div>

        {/* Card 3: Test Your Setup */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <Play size={24} />
          </div>
          <h2 className={styles.cardTitle}>Test Your Setup</h2>
          <p className={styles.cardDescription}>
            Send a test message to your assistant and verify it responds correctly 
            before your customers interact with it.
          </p>
          <div className={styles.cardActions}>
            <Link href="/onboarding/test-playground" className={styles.primaryButton}>
              Run a Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
