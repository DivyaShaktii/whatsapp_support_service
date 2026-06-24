'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Inbox, LayoutDashboard, Settings, BookOpen, Workflow, Users, Bell } from 'lucide-react';
import styles from './dashboard.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Inbox', path: '/dashboard/inbox', icon: Inbox },
    { name: 'Knowledge Base', path: '/dashboard/knowledge', icon: BookOpen },
    { name: 'Workflows', path: '/dashboard/workflows', icon: Workflow },
    { name: 'Team', path: '/dashboard/team', icon: Users },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Bot size={24} color="var(--primary)" />
          <span>SupportAgent.ai</span>
        </div>
        <nav className={styles.navMenu}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      
      <div className={styles.mainContent}>
        <header className={styles.topbar}>
          <Bell size={20} style={{ color: 'var(--text-muted)' }} />
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: 'var(--primary)' }}>
            JD
          </div>
        </header>
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
