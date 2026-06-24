'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import styles from '../onboarding.module.css';
import { MessageCircle, Globe, Camera, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    FB: any;
  }
}

const CHANNELS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
  { id: 'website', name: 'Website Chat', icon: Globe, color: '#6366f1' },
  { id: 'instagram', name: 'Instagram', icon: Camera, color: '#E1306C' },
  { id: 'messenger', name: 'Messenger', icon: MessageSquare, color: '#0084FF' },
  { id: 'email', name: 'Email', icon: Mail, color: '#ea4335' },
  { id: 'voice', name: 'Voice Calls', icon: Phone, color: '#f59e0b' },
];

export default function ChannelsStep() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [waMode, setWaMode] = useState<'selection' | 'existing' | 'new' | 'success'>('selection');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleChannel = (id: string) => {
    if (id === 'whatsapp') {
      if (!selected.includes('whatsapp')) {
        setIsWhatsAppModalOpen(true);
        setWaMode('selection');
        setErrorMsg('');
      } else {
        setSelected(prev => prev.filter(c => c !== id));
      }
    } else {
      setSelected(prev => 
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
      );
    }
  };

  const handleMetaConnect = async (isNew: boolean) => {
    setErrorMsg('');
    setIsLoading(true);
    
    try {
      if (!window.FB) {
        throw new Error('Facebook SDK not loaded yet. Please try again.');
      }

      const configId = process.env.NEXT_PUBLIC_META_CONFIG_ID;
      
      // Launch Meta Embedded Signup
      window.FB.login(async (response: any) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          
          try {
            // Note: Since Meta SDK doesn't immediately return waba_id and phone_number_id in authResponse
            // when using config_id, the actual backend logic might need to exchange the token.
            // For now, we will send the token to the backend, and simulate the IDs.
            // In a real flow, you might use response.authResponse.code and exchange it.
            
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
            const res = await fetch(`${backendUrl}/api/whatsapp/connect`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                workspace_id: 1, // hardcoded for demo
                // Ideally, these IDs are extracted securely on the backend using the token
                waba_id: "waba_123456789", 
                phone_number_id: "phone_987654321",
                meta_business_id: "mbiz_55555",
                phone_number: isNew ? "NEW_NUMBER" : phoneNumber,
                display_name: isNew ? "Acme Support" : "Existing Business",
                access_token: accessToken
              })
            });
            
            if (res.ok) {
              setWaMode('success');
              setSelected(prev => [...prev, 'whatsapp']);
            } else {
              const errorData = await res.json();
              setErrorMsg(errorData.detail || "Verification failed on the server.");
            }
          } catch (e) {
            console.error(e);
            setErrorMsg('Failed to connect to the server.');
          } finally {
            setIsLoading(false);
          }

        } else {
          setErrorMsg('User cancelled login or did not fully authorize.');
          setIsLoading(false);
        }
      }, {
        config_id: configId,
        response_type: 'token',
        override_default_response_type: true,
        extras: {
          "setup": {},
          "featureType": "",
          "sessionInfoVersion": "2"
        }
      });
      
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || 'An error occurred while launching Meta login.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <Script 
        src="https://connect.facebook.net/en_US/sdk.js" 
        strategy="lazyOnload" 
        onLoad={() => { 
          if (window.FB) {
            window.FB.init({ 
              appId: process.env.NEXT_PUBLIC_META_APP_ID || '', 
              cookie: true, 
              xfbml: true, 
              version: 'v19.0' 
            }); 
          }
        }} 
      />
      <h1 className={styles.title}>Select Channels</h1>
      <p className={styles.subtitle}>Where should your AI assistant operate?</p>

      <div className={styles.channelGrid}>
        {CHANNELS.map(channel => {
          const isSelected = selected.includes(channel.id);
          const Icon = channel.icon;
          return (
            <div 
              key={channel.id} 
              className={`${styles.channelCard} ${isSelected ? styles.selected : ''}`}
              onClick={() => toggleChannel(channel.id)}
            >
              <div className={styles.iconWrapper} style={{ color: channel.color }}>
                <Icon size={32} />
              </div>
              <span style={{ fontWeight: 500 }}>{channel.name}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <Link href="/onboarding/workspace">
          <Button type="button" variant="ghost">Back</Button>
        </Link>
        <Link href="/onboarding/knowledge">
          <Button type="button" variant="primary" disabled={selected.length === 0}>
            Continue
          </Button>
        </Link>
      </div>

      <Modal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
        title="Connect WhatsApp Business"
      >
        {errorMsg && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        {waMode === 'selection' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              How would you like to connect your WhatsApp Business account?
            </p>
            <Button variant="outline" onClick={() => setWaMode('existing')} style={{ justifyContent: 'flex-start', padding: '1rem' }}>
              Add Existing WhatsApp Business Number
            </Button>
            <Button variant="outline" onClick={() => setWaMode('new')} style={{ justifyContent: 'flex-start', padding: '1rem' }}>
              Register a New Business Number
            </Button>
          </div>
        )}

        {waMode === 'existing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              Enter your existing WhatsApp Business number. We will redirect you to Meta to verify ownership and grant permissions.
            </p>
            <Input 
              label="Phone Number" 
              placeholder="+91 9876543210" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="ghost" onClick={() => setWaMode('selection')}>Back</Button>
              <Button variant="primary" onClick={() => handleMetaConnect(false)} isLoading={isLoading} disabled={!phoneNumber}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {waMode === 'new' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              We'll launch the Meta Embedded Signup flow to help you register a new WhatsApp Business number.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="ghost" onClick={() => setWaMode('selection')}>Back</Button>
              <Button variant="primary" onClick={() => handleMetaConnect(true)} isLoading={isLoading}>
                Start Setup
              </Button>
            </div>
          </div>
        )}

        {waMode === 'success' && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>WhatsApp Connected!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Your WhatsApp Business number has been successfully verified and linked via Meta.
            </p>
            <Button variant="primary" onClick={() => setIsWhatsAppModalOpen(false)}>Done</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
