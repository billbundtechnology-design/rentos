"use client";

import { useMemo, useState } from "react";
import { Banknote, CheckCircle2, ClipboardList, Clock3, Plus, Search } from "lucide-react";
import { fmtMoney } from "@/lib/demo-data";
import { useDemo } from "@/providers/demo-provider";
import { Button, EmptyState, Metric, SectionHeading } from "@/components/ui";
import { BookingTable } from "@/components/booking-table";

export default function BookingsPage() {
  const { bookings, openBooking } = useDemo();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [arm, setArm] = useState("All business arms");
  const rows = useMemo(() => bookings.filter((booking) =>
    `${booking.id} ${booking.customer} ${booking.event}`.toLowerCase().includes(query.toLowerCase()) &&
    (status === "All statuses" || booking.status === status) &&
    (arm === "All business arms" || booking.arm === arm)
  ), [bookings, query, status, arm]);
  const activeBookings = bookings.filter((booking) => booking.status !== "Cancelled");
  const outstanding = activeBookings.reduce((sum, booking) => sum + booking.amount - booking.paid, 0);
  return <>
    <div className="metrics-grid compact"><Metric label="All bookings" value={String(bookings.length)} icon={ClipboardList} /><Metric label="Awaiting approval" value={String(bookings.filter((b) => b.status === "Pending").length)} icon={Clock3} color="orange" /><Metric label="Confirmed" value={String(bookings.filter((b) => b.status === "Confirmed").length)} icon={CheckCircle2} color="green" /><Metric label="Outstanding" value={fmtMoney(outstanding)} icon={Banknote} color="purple" /></div>
    <section className="panel list-panel"><SectionHeading title="All bookings" text="Manage event reservations and rental orders" action={<Button variant="primary" onClick={() => openBooking()}><Plus size={14} aria-hidden="true" /> New booking</Button>} />
      <div className="toolbar"><div className="search-input"><span><Search size={15} aria-hidden="true" /></span><input aria-label="Search bookings" placeholder="Search bookings..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter booking status"><option>All statuses</option><option>Confirmed</option><option>Pending</option><option>Completed</option><option>Cancelled</option></select>
        <select value={arm} onChange={(event) => setArm(event.target.value)} aria-label="Filter booking arm"><option>All business arms</option><option>Rentals</option><option>Planning</option><option>Venue</option></select>
        <Button onClick={() => { setQuery(""); setStatus("All statuses"); setArm("All business arms"); }}>Reset</Button></div>
      {rows.length ? <BookingTable rows={rows} /> : <EmptyState>No bookings match your filters.</EmptyState>}
    </section>
  </>;
}
