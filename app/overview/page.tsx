"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, Banknote, ClipboardList, Clock3, TrendingUp } from "lucide-react";
import { fmtMoney } from "@/lib/demo-data";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Metric, Panel, SectionHeading } from "@/components/ui";
import { BookingTable } from "@/components/booking-table";

export default function OverviewPage() {
  const { bookings, inventory } = useDemo();
  const totalValue = bookings.filter((booking) => booking.status !== "Cancelled").reduce((sum, booking) => sum + booking.amount, 0);
  const paymentsReceived = bookings.reduce((sum, booking) => sum + booking.paid, 0);
  const activeBookings = bookings.filter((booking) => booking.status !== "Cancelled");
  const upcoming = bookings.filter((booking) => booking.date >= "2026-10-10" && booking.status !== "Cancelled").sort((a, b) => a.date.localeCompare(b.date));
  return <>
    <div className="metrics-grid">
      <Metric label="Total bookings" value={String(activeBookings.length)} change="+12.5% vs last month" icon={ClipboardList} />
      <Metric label="Booking value" value={fmtMoney(totalValue)} change="Across all demo bookings" icon={Banknote} color="purple" />
      <Metric label="Payments recorded" value={fmtMoney(paymentsReceived)} change="Demo records only" icon={TrendingUp} color="green" />
      <Metric label="Outstanding balance" value={fmtMoney(totalValue - paymentsReceived)} change="Across active bookings" icon={Clock3} color="orange" />
    </div>
    <div className="dashboard-grid">
      <Panel className="trend-panel"><SectionHeading title="Revenue overview" text="Booking value vs payments recorded · 2026" action={<select aria-label="Revenue period"><option>This year</option><option>Last 30 days</option></select>} />
        <div className="chart-legend"><span><i className="legend-dot blue-dot" />Booking value</span><span><i className="legend-dot pale-dot" />Payments recorded</span></div>
        <div className="bar-chart">{[42, 58, 47, 73, 62, 88, 70, 95, 77, 66, 80, 91].map((height, index) => <div className="bar-group" key={index}><div className="bar-pair"><i style={{ height: `${height}%` }} /><i style={{ height: `${height * .66}%` }} /></div><small>{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}</small></div>)}</div>
      </Panel>
      <Panel><SectionHeading title="Booking status" text="Current booking mix" />
        <div className="donut-wrap"><div className="donut"><div><strong>{activeBookings.length}</strong><span>bookings</span></div></div><div className="status-legend"><p><i className="legend-dot blue-dot" />Confirmed <b>{bookings.filter((b) => b.status === "Confirmed").length}</b></p><p><i className="legend-dot green-dot" />Completed <b>{bookings.filter((b) => b.status === "Completed").length}</b></p><p><i className="legend-dot yellow-dot" />Pending <b>{bookings.filter((b) => b.status === "Pending").length}</b></p><p><i className="legend-dot gray-dot" />Cancelled <b>{bookings.filter((b) => b.status === "Cancelled").length}</b></p></div></div>
      </Panel>
      <Panel className="upcoming-panel"><SectionHeading title="Upcoming events" text="Your next bookings" action={<Link className="text-link" href="/calendar">View calendar <ArrowRight size={13} aria-hidden="true" /></Link>} />
        <div className="timeline">{upcoming.slice(0, 4).map((booking) => <div className="timeline-row" key={booking.id}><div className="timeline-date"><b>{new Date(`${booking.date}T12:00:00`).getDate()}</b><small>{new Date(`${booking.date}T12:00:00`).toLocaleString("en-NG", { month: "short" })}</small></div><div className="timeline-line" /><div className="timeline-info"><strong>{booking.event}</strong><span>{booking.customer} · {booking.venue}</span></div><Badge>{booking.status}</Badge></div>)}</div>
      </Panel>
      <Panel className="inventory-health"><SectionHeading title="Inventory health" text="Availability across your catalogue" action={<Link className="text-link" href="/inventory">View inventory <ArrowRight size={13} aria-hidden="true" /></Link>} />
        <div className="health-numbers"><div><strong>{inventory.reduce((sum, item) => sum + item.total, 0).toLocaleString()}</strong><span>Total units</span></div><div><strong>{inventory.reduce((sum, item) => sum + item.total - item.reserved - item.damaged - item.missing, 0).toLocaleString()}</strong><span>Available now</span></div></div>
        <div className="progress-line"><i style={{ width: "68%" }} /></div><div className="progress-caption"><span>Utilization</span><b>68%</b></div>
        <div className="alert-row"><span className="alert-icon"><AlertTriangle size={15} aria-hidden="true" /></span><span><b>12 items need attention</b><small>Damaged or due for maintenance</small></span><Link className="text-link" href="/inventory">Review</Link></div>
      </Panel>
    </div>
    <Panel className="list-panel"><SectionHeading title="Recent bookings" text="Latest activity across all business arms" action={<Link className="text-link" href="/bookings">See all bookings <ArrowRight size={13} aria-hidden="true" /></Link>} /><BookingTable rows={bookings.slice(0, 5)} /></Panel>
  </>;
}
