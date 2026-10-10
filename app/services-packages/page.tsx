"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { fmtMoney } from "@/lib/demo-data";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, SectionHeading, Table } from "@/components/ui";

export default function ServicesPackagesPage() {
  const { openItem, services, setServices } = useDemo();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const categories = Array.from(new Set(services.map((service) => service.category)));
  const rows = services.filter((service) => service.name.toLowerCase().includes(query.toLowerCase()) && (category === "All categories" || service.category === category));
  function toggleStatus(name: string) {
    setServices((current) => current.map((service) => service.name === name
      ? { ...service, status: service.status === "Active" ? "Inactive" : "Active" }
      : service));
  }
  return <section className="panel list-panel"><SectionHeading title="Services & packages" text="Manage the offerings across your business arms" action={<Button variant="primary" onClick={() => openItem("service")}><Plus size={14} aria-hidden="true" /> Add service</Button>} />
    <div className="toolbar"><div className="search-input"><span><Search size={15} aria-hidden="true" /></span><input placeholder="Search catalogue..." aria-label="Search services" value={query} onChange={(event) => setQuery(event.target.value)} /></div><select aria-label="Filter services" value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
    <Table headers={["Service / package", "Category", "Price", "Bookings this month", "Status", ""]}>{rows.map((service) => <tr key={service.name}><td><div className="cell-title">{service.name}</div><span className="muted">HSEvents curated offering</span></td><td><Badge>{service.category}</Badge></td><td className="amount">{fmtMoney(service.price)}</td><td>—</td><td><Badge>{service.status}</Badge></td><td><Button small onClick={() => toggleStatus(service.name)}>{service.status === "Active" ? "Deactivate" : "Activate"}</Button></td></tr>)}</Table>
  </section>;
}
