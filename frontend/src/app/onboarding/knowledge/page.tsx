import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../onboarding.module.css';
import { Upload, FileText, Globe, Link as LinkIcon } from 'lucide-react';

export default function KnowledgeStep() {
  return (
    <div className={styles.contentWrapper}>
      <h1 className={styles.title}>Knowledge Base</h1>
      <p className={styles.subtitle}>Provide information the AI should use to answer customer questions.</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button variant="outline" className={styles.channelCard} style={{ flex: 1, padding: '2rem 1rem' }}>
          <Upload className={styles.featureIcon} />
          <span>Upload PDF / DOCX</span>
        </Button>
        <Button variant="outline" className={styles.channelCard} style={{ flex: 1, padding: '2rem 1rem' }}>
          <Globe className={styles.featureIcon} />
          <span>Crawl Website</span>
        </Button>
      </div>

      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Indexed Sources</h3>
        <div className={styles.sourceList}>
          <div className={styles.sourceItem}>
            <div className={styles.sourceInfo}>
              <Globe size={20} className={styles.sourceIcon} />
              <span>https://www.example.com</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 500 }}>Synced</span>
          </div>
          <div className={styles.sourceItem}>
            <div className={styles.sourceInfo}>
              <FileText size={20} className={styles.sourceIcon} />
              <span>Return_Policy.pdf</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Indexing...</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/onboarding/channels">
          <Button type="button" variant="ghost">Back</Button>
        </Link>
        <Link href="/onboarding/ai-config">
          <Button type="button" variant="primary">Continue</Button>
        </Link>
      </div>
    </div>
  );
}
