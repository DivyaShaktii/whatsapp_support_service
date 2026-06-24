import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../auth.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Bot size={40} />
          </div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Log in to manage your AI assistant</p>
        </div>

        <form className={styles.form}>
          <Input 
            label="Email address" 
            type="email" 
            placeholder="name@company.com" 
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
          <Button type="submit" variant="primary" fullWidth>
            Continue
          </Button>
        </form>

        <div className={styles.divider}>or</div>

        <Button variant="outline" fullWidth>
          Continue with Google
        </Button>

        <div className={styles.footer}>
          Don't have an account?{' '}
          <Link href="/signup" className={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
