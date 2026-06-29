'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import styles from '../onboarding.module.css';
import { MessageCircle, Globe, Camera, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

const CHANNELS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
  { id: 'website', name: 'Website Chat', icon: Globe, color: '#6366f1' },
  { id: 'instagram', name: 'Instagram', icon: Camera, color: '#E1306C' },
  { id: 'messenger', name: 'Messenger', icon: MessageSquare, color: '#0084FF' },
  { id: 'email', name: 'Email', icon: Mail, color: '#ea4335' },
  { id: 'voice', name: 'Voice Calls', icon: Phone, color: '#f59e0b' },
];

// Only the backend URL is needed on the frontend. The Zernio API key stays on the backend.
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function ChannelsStep() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [waMode, setWaMode] = useState<'selection' | 'existing' | 'new' | 'success'>('selection');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const popupRef = useRef<Window | null>(null);

  // Clean up any running poll if the component unmounts
  //useEffect(() => () => stopPolling(), []);

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
      setSelected(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]));
    }
  };

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  // Poll the backend until this profile's WhatsApp account is connected.
  const pollUntilConnected = (profileId: string) => {
    const startedAt = Date.now();
    stopPolling();
    pollRef.current = setInterval(async () => {
      // User closed the popup themselves
      if (popupRef.current && popupRef.current.closed) {
        stopPolling();
        setIsLoading(false);
        return;
      }
      // Give up after 5 minutes
      if (Date.now() - startedAt > 5 * 60 * 1000) {
        stopPolling();
        popupRef.current?.close();
        setIsLoading(false);
        setErrorMsg('Timed out waiting for WhatsApp. Please try again.');
        return;
      }
      try {
        const r = await fetch(`${BACKEND_URL}/api/channels/whatsapp/accounts/${profileId}`);
        if (!r.ok) return; // still pending / not stored yet
        const data = await r.json();
        if (data.status === 'connected') {
          stopPolling();
          popupRef.current?.close();
          setWaMode('success');
          setSelected(prev => (prev.includes('whatsapp') ? prev : [...prev, 'whatsapp']));
          setIsLoading(false);
        } else if (data.status === 'failed') {
          stopPolling();
          popupRef.current?.close();
          setIsLoading(false);
          setErrorMsg('WhatsApp connection failed. Please try again.');
        }
      } catch {
        // transient network error — keep polling
      }
    }, 2000);
  };

  // Ask the backend for a Meta Embedded Signup URL (via Zernio) and open it in a popup.
  const startZernioConnect = async (label: string) => {
    setErrorMsg('');
    setIsLoading(true);

    // Open the popup synchronously inside the click handler to avoid popup blockers.
    popupRef.current = window.open('about:blank', 'zernio_whatsapp', 'width=600,height=720');
    if (!popupRef.current) {
      setIsLoading(false);
      setErrorMsg('Please allow popups for this site to connect WhatsApp.');
      return;
    }

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/channels/whatsapp/connect/new?label=${encodeURIComponent(label)}`,
        { method: 'POST' }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        popupRef.current?.close();
        setIsLoading(false);
        setErrorMsg(err.detail || 'Could not start WhatsApp connection.');
        return;
      }

      const { authUrl, profileId } = await res.json();
      // Send the already-open popup to Meta's Embedded Signup (hosted via Zernio).
      popupRef.current!.location.href = authUrl;
      pollUntilConnected(profileId);
    } catch (e) {
      popupRef.current?.close();
      setIsLoading(false);
      setErrorMsg('Failed to reach the server.');
    }
  };

  const closeModal = () => {
    stopPolling();
    setIsWhatsAppModalOpen(false);
  };

  return (
    <div className={styles.contentWrapper}>
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
        <Link href="/dashboard">
          <Button type="button" variant="primary" disabled={selected.length === 0}>
            Continue
          </Button>
        </Link>
      </div>

      <Modal isOpen={isWhatsAppModalOpen} onClose={closeModal} title="Connect WhatsApp Business">
        {errorMsg && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        {waMode === 'selection' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              How would you like to connect your WhatsApp Business account? You&apos;ll finish either
              choice inside Meta&apos;s secure signup window.
            </p>
            <Button variant="outline" onClick={() => { setErrorMsg(''); setWaMode('existing'); }} style={{ justifyContent: 'flex-start', padding: '1rem' }}>
              Add Existing WhatsApp Business Number
            </Button>
            <Button variant="outline" onClick={() => { setErrorMsg(''); setWaMode('new'); }} style={{ justifyContent: 'flex-start', padding: '1rem' }}>
              Register a New Business Number
            </Button>
            <Button variant="outline" onClick={() => { 
                setSelected(prev => (prev.includes('whatsapp') ? prev : [...prev, 'whatsapp']));
                setWaMode('success');
            }} style={{ justifyContent: 'flex-start', padding: '1rem', borderStyle: 'dashed', borderColor: '#f59e0b', color: '#f59e0b' }}>
              [DEV] Bypass Verification
            </Button>
          </div>
        )}

        {waMode === 'existing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              We&apos;ll open Meta&apos;s signup window where you connect your existing WhatsApp
              Business account and grant permissions. The number below is just a label for your dashboard.
            </p>
            <Input
              label="Phone Number (optional label)"
              placeholder="+91 9876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="ghost" onClick={() => setWaMode('selection')}>Back</Button>
              <Button
                variant="primary"
                onClick={() => startZernioConnect(phoneNumber || 'Existing WhatsApp')}
                isLoading={isLoading}
              >
                Continue to Meta
              </Button>
            </div>
          </div>
        )}

        {waMode === 'new' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              We&apos;ll open Meta&apos;s Embedded Signup window so you can register a new WhatsApp
              Business number and grant permissions.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="ghost" onClick={() => setWaMode('selection')}>Back</Button>
              <Button
                variant="primary"
                onClick={() => startZernioConnect('New WhatsApp number')}
                isLoading={isLoading}
              >
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
              Your WhatsApp Business account has been verified and linked via Meta.
            </p>
            <Button variant="primary" onClick={closeModal}>Done</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
