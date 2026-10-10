"use client";

import { useState } from "react";
import { CheckCircle2, Ellipsis, Mail, Network, Plus, Users } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, Metric, SectionHeading, Table } from "@/components/ui";

export default function StaffPage() {
  const { staff, toast } = useDemo();
  const [role, setRole] = useState<string | null>(null);
  return <>
    <div className="metrics-grid compact"><Metric label="Team members" value={String(staff.length)} icon={Users} /><Metric label="Active" value={String(staff.filter((member) => member.status === "Active").length)} icon={CheckCircle2} color="green" /><Metric label="Business arms" value="6" icon={Network} color="purple" /><Metric label="Invitations pending" value="0" icon={Mail} color="orange" /></div>
    <section className="panel list-panel"><SectionHeading title="Team & access" text="Visual role preview only — no user accounts or permissions are enforced." action={<Button variant="primary" onClick={() => toast("Staff invitations are unavailable in this visual demo.")}><Plus size={14} aria-hidden="true" /> Add team member</Button>} />
      <Table headers={["Team member", "Role", "Assigned area", "Status", "Role access", ""]}>{staff.map((member) => <tr key={member.name}><td><div className="customer-name"><span>{member.name.split(" ").map((name) => name[0]).join("")}</span><b>{member.name}</b></div></td><td>{member.role}</td><td>{member.arm}</td><td><Badge>{member.status}</Badge></td><td><button className="text-link" onClick={() => setRole(role === member.role ? null : member.role)}>{role === member.role ? "Hide role" : "Preview role"}</button></td><td><button className="more-button" aria-label={`Actions for ${member.name}`} onClick={() => toast(`${member.name} demo profile opened.`)}><Ellipsis size={17} aria-hidden="true" /></button></td></tr>)}</Table>
      {role && <div className="inline-alert"><b>{role}</b> — role preview for this demo only. Access controls are not enforced.</div>}
      <div className="role-list"><b>Role descriptions</b><span>Owner / Admin · Manager · Booking Staff · Inventory Staff · Delivery Staff · Finance Staff</span></div>
    </section>
  </>;
}
