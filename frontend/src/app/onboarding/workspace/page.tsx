import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../onboarding.module.css';

export default function WorkspaceStep() {
  return (
    <div className={styles.contentWrapper}>
      <h1 className={styles.title}>Workspace Details</h1>
      <p className={styles.subtitle}>Tell us about your business to help the AI understand your context.</p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Input label="Workspace Name" placeholder="e.g. Acme Corp Support" required />
        <Input label="Business Name" placeholder="Acme Corp" required />
        <Input label="Industry" placeholder="e.g. E-commerce, Restaurant" required />
        <Input label="Website URL" type="url" placeholder="https://www.example.com" />
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Input label="Country" placeholder="United States" />
          <Input label="Time Zone" placeholder="PST" />
        </div>

        <div className={styles.actions}>
          <Link href="/onboarding/channels">
            <Button type="button" variant="primary">Continue</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
