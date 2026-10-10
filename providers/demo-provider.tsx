"use client";

import { createContext, FormEvent, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  Booking, bookings as seedBookings, customers as seedCustomers, fmtDate, inventory as seedInventory,
  InventoryItem, payments as seedPayments, services as seedServices, staff, venues
} from "@/lib/demo-data";
import { demoApi } from "@/lib/demo-api";

type DialogKind = "booking" | "item" | "payment" | "details" | null;
type Customer = typeof seedCustomers[number];
type Service = typeof seedServices[number];
type Payment = typeof seedPayments[number];

interface DemoContextValue {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  payments: Payment[];
  selectedBooking: Booking | null;
  notice: string;
  dialog: DialogKind;
  toast: (message: string) => void;
  openBooking: (arm?: Booking["arm"], venue?: string, amount?: number, event?: string) => void;
  openItem: (type?: "inventory" | "customer" | "service") => void;
  openPayment: () => void;
  openDetails: (booking: Booking) => void;
  closeDialog: () => void;
  addBooking: (booking: Omit<Booking, "id" | "paid" | "status" | "payment">) => void;
  addItem: (name: string, amount: number) => void;
  addPayment: (bookingId: string, amount: number) => boolean;
  cancelBooking: (id: string) => void;
  approveBooking: (id: string) => void;
  resetDemo: () => void;
  dialogItemType: "inventory" | "customer" | "service";
  staff: typeof staff;
  venues: typeof venues;
  bookingDefaults: { arm: Booking["arm"]; venue: string; amount: number; event: string };
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState(seedBookings);
  const [inventory, setInventory] = useState(seedInventory);
  const [customers, setCustomers] = useState(seedCustomers);
  const [services, setServices] = useState(seedServices);
  const [payments, setPayments] = useState(seedPayments);
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [dialogItemType, setDialogItemType] = useState<"inventory" | "customer" | "service">("inventory");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    Promise.all([demoApi.get<Booking[]>("/bookings"), demoApi.get<InventoryItem[]>("/inventory")])
      .then(([bookingResponse, inventoryResponse]) => {
        setBookings(bookingResponse.data);
        setInventory(inventoryResponse.data);
      })
      .catch(() => setNotice("Could not load the local demo dataset."));
  }, []);

  function toast(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function openBooking(arm: Booking["arm"] = "Rentals", venue = "", amount = 0, event = "") {
    setBookingDefaults({ arm, venue, amount, event });
    setDialog("booking");
  }

  const [bookingDefaults, setBookingDefaults] = useState<{ arm: Booking["arm"]; venue: string; amount: number; event: string }>({ arm: "Rentals", venue: "", amount: 0, event: "" });

  function openItem(type: "inventory" | "customer" | "service" = "inventory") {
    setDialogItemType(type);
    setDialog("item");
  }

  function openDetails(booking: Booking) {
    setSelectedBooking(booking);
    setDialog("details");
  }

  function closeDialog() {
    setDialog(null);
    setSelectedBooking(null);
  }

  function addBooking(input: Omit<Booking, "id" | "paid" | "status" | "payment">) {
    setBookings((current) => [{
      ...input,
      id: `RNT-${2420 + current.length}`,
      paid: 0,
      status: "Pending",
      payment: "Unpaid"
    }, ...current]);
    closeDialog();
    toast("Demo booking added locally.");
  }

  function addItem(name: string, amount: number) {
    if (dialogItemType === "customer") {
      setCustomers((current) => [...current, {
        name, email: "new.customer@example.test", phone: "+234 000 000 0000",
        type: "Private", bookings: 0, value: 0
      }]);
      toast("Demo customer added locally.");
    } else if (dialogItemType === "service") {
      setServices((current) => [...current, { name, category: "Package", price: amount, status: "Active" }]);
      toast("Demo service added locally.");
    } else {
      setInventory((current) => [...current, {
        id: `INV-${String(current.length + 1).padStart(3, "0")}`, name, category: "New item",
        total: 1, reserved: 0, damaged: 0, missing: 0, rate: amount, sku: `DEMO-${current.length + 1}`
      }]);
      toast("Demo inventory item added locally.");
    }
    closeDialog();
  }

  function addPayment(bookingId: string, amount: number) {
    const booking = bookings.find((item) => item.id === bookingId);
    if (!booking || amount <= 0 || amount > booking.amount - booking.paid) {
      toast("Enter a valid amount no greater than the remaining demo balance.");
      return false;
    }
    const paid = booking.paid + amount;
    setBookings((current) => current.map((item) => item.id === bookingId
      ? { ...item, paid, payment: paid === item.amount ? "Paid" : "Part paid" }
      : item));
    setPayments((current) => [{
      reference: `DEMO-PAY-${String(current.length + 1).padStart(3, "0")}`,
      booking: booking.id, customer: booking.customer,
      date: new Intl.DateTimeFormat("sv-SE", { timeZone: "Africa/Lagos" }).format(new Date()),
      amount, method: "Bank transfer", status: "Recorded (demo)"
    }, ...current]);
    closeDialog();
    toast("Illustrative payment recorded locally; no money was transferred.");
    return true;
  }

  function cancelBooking(id: string) {
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status: "Cancelled" } : booking));
    closeDialog();
    toast("Demo booking cancelled locally.");
  }

  function approveBooking(id: string) {
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status: "Confirmed" } : booking));
    setSelectedBooking((current) => current?.id === id ? { ...current, status: "Confirmed" } : current);
    toast("Demo booking marked confirmed.");
  }

  function resetDemo() {
    setBookings(seedBookings);
    setInventory(seedInventory);
    setCustomers(seedCustomers);
    setServices(seedServices);
    setPayments(seedPayments);
    toast("Demo data reset to seed values.");
  }

  const value = useMemo<DemoContextValue>(() => ({
    bookings, setBookings, inventory, setInventory, customers, setCustomers, services, setServices,
    payments, selectedBooking, notice, dialog, toast, openBooking, openItem, openPayment: () => setDialog("payment"),
    openDetails, closeDialog, addBooking, addItem, addPayment, cancelBooking, approveBooking, resetDemo,
    dialogItemType, staff, venues, bookingDefaults
  }), [bookings, inventory, customers, services, payments, selectedBooking, notice, dialog, dialogItemType, bookingDefaults]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider.");
  return context;
}

