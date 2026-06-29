export interface Contact {
  name: string;
  phone: string;
}

export interface CalendarEvent {
  id: string;
  type: 'appointment' | 'followup' | 'delivery' | 'task';
  title: string;
  date: string;
  time?: string;
  dispatchDate?: string;
  deliveryDate?: string;
  contact?: Contact;
  assignedTo?: string;
  status: 'scheduled' | 'dispatched' | 'out for delivery' | 'delivered' | 'failed' | 'in progress' | 'completed' | 'cancelled';
  source: 'agent' | 'manual';
  notes?: string;
}

export const mockEvents: CalendarEvent[] = [
  {
    id: "evt-001",
    type: "appointment",
    title: "Site visit — Tower B, Unit 402",
    date: "2026-07-03",
    time: "10:00",
    contact: { name: "Arjun Mehta", phone: "+91 98000 11111" },
    status: "scheduled",
    source: "agent",
    notes: "Interested in 2BHK. Budget ~₹85L. Pre-qualified."
  },
  {
    id: "evt-002",
    type: "followup",
    title: "Follow up on pricing query",
    date: "2026-07-04",
    time: "14:00",
    contact: { name: "Priya Nair", phone: "+91 98000 22222" },
    status: "scheduled",
    source: "manual",
    notes: "Asked about floor 8 pricing. Needs a callback."
  },
  {
    id: "evt-003",
    type: "delivery",
    title: "Order #ORD-2291 — 12 MG Road",
    date: "2026-07-05",
    dispatchDate: "2026-07-04",
    deliveryDate: "2026-07-05",
    status: "dispatched",
    source: "agent",
    notes: ""
  },
  {
    id: "evt-004",
    type: "task",
    title: "Send revised proposal to Meera",
    date: "2026-07-07",
    time: "09:00",
    assignedTo: "Ravi Kumar",
    status: "scheduled",
    source: "manual",
    notes: "Include updated floor plan PDFs."
  },
  {
    id: "evt-005",
    type: "appointment",
    title: "Site visit — Garden Block, Unit 101",
    date: "2026-07-08",
    time: "11:30",
    contact: { name: "Sana Shaikh", phone: "+91 98000 33333" },
    status: "completed",
    source: "agent",
    notes: "Visited. Interested. Wants to meet again next week."
  }
];

export const mockContacts = [
  { name: "Arjun Mehta", phone: "+91 98000 11111" },
  { name: "Priya Nair", phone: "+91 98000 22222" },
  { name: "Sana Shaikh", phone: "+91 98000 33333" },
  { name: "Rahul Sharma", phone: "+91 98000 44444" },
  { name: "Amit Verma", phone: "+91 98000 55555" }
];

export const mockTeamMembers = [
  "Ravi Kumar",
  "Neha Gupta",
  "Raj Singh"
];

// Stub API functions
export const createEvent = async (eventData: Partial<CalendarEvent>): Promise<CalendarEvent> => {
  console.log("STUB: createEvent called", eventData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...eventData, id: "evt-" + Date.now(), source: "manual" } as CalendarEvent);
    }, 500);
  });
};

export const updateEvent = async (id: string, updates: Partial<CalendarEvent>): Promise<Partial<CalendarEvent>> => {
  console.log("STUB: updateEvent called", id, updates);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, ...updates });
    }, 500);
  });
};

export const updateEventStatus = async (id: string, status: CalendarEvent['status']): Promise<{ id: string; status: CalendarEvent['status'] }> => {
  console.log("STUB: updateEventStatus called", id, status);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, status });
    }, 500);
  });
};
