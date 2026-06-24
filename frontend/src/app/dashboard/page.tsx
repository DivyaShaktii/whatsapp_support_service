import styles from './dashboard.module.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function DashboardOverview() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Overview</h1>
      
      <div className={styles.analyticsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Today's Conversations</div>
          <div className={styles.statValue}>1,248</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>AI Resolution Rate</div>
          <div className={styles.statValue}>84%</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Human Transfers</div>
          <div className={styles.statValue}>199</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Avg Response Time</div>
          <div className={styles.statValue}>1.2s</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>Conversation Volume (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div style={{ height: '250px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Chart Area
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Hand-offs</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>"I need a refund for my order."</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Assigned to Support Team</div>
              </div>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>"Can I speak to a manager?"</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Assigned to Supervisors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
