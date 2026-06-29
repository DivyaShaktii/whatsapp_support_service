'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './calendar.module.css';
import { mockEvents, CalendarEvent } from './calendarMocks';
import EventDetailPanel from './components/EventDetailPanel';
import EventModal from './components/EventModal';

const EVENT_COLORS = {
  appointment: { color: '#0BA777', bg: 'rgba(11, 167, 119, 0.1)' },
  followup: { color: '#C9871E', bg: 'rgba(201, 135, 30, 0.1)' },
  delivery: { color: '#2F73A0', bg: 'rgba(47, 115, 160, 0.1)' },
  task: { color: '#5A63E8', bg: 'rgba(90, 99, 232, 0.1)' }
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [filters, setFilters] = useState({
    appointment: true,
    followup: true,
    delivery: true,
    task: true
  });
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const toggleFilter = (type: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getFilteredEvents = () => {
    return events.filter(e => filters[e.type]);
  };

  const filteredEvents = getFilteredEvents();

  const counts = {
    appointment: events.filter(e => e.type === 'appointment').length,
    followup: events.filter(e => e.type === 'followup').length,
    delivery: events.filter(e => e.type === 'delivery').length,
    task: events.filter(e => e.type === 'task').length,
  };

  const handleCreateOrUpdate = (event: CalendarEvent) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      setEvents([...events, event]);
    }
  };

  const handleUpdateStatus = (id: string, status: CalendarEvent['status']) => {
    setEvents(events.map(e => e.id === id ? { ...e, status } : e));
    if (selectedEvent?.id === id) {
      setSelectedEvent({ ...selectedEvent, status });
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Calendar</h1>
          <p className={styles.subtitle}>Appointments, deliveries, follow-ups and tasks — all in one place.</p>
        </div>
        <div className={styles.headerControls}>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.toggleBtn} ${view === 'month' ? styles.active : ''}`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button 
              className={`${styles.toggleBtn} ${view === 'week' ? styles.active : ''}`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={`${styles.toggleBtn} ${view === 'day' ? styles.active : ''}`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
          <button 
            className={styles.primaryButton}
            onClick={() => {
              setEditingEvent(null);
              setIsModalOpen(true);
            }}
          >
            <Plus size={16} />
            New Event
          </button>
        </div>
      </header>

      <div className={styles.filterBar}>
        <div 
          className={`${styles.filterPill} ${!filters.appointment ? styles.inactive : ''}`}
          onClick={() => toggleFilter('appointment')}
        >
          <div className={styles.dot} style={{ background: EVENT_COLORS.appointment.color }} />
          Appointments <span className={styles.count}>· {counts.appointment}</span>
        </div>
        <div 
          className={`${styles.filterPill} ${!filters.followup ? styles.inactive : ''}`}
          onClick={() => toggleFilter('followup')}
        >
          <div className={styles.dot} style={{ background: EVENT_COLORS.followup.color }} />
          Follow-ups <span className={styles.count}>· {counts.followup}</span>
        </div>
        <div 
          className={`${styles.filterPill} ${!filters.delivery ? styles.inactive : ''}`}
          onClick={() => toggleFilter('delivery')}
        >
          <div className={styles.dot} style={{ background: EVENT_COLORS.delivery.color }} />
          Deliveries <span className={styles.count}>· {counts.delivery}</span>
        </div>
        <div 
          className={`${styles.filterPill} ${!filters.task ? styles.inactive : ''}`}
          onClick={() => toggleFilter('task')}
        >
          <div className={styles.dot} style={{ background: EVENT_COLORS.task.color }} />
          Tasks <span className={styles.count}>· {counts.task}</span>
        </div>
      </div>

      {view === 'month' && <MonthView events={filteredEvents} onEventClick={setSelectedEvent} />}
      {view === 'week' && <WeekView events={filteredEvents} onEventClick={setSelectedEvent} />}
      {view === 'day' && <DayView events={filteredEvents} onEventClick={setSelectedEvent} />}

      <EventDetailPanel 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)}
        onEdit={(event) => {
          setEditingEvent(event);
          setIsModalOpen(true);
        }}
        onUpdateStatus={handleUpdateStatus}
      />

      {isModalOpen && (
        <EventModal 
          event={editingEvent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleCreateOrUpdate}
        />
      )}
    </div>
  );
}

function MonthView({ events, onEventClick }: { events: CalendarEvent[], onEventClick: (e: CalendarEvent) => void }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Static grid for July 2026 to match mock data dates
  // 1st is Wednesday
  const gridCells = [];
  let dayCounter = 1;

  for (let i = 0; i < 35; i++) {
    if (i < 2 || dayCounter > 31) {
      // past month or next month
      gridCells.push({ date: null, isPast: true });
    } else {
      const dateStr = `2026-07-${dayCounter.toString().padStart(2, '0')}`;
      const dayEvents = events.filter(e => (e.date === dateStr || e.deliveryDate === dateStr));
      const isToday = dayCounter === 5; // Highlight 5th as "Today" for visual test

      gridCells.push({
        date: dayCounter,
        dateStr,
        isPast: dayCounter < 5,
        isToday,
        events: dayEvents
      });
      dayCounter++;
    }
  }

  return (
    <>
      <div className={styles.monthNav}>
        <button className={styles.navArrow}>&larr;</button>
        <div className={styles.monthLabel}>July 2026</div>
        <button className={styles.navArrow}>&rarr;</button>
      </div>

      <div className={styles.calendarGrid}>
        {days.map(d => (
          <div key={d} className={styles.dayHeader}>{d}</div>
        ))}
        {gridCells.map((cell, idx) => (
          <div 
            key={idx} 
            className={`${styles.dayCell} ${cell.isPast ? styles.past : ''} ${cell.isToday ? styles.today : ''}`}
          >
            {cell.date && (
              <div className={styles.dateNumber}>{cell.date}</div>
            )}
            {cell.events?.slice(0, 3).map(event => (
              <div 
                key={event.id}
                className={styles.eventPill}
                style={{
                  background: EVENT_COLORS[event.type].bg,
                  color: EVENT_COLORS[event.type].color,
                  borderColor: EVENT_COLORS[event.type].color
                }}
                onClick={() => onEventClick(event)}
              >
                <div className={styles.dot} style={{ background: EVENT_COLORS[event.type].color, flexShrink: 0 }} />
                <span className={styles.title}>{event.title}</span>
              </div>
            ))}
            {cell.events && cell.events.length > 3 && (
              <div className={styles.moreEvents}>+{cell.events.length - 3} more</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function WeekView({ events, onEventClick }: { events: CalendarEvent[], onEventClick: (e: CalendarEvent) => void }) {
  const days = ['Mon 29', 'Tue 30', 'Wed 01', 'Thu 02', 'Fri 03', 'Sat 04', 'Sun 05'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 to 20

  return (
    <div className={styles.weekViewGrid}>
      <div className={styles.timeLabelCol}>
        <div className={styles.dayHeader} style={{ borderBottom: '1px solid var(--line-2)' }}>&nbsp;</div>
        {hours.map(h => (
          <div key={h} className={styles.timeLabel}>{`${h.toString().padStart(2, '0')}:00`}</div>
        ))}
      </div>
      
      {days.map((d, i) => (
        <div key={d} className={styles.weekDayCol}>
          <div className={styles.dayHeader} style={{ borderBottom: '1px solid var(--line-2)' }}>{d}</div>
          <div style={{ position: 'relative' }}>
            {hours.map(h => (
              <div key={h} className={styles.hourRow} />
            ))}
            
            {/* Render mock events vertically on Thu (i===3) and Fri (i===4) for visual testing */}
            {events.map((event, eIdx) => {
              if (i === 3 && event.time && parseInt(event.time.split(':')[0]) >= 8) {
                const hour = parseInt(event.time.split(':')[0]);
                const top = (hour - 8) * 44 + 4;
                return (
                  <div 
                    key={event.id}
                    className={styles.timeBlock}
                    style={{
                      top: `${top}px`,
                      background: EVENT_COLORS[event.type].bg,
                      borderColor: EVENT_COLORS[event.type].color,
                      color: EVENT_COLORS[event.type].color
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className={styles.timeBlockTitle}>{event.title}</div>
                    <div className={styles.timeBlockSubtitle}>{event.contact?.name || event.assignedTo}</div>
                  </div>
                );
              }
              return null;
            })}

            {i === 3 && <div className={styles.currentTimeLine} style={{ top: '150px' }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function DayView({ events, onEventClick }: { events: CalendarEvent[], onEventClick: (e: CalendarEvent) => void }) {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 to 20

  return (
    <div className={styles.dayViewGrid}>
      <div className={styles.dayHeader} style={{ borderBottom: '1px solid var(--line-2)', textAlign: 'left', padding: '16px 24px', fontSize: '1.25rem', color: 'var(--text-main)' }}>
        Thursday, July 2, 2026
      </div>
      
      <div style={{ position: 'relative' }}>
        {hours.map(h => (
          <div key={h} className={styles.dayHourRow}>
            <div className={styles.dayTimeLabel}>{`${h.toString().padStart(2, '0')}:00`}</div>
            <div className={styles.dayContent}>
              {/* Mock event rendering for Day View */}
              {events.filter(e => e.time && parseInt(e.time.split(':')[0]) === h).map(event => (
                <div 
                  key={event.id}
                  className={styles.timeBlock}
                  style={{
                    top: '4px',
                    bottom: '4px',
                    height: 'auto',
                    background: EVENT_COLORS[event.type].bg,
                    borderColor: EVENT_COLORS[event.type].color,
                    color: EVENT_COLORS[event.type].color,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '8px 16px'
                  }}
                  onClick={() => onEventClick(event)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.timeBlockTitle} style={{ fontSize: '13px' }}>{event.title}</div>
                    <div style={{ fontSize: '11px', background: 'var(--surface)', padding: '2px 8px', borderRadius: '4px', opacity: 0.8 }}>{event.status}</div>
                  </div>
                  <div className={styles.timeBlockSubtitle} style={{ fontSize: '12px', marginTop: '4px' }}>
                    {event.contact?.name || event.assignedTo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.currentTimeLine} style={{ top: '220px', left: '80px' }} />
      </div>
    </div>
  );
}
