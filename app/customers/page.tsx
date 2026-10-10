"use client";

import { useState } from "react";
import { Banknote, Building2, Heart, Plus, Search, Users } from "lucide-react";
import { fmtMoney } from "@/lib/demo-data";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, Metric, SectionHeading, Table } from "@/components/ui";

export default function CustomersPage() {
  const { bookings, customers, openItem } = useDemo();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All customer types");
  const rows = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase().includes(query.toLowerCase()) &&
    (type === "All customer types" || customer.type === type)
  );
  const lifetimeValue = customers.reduce((sum, customer) => sum + customer.value, 0);
  return <>
    <div className="metrics-grid compact"><Metric label="Total customers" value={String(customers.length)} icon={Users} /><Metric label="Private clients" value={String(customers.filter((customer) => customer.type === "Private").length)} icon={Heart} color="purple" /><Metric label="Corporate clients" value={String(customers.filter((customer) => customer.type === "Corporate").length)} icon={Building2} color="green" /><Metric label="Lifetime value" value={fmtMoney(lifetimeValue)} icon={Banknote} color="orange" /></div>
    <section className="panel list-panel"><SectionHeading title="Customer directory" text="Relationships and booking history" action={<Button variant="primary" onClick={() => openItem("customer")}><Plus size={14} aria-hidden="true" /> Add customer</Button>} />
      <div className="toolbar"><div className="search-input"><span><Search size={15} aria-hidden="true" /></span><input placeholder="Search customers..." aria-label="Search customers" value={query} onChange={(event) => setQuery(event.target.value)} /></div><select aria-label="Customer type" value={type} onChange={(event) => setType(event.target.value)}><option>All customer types</option><option>Private</option><option>Corporate</option></select></div>
      <Table headers={["Customer", "Contact", "Type", "Bookings", "Lifetime value", "Outstanding"]}>{rows.map((customer) => <tr key={customer.name}><td><div className="customer-name"><span>{customer.name.split(" ").map((name) => name[0]).join("")}</span><b>{customer.name}</b></div></td><td>{customer.email}<small className="block muted">{customer.phone}</small></td><td><Badge>{customer.type}</Badge></td><td>{customer.bookings}</td><td className="amount">{fmtMoney(customer.value)}</td><td>{fmtMoney(bookings.filter((booking) => booking.customer === customer.name && booking.status !== "Cancelled").reduce((sum, booking) => sum + booking.amount - booking.paid, 0))}</td></tr>)}</Table>
    </section>
  </>;
}
