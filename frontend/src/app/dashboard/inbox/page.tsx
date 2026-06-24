import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, MoreVertical, Send, User, Tag, FileText, Phone } from 'lucide-react';
import styles from '../dashboard.module.css';

export default function InboxPage() {
  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Unified Inbox</h1>
      
      <div className={styles.inboxContainer}>
        {/* Left Panel: Thread List */}
        <div className={styles.threadList}>
          <div className={styles.threadHeader}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <Input placeholder="Search messages..." style={{ margin: 0 }} />
              <Button variant="outline" size="icon"><Search size={18} /></Button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>All</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', padding: '0.25rem 0.5rem' }}>Unassigned</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', padding: '0.25rem 0.5rem' }}>Mine</span>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div className={`${styles.threadItem} ${styles.active}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600 }}>+1 (555) 123-4567</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2m ago</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                I need to change my shipping address.
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', background: 'var(--warning)', color: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>WhatsApp</span>
                <span style={{ fontSize: '0.65rem', background: 'var(--border)', color: 'var(--text-main)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Bot</span>
              </div>
            </div>

            <div className={styles.threadItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600 }}>Sarah Jenkins</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1h ago</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Thanks for the help!
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', background: 'var(--primary)', color: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Web Chat</span>
                <span style={{ fontSize: '0.65rem', background: 'var(--success)', color: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Resolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Chat Area */}
        <div className={styles.chatArea}>
          <div className={styles.chatHeader}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>+1 (555) 123-4567</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>via WhatsApp Business API</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="sm">Assign to Me</Button>
              <Button variant="ghost" size="icon"><MoreVertical size={18} /></Button>
            </div>
          </div>

          <div className={styles.messagesList}>
            <div style={{ alignSelf: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
              Today
            </div>
            
            <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '1rem', borderBottomLeftRadius: 0, boxShadow: 'var(--shadow-sm)' }}>
                Hi, I placed an order yesterday but I need to change the shipping address. Is it too late?
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginLeft: '0.5rem' }}>10:42 AM</div>
            </div>

            <div style={{ alignSelf: 'flex-end', maxWidth: '70%' }}>
              <div style={{ background: 'var(--primary-light)', color: 'var(--primary-hover)', padding: '0.75rem 1rem', borderRadius: '1rem', borderBottomRightRadius: 0 }}>
                Hello! I can help you check if the address can still be updated. Could you please provide your order number?
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginRight: '0.5rem', textAlign: 'right' }}>10:42 AM • AI Agent</div>
            </div>

            <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '1rem', borderBottomLeftRadius: 0, boxShadow: 'var(--shadow-sm)' }}>
                It's ORD-99238.
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginLeft: '0.5rem' }}>10:44 AM</div>
            </div>
            
            <div style={{ alignSelf: 'flex-end', maxWidth: '70%' }}>
              <div style={{ background: 'var(--primary-light)', color: 'var(--primary-hover)', padding: '0.75rem 1rem', borderRadius: '1rem', borderBottomRightRadius: 0 }}>
                Thank you. I see order ORD-99238 has not shipped yet. What is the new shipping address you'd like to use?
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginRight: '0.5rem', textAlign: 'right' }}>10:44 AM • AI Agent</div>
            </div>
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Input placeholder="Type a message or internal note..." style={{ margin: 0, flex: 1 }} />
              <Button variant="primary" size="icon"><Send size={18} /></Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Press Enter to send. Use / for macros.</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', color: 'var(--text-main)' }}>Reply</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', color: 'var(--text-muted)' }}>Internal Note</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Context */}
        <div className={styles.rightPanel}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              <User size={32} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>+1 (555) 123-4567</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer since 2026</span>
          </div>

          <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.75rem' }}>Tags</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', background: 'var(--primary-light)', color: 'var(--primary-hover)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Tag size={12} /> High Priority</span>
              <span style={{ fontSize: '0.7rem', background: 'var(--bg-main)', color: 'var(--text-main)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Tag size={12} /> Address Change</span>
            </div>
          </div>

          <div style={{ padding: '1rem 0' }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.75rem' }}>Recent Orders</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <FileText size={16} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>ORD-99238</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--warning)' }}>Processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
