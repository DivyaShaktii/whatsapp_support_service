import React from 'react';
import { X, Calendar as CalendarIcon, Clock, User, CheckCircle2, XCircle, FileText, Info } from 'lucide-react';
import { CalendarEvent } from '../calendarMocks';

interface EventDetailPanelProps {
  event: CalendarEvent | null;
  onClose: () => void;
  onEdit: (event: CalendarEvent) => void;
  onUpdateStatus: (id: string, status: CalendarEvent['status']) => void;
}

const EVENT_COLORS = {
  appointment: { color: '#0BA777', label: 'Appointment' },
  followup: { color: '#C9871E', label: 'Follow-up' },
  delivery: { color: '#2F73A0', label: 'Delivery' },
  task: { color: '#5A63E8', label: 'Task' }
};

const STATUS_COLORS = {
  scheduled: { bg: '#FBF1DC', color: '#C9871E' },
  'in progress': { bg: '#E6F0F6', color: '#2F73A0' },
  completed: { bg: '#E4F6EF', color: '#0A6E50' },
  cancelled: { bg: '#F2F6F5', color: '#6B7B82' },
  dispatched: { bg: '#E6F0F6', color: '#2F73A0' },
  'out for delivery': { bg: '#FBF1DC', color: '#C9871E' },
  delivered: { bg: '#E4F6EF', color: '#0A6E50' },
  failed: { bg: '#FBE6EC', color: '#D9466A' }
};

export default function EventDetailPanel({ event, onClose, onEdit, onUpdateStatus }: EventDetailPanelProps) {
  if (!event) return null;

  const typeConfig = EVENT_COLORS[event.type];
  const statusConfig = STATUS_COLORS[event.status] || STATUS_COLORS.scheduled;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: 'transparent',
          zIndex: 40
        }}
        onClick={onClose}
      />
      
      <div 
        className="glass-panel"
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100vh',
          width: '380px',
          borderLeft: '1px solid var(--line-2)',
          boxShadow: '-12px 0 40px -10px rgba(14,27,34,0.18)',
          zIndex: 50,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 0.22s ease-out forwards',
          background: 'var(--surface)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div 
            style={{ 
              background: `${typeConfig.color}20`, 
              color: typeConfig.color,
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              display: 'inline-block'
            }}
          >
            {typeConfig.label}
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 24px 0', color: 'var(--text-main)', lineHeight: 1.3 }}>
          {event.title}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CalendarIcon size={18} style={{ color: 'var(--muted)', marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                {event.date || event.deliveryDate}
              </div>
              {event.time && <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{event.time}</div>}
            </div>
          </div>

          {(event.contact || event.assignedTo) && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <User size={18} style={{ color: 'var(--muted)', marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                  {event.contact ? event.contact.name : event.assignedTo}
                </div>
                {event.contact && <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{event.contact.phone}</div>}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Info size={18} style={{ color: 'var(--muted)' }} />
            <div 
              style={{
                background: statusConfig.bg,
                color: statusConfig.color,
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'capitalize'
              }}
            >
              {event.status}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Bot size={18} style={{ color: 'var(--muted)' }} />
            <div 
              style={{
                background: event.source === 'agent' ? '#ECEDFC' : '#EEF2F1',
                color: event.source === 'agent' ? '#3A41B8' : 'var(--muted)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              {event.source === 'agent' ? 'Created by AI Agent' : 'Created Manually'}
            </div>
          </div>

          {event.notes && (
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--line-2)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <FileText size={18} style={{ color: 'var(--muted)', marginTop: '2px' }} />
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {event.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
          <button 
            style={{
              background: 'transparent',
              border: '1px solid var(--line-2)',
              color: 'var(--text-main)',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
            onClick={() => {
              onClose();
              onEdit(event);
            }}
          >
            Edit Details
          </button>
          
          {event.status !== 'completed' && event.status !== 'cancelled' && event.status !== 'delivered' && (
            <button 
              style={{
                background: '#E4F6EF',
                border: '1px solid #BCE7D7',
                color: '#0A6E50',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onClick={() => {
                const finalStatus = event.type === 'delivery' ? 'delivered' : 'completed';
                onUpdateStatus(event.id, finalStatus);
              }}
            >
              <CheckCircle2 size={16} />
              Mark {event.type === 'delivery' ? 'Delivered' : 'Complete'}
            </button>
          )}

          {event.status !== 'cancelled' && event.status !== 'failed' && (
             <button 
             style={{
               background: 'transparent',
               border: 'none',
               color: 'var(--danger, #D9466A)',
               padding: '10px',
               fontWeight: 600,
               fontSize: '13px',
               cursor: 'pointer',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '8px'
             }}
             onClick={() => {
               if(window.confirm('Are you sure you want to cancel this event?')) {
                 const finalStatus = event.type === 'delivery' ? 'failed' : 'cancelled';
                 onUpdateStatus(event.id, finalStatus);
               }
             }}
           >
             <XCircle size={16} />
             Cancel Event
           </button>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}} />
    </>
  );
}
