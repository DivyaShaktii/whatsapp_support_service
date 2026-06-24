import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../auth.module.css';

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Bot size={40} />
          </div>
          <h1 className={styles.title}>Create an account</h1>
          <p className={styles.subtitle}>Start automating your support today</p>
        </div>

        <form className={styles.form} action="/onboarding/welcome">
          <Input 
            label="Email address" 
            type="email" 
            placeholder="name@company.com" 
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="Create a strong password" 
            required 
          />
          {/* Note: In a real app we'd handle the form submit and route programmatically,
              but for the wireframe we can just use action attribute or Link */}
          <Link href="/onboarding/welcome" style={{ width: '100%', display: 'block' }}>
            <Button type="button" variant="primary" fullWidth>
              Continue
            </Button>
          </Link>
        </form>

        <div className={styles.divider}>or</div>

        <Link href="/onboarding/welcome" style={{ width: '100%', display: 'block' }}>
          <Button variant="outline" fullWidth type="button">
            Continue with Google
          </Button>
        </Link>

        <div className={styles.footer}>
          Already have an account?{' '}
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
