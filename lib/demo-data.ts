export type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";
export type PaymentStatus = "Paid" | "Part paid" | "Unpaid";

export interface Booking {
  id: string;
  customer: string;
  event: string;
  arm: "Rentals" | "Planning" | "Venue";
  date: string;
  amount: number;
  paid: number;
  status: BookingStatus;
  payment: PaymentStatus;
  venue: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  total: number;
  reserved: number;
  damaged: number;
  missing: number;
  rate: number;
  sku: string;
}

export const bookings: Booking[] = [
  { id: "RNT-2401", customer: "Amara Okafor", event: "Amara & Chidi's wedding", arm: "Planning", date: "2026-10-17", amount: 2450000, paid: 1500000, status: "Confirmed", payment: "Part paid", venue: "The Courtyard" },
  { id: "RNT-2402", customer: "Tunde Bakare", event: "Bakare 50th birthday", arm: "Rentals", date: "2026-10-18", amount: 680000, paid: 680000, status: "Confirmed", payment: "Paid", venue: "—" },
  { id: "RNT-2403", customer: "Zainab Bello", event: "Zainab's bridal shower", arm: "Venue", date: "2026-10-20", amount: 420000, paid: 200000, status: "Pending", payment: "Part paid", venue: "The Nook" },
  { id: "RNT-2404", customer: "Chuka Eze", event: "Eze family reunion", arm: "Rentals", date: "2026-10-23", amount: 950000, paid: 0, status: "Pending", payment: "Unpaid", venue: "—" },
  { id: "RNT-2405", customer: "Ngozi Adebayo", event: "Adebayo traditional wedding", arm: "Planning", date: "2026-10-25", amount: 3750000, paid: 2500000, status: "Confirmed", payment: "Part paid", venue: "Grand Oak Hall" },
  { id: "RNT-2406", customer: "Femi Adeyemi", event: "Adeyemi product launch", arm: "Rentals", date: "2026-10-28", amount: 1280000, paid: 1280000, status: "Confirmed", payment: "Paid", venue: "—" },
  { id: "RNT-2407", customer: "Ifeoma Nwosu", event: "Ifeoma's baby shower", arm: "Venue", date: "2026-11-02", amount: 350000, paid: 100000, status: "Pending", payment: "Part paid", venue: "The Nook" },
  { id: "RNT-2408", customer: "Bola Williams", event: "Williams thanksgiving", arm: "Rentals", date: "2026-11-07", amount: 560000, paid: 560000, status: "Confirmed", payment: "Paid", venue: "—" },
  { id: "RNT-2409", customer: "Kelechi Obi", event: "Obi anniversary dinner", arm: "Planning", date: "2026-09-28", amount: 820000, paid: 820000, status: "Completed", payment: "Paid", venue: "The Courtyard" },
  { id: "RNT-2410", customer: "Dara Ojo", event: "Ojo naming ceremony", arm: "Rentals", date: "2026-09-21", amount: 390000, paid: 250000, status: "Completed", payment: "Part paid", venue: "—" },
  { id: "RNT-2411", customer: "Seyi Aluko", event: "Aluko engagement", arm: "Venue", date: "2026-11-14", amount: 480000, paid: 0, status: "Cancelled", payment: "Unpaid", venue: "Grand Oak Hall" },
  { id: "RNT-2412", customer: "Adaeze Obi", event: "Obi corporate dinner", arm: "Rentals", date: "2026-11-20", amount: 1120000, paid: 560000, status: "Confirmed", payment: "Part paid", venue: "—" }
];

export const inventory: InventoryItem[] = [
  { id: "INV-001", name: "Chiavari chair — gold", category: "Seating", total: 480, reserved: 156, damaged: 8, missing: 2, rate: 2500, sku: "CHR-GLD-01" },
  { id: "INV-002", name: "Round banquet table", category: "Tables", total: 65, reserved: 18, damaged: 2, missing: 0, rate: 12000, sku: "TBL-RND-08" },
  { id: "INV-003", name: "Clear ghost chair", category: "Seating", total: 220, reserved: 64, damaged: 5, missing: 1, rate: 3500, sku: "CHR-CLR-02" },
  { id: "INV-004", name: "10 × 20m canopy", category: "Shelter", total: 18, reserved: 12, damaged: 1, missing: 0, rate: 85000, sku: "CAN-1020-01" },
  { id: "INV-005", name: "PA sound system", category: "Audio", total: 8, reserved: 5, damaged: 0, missing: 0, rate: 95000, sku: "AUD-PA-04" },
  { id: "INV-006", name: "Wireless microphone", category: "Audio", total: 24, reserved: 8, damaged: 1, missing: 0, rate: 12000, sku: "AUD-MIC-02" },
  { id: "INV-007", name: "Velvet loveseat", category: "Lounge", total: 14, reserved: 7, damaged: 2, missing: 0, rate: 45000, sku: "LNG-VLV-01" },
  { id: "INV-008", name: "LED uplighter", category: "Lighting", total: 36, reserved: 22, damaged: 0, missing: 0, rate: 8000, sku: "LGT-LED-06" },
  { id: "INV-009", name: "White marquee tent", category: "Shelter", total: 6, reserved: 4, damaged: 0, missing: 0, rate: 180000, sku: "TNT-MRQ-01" },
  { id: "INV-010", name: "Table linen — ivory", category: "Decor", total: 120, reserved: 42, damaged: 6, missing: 1, rate: 4500, sku: "DEC-LIN-03" },
  { id: "INV-011", name: "Gold charger plate", category: "Tableware", total: 300, reserved: 78, damaged: 11, missing: 3, rate: 1200, sku: "TBL-CHR-12" },
  { id: "INV-012", name: "Dance floor panel", category: "Staging", total: 80, reserved: 48, damaged: 0, missing: 0, rate: 6000, sku: "STG-DFL-01" }
];

