import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../onboarding.module.css';
import { Send, CheckCircle } from 'lucide-react';

export default function TestPlaygroundStep() {
  return (
    <div className={styles.contentWrapperWide} style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 className={styles.title}>Test Playground</h1>
        <p className={styles.subtitle}>Simulate customer conversations to verify AI behavior.</p>

        {/* Mock Chat Interface */}
        <div style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '400px' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-main)', fontWeight: 600 }}>
            Chat Preview
          </div>
          <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
            <div style={{ alignSelf: 'flex-start', background: 'var(--bg-main)', padding: '0.75rem', borderRadius: '1rem', borderBottomLeftRadius: 0, maxWidth: '80%' }}>
              Hi there, I have a question about my recent order.
            </div>
            <div style={{ alignSelf: 'flex-end', background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '1rem', borderBottomRightRadius: 0, maxWidth: '80%' }}>
              Hello! I can help with that. Could you please provide your order number?
            </div>
          </div>
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
            <Input placeholder="Type a message..." style={{ margin: 0, flex: 1 }} />
            <Button variant="primary" size="icon"><Send size={18} /></Button>
          </div>
        </div>
      </div>

      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '5rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Diagnostics</h3>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Confidence</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>High (98%)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Latency</span>
              <span>1.2s</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Sources Used</span>
              <span>1</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quick Test Buttons</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Button variant="outline" size="sm" style={{ justifyContent: 'flex-start' }}>Test Refund Request</Button>
            <Button variant="outline" size="sm" style={{ justifyContent: 'flex-start' }}>Test Order Status</Button>
            <Button variant="outline" size="sm" style={{ justifyContent: 'flex-start' }}>Test Human Transfer</Button>
          </div>
        </div>

        <div className={styles.actions} style={{ marginTop: 'auto', borderTop: 'none', padding: 0 }}>
          <Link href="/onboarding/ai-config">
            <Button type="button" variant="ghost">Back</Button>
          </Link>
          <Link href="/onboarding/go-live">
            <Button type="button" variant="primary">Continue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