function BookingDialog() {
  const { addBooking, bookingDefaults, closeDialog, venues } = useDemo();
  const [name, setName] = useState("");
  const [eventName, setEventName] = useState(bookingDefaults.event);
  const [amount, setAmount] = useState(bookingDefaults.amount ? String(bookingDefaults.amount) : "");
  const [date, setDate] = useState("2026-11-28");
  const [arm, setArm] = useState<Booking["arm"]>(bookingDefaults.arm);
  const [venue, setVenue] = useState(bookingDefaults.venue);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !eventName.trim() || Number(amount) <= 0) return;
    addBooking({ customer: name, event: eventName, amount: Number(amount), date, arm, venue: venue || "—" });
  }

  return <form className="modal-form" onSubmit={submit}>
    <p className="inline-alert">This creates a local demo record only. No real reservation will be made.</p>
    <label className="form-label">Customer name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Amina Yusuf" /></label>
    <label className="form-label">Event name<input required value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="e.g. Amina's engagement" /></label>
    <div className="form-grid"><label className="form-label">Business arm<select value={arm} onChange={(e) => setArm(e.target.value as Booking["arm"])}><option>Rentals</option><option>Planning</option><option>Venue</option></select></label>
      <label className="form-label">Venue<select value={venue} onChange={(e) => setVenue(e.target.value)}><option value="">No venue selected</option>{venues.map((item) => <option key={item.name}>{item.name}</option>)}</select></label></div>
    <div className="form-grid"><label className="form-label">Event date<input required type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
      <label className="form-label">Booking value (₦)<input required type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="450000" /></label></div>
    <div className="modal-actions"><button className="button" type="button" onClick={closeDialog}>Cancel</button><button className="button primary" type="submit">Save demo booking</button></div>
  </form>;
}

