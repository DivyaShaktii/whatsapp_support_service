import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Package, Phone, CheckSquare } from 'lucide-react';
import { CalendarEvent, mockContacts, mockTeamMembers, createEvent, updateEvent } from '../calendarMocks';

interface EventModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
}

const TYPE_CONFIG = [
  { id: 'appointment', label: 'Appointment', icon: CalendarIcon, color: '#0BA777' },
  { id: 'followup', label: 'Follow-up', icon: Phone, color: '#C9871E' },
  { id: 'delivery', label: 'Delivery', icon: Package, color: '#2F73A0' },
  { id: 'task', label: 'Task', icon: CheckSquare, color: '#5A63E8' }
];

export default function EventModal({ event, onClose, onSave }: EventModalProps) {
  const isEdit = !!event;
  const [loading, setLoading] = useState(false);
  
  const [type, setType] = useState<CalendarEvent['type']>(event?.type || 'appointment');
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date || '');
  const [time, setTime] = useState(event?.time || '');
  const [dispatchDate, setDispatchDate] = useState(event?.dispatchDate || '');
  const [deliveryDate, setDeliveryDate] = useState(event?.deliveryDate || '');
  const [contactName, setContactName] = useState(event?.contact?.name || '');
  const [assignedTo, setAssignedTo] = useState(event?.assignedTo || '');
  const [status, setStatus] = useState<CalendarEvent['status']>(event?.status || 'scheduled');
  const [notes, setNotes] = useState(event?.notes || '');

  // Reset conditional fields when type changes
  useEffect(() => {
    if (!isEdit) {
      if (type === 'delivery') {
        setStatus('dispatched');
      } else {
        setStatus('scheduled');
      }
    }
  }, [type, isEdit]);

  const isValid = () => {
    if (!title.trim()) return false;
    if (type === 'delivery') {
      if (!dispatchDate || !deliveryDate) return false;
    } else {
      if (!date || !time) return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) return;
    setLoading(true);
    
    let baseEvent: Partial<CalendarEvent> = {
      type,
      title,
      status,
      notes,
      source: isEdit ? event.source : 'manual'
    };

    if (type === 'delivery') {
      baseEvent = { ...baseEvent, dispatchDate, deliveryDate };
    } else {
      baseEvent = { ...baseEvent, date, time };
    }

    if (type === 'appointment' || type === 'followup') {
      const contactObj = mockContacts.find(c => c.name === contactName) || { name: contactName, phone: 'Unknown' };
      baseEvent = { ...baseEvent, contact: contactObj };
    } else if (type === 'task') {
      baseEvent = { ...baseEvent, assignedTo };
    }

    try {
      if (isEdit) {
        const updated = await updateEvent(event.id, baseEvent);
        onSave(updated as CalendarEvent);
      } else {
        const created = await createEvent(baseEvent);
        onSave(created);
      }
      onClose();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(14,27,34,0.45)',
      backdropFilter: 'blur(4px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="glass-panel"
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--line-2)',
          boxShadow: '0 24px 60px -16px rgba(14,27,34,0.36)',
          maxWidth: '520px',
          width: '100%',
          padding: '28px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            {isEdit ? 'Edit Event' : 'New Event'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Field 1: Type Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              Event Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {TYPE_CONFIG.map(config => {
                const isSelected = type === config.id;
                const Icon = config.icon;
                return (
                  <div 
                    key={config.id}
                    onClick={() => setType(config.id as any)}
                    style={{
                      border: `1.5px solid ${isSelected ? config.color : 'var(--line-2)'}`,
                      borderRadius: '10px',
                      padding: '14px',
                      cursor: 'pointer',
                      background: isSelected ? `${config.color}15` : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={20} style={{ color: isSelected ? config.color : 'var(--muted)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? config.color : 'var(--text-main)' }}>
                      {config.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Field 2: Title */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              Title
            </label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={
                type === 'appointment' ? "e.g. Site visit — Tower B unit 402" :
                type === 'followup' ? "e.g. Follow up with Rahul about pricing" :
                type === 'delivery' ? "e.g. Order #ORD-2291 — 42 Elm Street" :
                "e.g. Send proposal to Meera"
              }
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--line-2)',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Field 3: Date & Time */}
          {type === 'delivery' ? (
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Dispatch Date
                </label>
                <input 
                  type="date" 
                  value={dispatchDate}
                  onChange={e => setDispatchDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Expected Delivery
                </label>
                <input 
                  type="date" 
                  value={deliveryDate}
                  onChange={e => setDeliveryDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Date
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Time
                </label>
                <input 
                  type="time" 
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
                />
              </div>
            </div>
          )}

          {/* Field 4/5: Contact or Assigned To */}
          {(type === 'appointment' || type === 'followup') && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                Contact / Lead
              </label>
              <select 
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
              >
                <option value="">Search contacts...</option>
                {mockContacts.map(c => <option key={c.name} value={c.name}>{c.name} ({c.phone})</option>)}
              </select>
            </div>
          )}
          
          {type === 'task' && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                Assigned To
              </label>
              <select 
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
              >
                <option value="">Select team member...</option>
                {mockTeamMembers.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          )}

          {/* Field 6: Status (for Delivery) */}
          {type === 'delivery' && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                Status
              </label>
              <select 
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
              >
                <option value="dispatched">Dispatched</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          )}

          {/* Field 7: Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              Notes (optional)
            </label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add any notes or context..."
              rows={3}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'var(--bg-main)', color: 'var(--text-main)', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          {/* Field 8: Source */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <div style={{ 
              background: isEdit && event.source === 'agent' ? '#ECEDFC' : '#EEF2F1',
              color: isEdit && event.source === 'agent' ? '#3A41B8' : 'var(--muted)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600
            }}>
              {isEdit && event.source === 'agent' ? 'Originally created by AI Agent' : 'Created manually'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--line-2)',
              borderRadius: '8px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={!isValid() || loading}
            style={{
              background: 'var(--brand, #0BA777)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: isValid() && !loading ? 'pointer' : 'not-allowed',
              opacity: isValid() && !loading ? 1 : 0.45
            }}
          >
            {loading ? 'Saving...' : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  );
}
