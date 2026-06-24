import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';
import { Bot, MessageSquare, Zap, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Bot size={28} />
          <span>SupportAgent.ai</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="#features" className={styles.link}>Features</Link>
          <Link href="#pricing" className={styles.link}>Pricing</Link>
          <Link href="#docs" className={styles.link}>Documentation</Link>
        </div>
        <div className={styles.navActions}>
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary">Start Free</Button>
          </Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Deploy your first AI customer support agent in under 10 minutes.
          </h1>
          <p className={styles.heroSubtitle}>
            Automate your WhatsApp, Web Chat, and Email support with an AI agent powered by your business's unique knowledge.
          </p>
          <div className={styles.heroActions}>
            <Link href="/signup">
              <Button variant="primary" size="lg">Start for free</Button>
            </Link>
            <Button variant="outline" size="lg">Book a demo</Button>
          </div>
        </section>

        <section id="features" className={styles.features}>
          <h2 className={styles.sectionTitle}>Everything you need to automate support</h2>
          <div className={styles.grid}>
            <div className={styles.featureCard}>
              <MessageSquare size={48} className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Omnichannel Support</h3>
              <p className={styles.featureDesc}>Connect WhatsApp, Website Chat, Instagram, and more in a few clicks.</p>
            </div>
            <div className={styles.featureCard}>
              <Zap size={48} className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Instant RAG Knowledge</h3>
              <p className={styles.featureDesc}>Upload your PDFs, URLs, and FAQs. The AI learns instantly without training.</p>
            </div>
            <div className={styles.featureCard}>
              <Shield size={48} className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Human Escalation</h3>
              <p className={styles.featureDesc}>Seamlessly hand off complex conversations to your human team when needed.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
