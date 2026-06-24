import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../onboarding.module.css';

export default function AIConfigStep() {
  return (
    <div className={styles.contentWrapper}>
      <h1 className={styles.title}>Configure AI Assistant</h1>
      <p className={styles.subtitle}>Customize the behavior and tone of your AI.</p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input label="Assistant Name" placeholder="e.g. SupportBot" defaultValue="SupportBot" required />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Tone of Voice</label>
          <select style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}>
            <option>Friendly & Professional</option>
            <option>Casual</option>
            <option>Strictly Formal</option>
            <option>Luxury</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>System Instructions</label>
          <textarea 
            rows={4}
            placeholder="e.g. Always greet the user warmly. Escalate to a human for refund requests."
            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontFamily: 'inherit', resize: 'vertical' }}
            defaultValue="Use uploaded knowledge whenever possible. Do not invent information. Escalate refund requests."
          />
        </div>

        <div className={styles.actions}>
          <Link href="/onboarding/knowledge">
            <Button type="button" variant="ghost">Back</Button>
          </Link>
          <Link href="/onboarding/test-playground">
            <Button type="button" variant="primary">Continue</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
