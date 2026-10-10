"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Booking, fmtDate } from "@/lib/demo-data";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, Panel } from "@/components/ui";

export default function CalendarPage() {
  const { bookings, openDetails } = useDemo();
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2026);
  const [view, setView] = useState("Month view");
  const first = new Date(year, month, 1);
  const title = first.toLocaleString("en-NG", { month: "long", year: "numeric" });
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const monthBookings = useMemo(() => bookings.filter((booking) => {
    const date = new Date(`${booking.date}T12:00:00`);
    return date.getFullYear() === year && date.getMonth() === month && booking.status !== "Cancelled";
  }), [bookings, month, year]);
  const cells = Array.from({ length: 35 }, (_, index) => index - offset + 1).filter((day) => day > 0 && day <= days);
  const changeMonth = (value: number) => {
    const next = new Date(year, month + value, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };
  const eventClass = (booking: Booking) => booking.arm.toLowerCase();
  return <Panel className="calendar-panel">
    <div className="calendar-head"><div><h2>{title}</h2><p>Events, deliveries and venue reservations · Africa/Lagos</p></div>
      <div className="button-row"><Button aria-label="Previous month" onClick={() => changeMonth(-1)}><ArrowLeft size={15} aria-hidden="true" /></Button><Button onClick={() => { setYear(2026); setMonth(9); }}>Today</Button><Button aria-label="Next month" onClick={() => changeMonth(1)}><ArrowRight size={15} aria-hidden="true" /></Button><select aria-label="Calendar view" value={view} onChange={(event) => setView(event.target.value)}><option>Month view</option><option>Week view</option><option>Agenda view</option></select></div>
    </div>
    {view === "Agenda view" ? <div className="agenda-list">{monthBookings.map((booking) => <button className="agenda-row" key={booking.id} onClick={() => openDetails(booking)}><span className="agenda-date">{fmtDate(booking.date)}</span><span className={`agenda-mark ${eventClass(booking)}`} /><span className="agenda-name"><b>{booking.event}</b><small>{booking.customer} · {booking.venue}</small></span><Badge>{booking.status}</Badge></button>)}</div> :
      <div className={`calendar-grid ${view === "Week view" ? "week-view" : ""}`}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div className="weekday" key={day}>{day}</div>)}
        {(view === "Week view" ? cells.slice(0, 7) : cells).map((day) => {
          const dayBookings = monthBookings.filter((booking) => new Date(`${booking.date}T12:00:00`).getDate() === day);
          return <div className="calendar-cell" key={day}><span className={day === 10 && month === 9 && year === 2026 ? "today" : ""}>{day}</span>{dayBookings.slice(0, 3).map((booking) => <button className={`calendar-event ${eventClass(booking)}`} key={booking.id} onClick={() => openDetails(booking)}>{booking.event}</button>)}</div>;
        })}
      </div>}
    <div className="chart-legend calendar-legend"><span><i className="legend-dot blue-dot" />Rentals</span><span><i className="legend-dot green-dot" />Planning</span><span><i className="legend-dot purple-dot" />Venue</span></div>
    <div className="inline-alert"><Info size={15} aria-hidden="true" /> Demo conflict check: 2 events share the same weekend delivery window.</div>
  </Panel>;
}
