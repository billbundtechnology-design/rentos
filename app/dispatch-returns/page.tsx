"use client";

import { fmtDate } from "@/lib/demo-data";
import { CircleAlert, PackageCheck, PackageOpen, Plus, Truck } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, Metric, SectionHeading, Table } from "@/components/ui";

export default function DispatchReturnsPage() {
  const { bookings, toast } = useDemo();
  const scheduled = bookings.filter((booking) => booking.status === "Confirmed").slice(0, 5);
  return <>
    <div className="metrics-grid compact"><Metric label="Upcoming dispatches" value="4" icon={Truck} /><Metric label="Due for collection" value="3" icon={PackageOpen} color="purple" /><Metric label="Items checked out" value="286" icon={PackageCheck} color="green" /><Metric label="Overdue returns" value="2" icon={CircleAlert} color="orange" /></div>
    <section className="panel list-panel"><SectionHeading title="Dispatch & returns" text="Prepare deliveries and reconcile returned equipment" action={<Button variant="primary" onClick={() => toast("Dispatch checklist opened in demo mode.")}><Plus size={14} aria-hidden="true" /> Create dispatch</Button>} />
      <div className="tab-row"><button className="active">Upcoming dispatches</button><button onClick={() => toast("Showing checked-out demo items.")}>Checked out</button><button onClick={() => toast("Showing return history from demo records.")}>Return history</button></div>
      <Table headers={["Booking", "Customer / event", "Dispatch date", "Items", "Delivery area", "Status", ""]}>{scheduled.map((booking, index) => <tr key={booking.id}><td className="text-link">{booking.id}</td><td><div className="cell-title">{booking.customer}</div><span className="muted">{booking.event}</span></td><td>{fmtDate(booking.date)}</td><td>{[42, 18, 65, 28, 32][index]} units</td><td>{["Lekki Phase 1", "Ikeja GRA", "Victoria Island", "Surulere", "Ikoyi"][index]}</td><td><Badge>{index < 2 ? "Preparing" : "Scheduled"}</Badge></td><td><Button small onClick={() => toast(`Checklist for ${booking.id} updated locally.`)}>Checklist</Button></td></tr>)}</Table>
    </section>
  </>;
}
