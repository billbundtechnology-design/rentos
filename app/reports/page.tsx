"use client";

import { fmtMoney } from "@/lib/demo-data";
import { Banknote, ChartNoAxesCombined, Clock3, TrendingUp, Download } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Button, Metric, SectionHeading } from "@/components/ui";

export default function ReportsPage() {
  const { bookings, inventory } = useDemo();
  const bookingValue = bookings.filter((booking) => booking.status !== "Cancelled").reduce((sum, booking) => sum + booking.amount, 0);
  const recorded = bookings.reduce((sum, booking) => sum + booking.paid, 0);
  const byMonth = ["September", "October", "November"].map((name, index) => {
    const month = [8, 9, 10][index];
    return { name, count: bookings.filter((booking) => new Date(`${booking.date}T12:00:00`).getMonth() === month && booking.status !== "Cancelled").length };
  });
  const categories = Array.from(new Set(inventory.map((item) => item.category))).map((name) => ({
    name,
    count: inventory.filter((item) => item.category === name).reduce((sum, item) => sum + item.reserved, 0)
  })).sort((a, b) => b.count - a.count).slice(0, 4);
  const maxCategoryCount = Math.max(...categories.map((item) => item.count), 1);
  function downloadReport() {
    const rows = [["Metric", "Amount (NGN)"], ["Booking value", String(bookingValue)], ["Recorded payments", String(recorded)], ["Outstanding", String(bookingValue - recorded)]];
    const blob = new Blob([rows.map((row) => row.join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "rentos-demo-report.csv"; anchor.click();
    URL.revokeObjectURL(url);
  }
  return <section className="panel"><SectionHeading title="Business performance" text="Figures calculated from the shared demo dataset." action={<div className="button-row"><select aria-label="Report period"><option>All demo dates</option><option>This quarter</option><option>This year</option></select><Button onClick={downloadReport}><Download size={14} aria-hidden="true" /> Export CSV</Button></div>} />
    <div className="metrics-grid compact report-metrics"><Metric label="Booking value" value={fmtMoney(bookingValue)} icon={Banknote} /><Metric label="Recorded payments" value={fmtMoney(recorded)} icon={TrendingUp} color="green" /><Metric label="Outstanding" value={fmtMoney(bookingValue - recorded)} icon={Clock3} color="orange" /><Metric label="Avg. booking value" value={fmtMoney(Math.round(bookingValue / Math.max(1, bookings.filter((booking) => booking.status !== "Cancelled").length)))} icon={ChartNoAxesCombined} color="purple" /></div>
    <div className="report-grid"><div className="report-block"><h3>Booking volume by month</h3><div className="horizontal-bars">{byMonth.map(({ name, count }) => <div className="horizontal-row" key={name}><span>{name}</span><i><b style={{ width: `${count / Math.max(1, ...byMonth.map((item) => item.count)) * 100}%` }} /></i><strong>{count}</strong></div>)}</div></div>
      <div className="report-block"><h3>Most rented categories</h3>{categories.map((item) => <div className="popular-item" key={item.name}><span>{item.name}</span><div className="mini-track"><i style={{ width: `${item.count / maxCategoryCount * 100}%` }} /></div><b>{item.count} units</b></div>)}</div></div>
  </section>;
}