function ItemDialog() {
  const { addItem, closeDialog, dialogItemType } = useDemo();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const label = dialogItemType === "customer" ? "customer" : dialogItemType === "service" ? "service" : "inventory item";
  return <form className="modal-form" onSubmit={(event) => { event.preventDefault(); if (name.trim()) addItem(name, Number(amount) || 0); }}>
    <p className="inline-alert">New records are kept only in local page state.</p>
    <label className="form-label">{dialogItemType === "customer" ? "Customer name" : "Name"}<input required value={name} onChange={(event) => setName(event.target.value)} placeholder={dialogItemType === "customer" ? "e.g. Amina Yusuf" : "Name"} /></label>
    {dialogItemType !== "customer" && <label className="form-label">Rate (₦)<input type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="25000" /></label>}
    <div className="modal-actions"><button className="button" type="button" onClick={closeDialog}>Cancel</button><button className="button primary" type="submit">Add demo {label}</button></div>
  </form>;
}

function PaymentDialog() {
  const { addPayment, bookings, closeDialog } = useDemo();
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");
  return <form className="modal-form" onSubmit={(event) => { event.preventDefault(); if (addPayment(bookingId, Number(amount))) { setBookingId(""); setAmount(""); } }}>
    <p className="inline-alert">This is a visual demo only. No payment gateway or real transfer is involved.</p>
    <label className="form-label">Booking<select required value={bookingId} onChange={(event) => setBookingId(event.target.value)}><option value="">Select a booking</option>{bookings.filter((booking) => booking.amount > booking.paid && booking.status !== "Cancelled").map((booking) => <option key={booking.id} value={booking.id}>{booking.id} — {booking.customer}</option>)}</select></label>
    <label className="form-label">Amount (₦)<input required type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="100000" /></label>
    <div className="modal-actions"><button className="button" type="button" onClick={closeDialog}>Cancel</button><button className="button primary" type="submit">Record locally</button></div>
  </form>;
}

function BookingDetails() {
  const { approveBooking, cancelBooking, closeDialog, selectedBooking } = useDemo();
  if (!selectedBooking) return null;
  const booking = selectedBooking;
  return <div className="detail-modal"><div className="detail-ref">{booking.id} <span className={`badge ${booking.status === "Confirmed" ? "green" : "amber"}`}>{booking.status}</span></div>
    <div className="detail-grid"><div><small>Customer</small><b>{booking.customer}</b></div><div><small>Event date</small><b>{fmtDate(booking.date)}</b></div><div><small>Business arm</small><b>{booking.arm}</b></div><div><small>Venue</small><b>{booking.venue}</b></div><div><small>Booking value</small><b>{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(booking.amount)}</b></div><div><small>Paid (demo)</small><b>{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(booking.paid)}</b></div></div>
    <div className="progress-caption"><span>Payment progress</span><b>{Math.round(booking.paid / booking.amount * 100)}%</b></div><div className="progress-line"><i style={{ width: `${booking.paid / booking.amount * 100}%` }} /></div><div className="inline-alert">All booking details shown are illustrative demo data.</div>
    <div className="modal-actions">{booking.status === "Pending" && <button className="button primary" onClick={() => approveBooking(booking.id)}>Approve booking</button>}<button className="button" onClick={() => cancelBooking(booking.id)}>Cancel booking</button><button className="button" onClick={closeDialog}>Close</button></div>
  </div>;
}

export function DemoDialogs() {
  const { closeDialog, dialog, notice } = useDemo();
  if (!dialog && !notice) return null;
  const dialogTitle = dialog === "booking" ? "Create a demo booking" :
    dialog === "item" ? "Add a demo record" :
      dialog === "payment" ? "Record a demo payment" : "Booking details";
  return <>
    {notice && <div className="toast" role="status">✓ &nbsp;{notice}</div>}
    {dialog && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-head"><h2 id="modal-title">{dialogTitle}</h2><button className="icon-button" aria-label="Close dialog" onClick={closeDialog}>×</button></div>
        {dialog === "booking" ? <BookingDialog /> : dialog === "item" ? <ItemDialog /> : dialog === "payment" ? <PaymentDialog /> : <BookingDetails />}
      </section></div>}
  </>;
}