export const customers = [
  { name: "Amara Okafor", email: "amara.okafor@example.test", phone: "+234 803 555 0142", type: "Private", bookings: 4, value: 4850000 },
  { name: "Tunde Bakare", email: "t.bakare@example.test", phone: "+234 809 221 6840", type: "Private", bookings: 2, value: 1260000 },
  { name: "Zainab Bello", email: "zainab.b@example.test", phone: "+234 701 842 3001", type: "Private", bookings: 3, value: 1750000 },
  { name: "Chuka Eze", email: "chuka.eze@example.test", phone: "+234 806 000 7822", type: "Corporate", bookings: 5, value: 6200000 },
  { name: "Ngozi Adebayo", email: "ngozi.a@example.test", phone: "+234 812 510 9240", type: "Private", bookings: 2, value: 4200000 },
  { name: "Femi Adeyemi", email: "femi.a@example.test", phone: "+234 803 220 9181", type: "Corporate", bookings: 3, value: 3550000 },
  { name: "Ifeoma Nwosu", email: "ifeoma.n@example.test", phone: "+234 815 700 4412", type: "Private", bookings: 1, value: 350000 },
  { name: "Bola Williams", email: "bola.w@example.test", phone: "+234 802 430 1187", type: "Corporate", bookings: 3, value: 2180000 },
  { name: "Kelechi Obi", email: "kelechi.obi@example.test", phone: "+234 817 667 0920", type: "Private", bookings: 2, value: 1450000 }
];

export const venues = [
  { name: "The Courtyard", capacity: 80, price: 280000, status: "Available", amenities: "Garden · Bridal suite · Parking" },
  { name: "The Nook", capacity: 35, price: 160000, status: "Available", amenities: "Air-conditioned · Kitchenette · Sound" },
  { name: "Grand Oak Hall", capacity: 120, price: 450000, status: "Booked", amenities: "Stage · AV system · 60 parking spaces" },
  { name: "Palm House Studio", capacity: 24, price: 120000, status: "Maintenance", amenities: "Natural light · Private entrance · Lounge" }
];

export const staff = [
  { name: "Tola Akinyemi", role: "Operations manager", arm: "All operations", status: "Active" },
  { name: "Chidi Okafor", role: "Booking coordinator", arm: "Bookings", status: "Active" },
  { name: "Maryam Yusuf", role: "Inventory lead", arm: "Rentals", status: "Active" },
  { name: "Kunle James", role: "Delivery captain", arm: "Dispatch", status: "Active" },
  { name: "Ada Umeh", role: "Event planner", arm: "Planning", status: "Active" },
  { name: "Bisi Lawal", role: "Finance officer", arm: "Finance", status: "On leave" }
];

export const services = [
  { name: "Intimate celebration", category: "Planning", price: 450000, status: "Active" },
  { name: "Classic wedding styling", category: "Decoration", price: 1250000, status: "Active" },
  { name: "Full wedding coordination", category: "Planning", price: 1800000, status: "Active" },
  { name: "Garden party bundle", category: "Package", price: 680000, status: "Active" },
  { name: "Sound & lights essentials", category: "Rental", price: 290000, status: "Active" },
  { name: "The Nook — half day", category: "Venue", price: 160000, status: "Active" },
  { name: "The Courtyard — full day", category: "Venue", price: 280000, status: "Active" },
  { name: "Corporate event styling", category: "Decoration", price: 850000, status: "Inactive" }
];

export const payments = bookings.map((booking, index) => ({
  reference: `DEMO-PAY-${String(index + 1).padStart(3, "0")}`,
  booking: booking.id,
  customer: booking.customer,
  date: booking.date,
  amount: booking.paid,
  method: ["Bank transfer", "POS", "Bank transfer"][index % 3],
  status: booking.paid ? "Recorded (demo)" : "Awaiting payment"
}));

export const fmtMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

export const fmtDate = (date: string) =>
  new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(`${date}T12:00:00+01:00`));
