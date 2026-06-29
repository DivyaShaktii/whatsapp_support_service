import React from 'react';
import { Button } from '@/components/ui/Button';
import { Upload, FileText, Globe } from 'lucide-react';
import styles from '../../onboarding/onboarding.module.css';

export default function DashboardKnowledgePage() {
  return (
    <div className={styles.contentWrapper} style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>
      <h1 className={styles.title} style={{ color: 'var(--text-main)' }}>Knowledge Base</h1>
      <p className={styles.subtitle} style={{ color: 'var(--text-muted)' }}>Provide information the AI should use to answer customer questions.</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button variant="outline" className={`${styles.channelCard} glass-panel`} style={{ flex: 1, padding: '2rem 1rem', background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
          <Upload className={styles.featureIcon} size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Upload PDF / DOCX</span>
        </Button>
        <Button variant="outline" className={`${styles.channelCard} glass-panel`} style={{ flex: 1, padding: '2rem 1rem', background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
          <Globe className={styles.featureIcon} size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Crawl Website</span>
        </Button>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Indexed Sources</h3>
        <div className={styles.sourceList} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className={styles.sourceItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}>
            <div className={styles.sourceInfo} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
              <Globe size={20} className={styles.sourceIcon} style={{ color: 'var(--primary)' }} />
              <span style={{ fontWeight: 500 }}>https://www.example.com</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, background: 'var(--secondary-light)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Synced</span>
          </div>
          <div className={styles.sourceItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}>
            <div className={styles.sourceInfo} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
              <FileText size={20} className={styles.sourceIcon} style={{ color: 'var(--primary)' }} />
              <span style={{ fontWeight: 500 }}>Return_Policy.pdf</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, background: 'var(--border-light)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Indexing...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
