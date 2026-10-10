"use client";

import { fmtDate, fmtMoney } from "@/lib/demo-data";
import { Check, Clock3, Plus, Sparkles } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, SectionHeading } from "@/components/ui";

export default function EventPlanningPage() {
  const { bookings, openBooking, toast } = useDemo();
  const projects = bookings.filter((booking) => booking.arm === "Planning");
  return <section className="panel list-panel"><SectionHeading title="Event projects" text="Plan, style and deliver memorable occasions" action={<Button variant="primary" onClick={() => openBooking("Planning")}><Plus size={14} aria-hidden="true" /> New project</Button>} />
    <div className="project-grid">{projects.map((booking, index) => <article className="project-card" key={booking.id}><div className="project-card-head"><span className="project-icon"><Sparkles size={16} aria-hidden="true" /></span><Badge>{booking.status}</Badge></div><h3>{booking.event}</h3><p>{booking.customer} · {fmtDate(booking.date)}</p><div className="project-meta"><span>Budget</span><b>{fmtMoney(booking.amount)}</b></div><div className="progress-line"><i style={{ width: `${[72, 48, 88][index % 3]}%` }} /></div><div className="progress-caption"><span>Project progress</span><b>{[72, 48, 88][index % 3]}%</b></div><div className="task-preview"><span><Check size={13} aria-hidden="true" /> Venue confirmed</span><span><Clock3 size={13} aria-hidden="true" /> Final styling review</span><Button small onClick={() => toast(`Task board opened for ${booking.id}.`)}>View project</Button></div></article>)}</div>
  </section>;
}
