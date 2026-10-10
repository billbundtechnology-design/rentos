"use client";

import { useMemo, useState } from "react";
import { CircleHelp, CircleCheck, PackageCheck, Plus, Search, TriangleAlert, Warehouse } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Button, Metric, SectionHeading, EmptyState } from "@/components/ui";
import { InventoryTable } from "@/components/inventory-table";

export default function InventoryPage() {
  const { inventory, openItem } = useDemo();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const categories = Array.from(new Set(inventory.map((item) => item.category)));
  const rows = useMemo(() => inventory.filter((item) =>
    `${item.name} ${item.sku} ${item.category}`.toLowerCase().includes(query.toLowerCase()) &&
    (category === "All categories" || item.category === category)
  ), [inventory, query, category]);
  return <>
    <div className="metrics-grid compact inventory-metrics">
      <Metric label="Total items" value={String(inventory.length)} icon={Warehouse} />
      <Metric label="Available units" value={inventory.reduce((sum, item) => sum + item.total - item.reserved - item.damaged - item.missing, 0).toLocaleString()} icon={CircleCheck} color="green" />
      <Metric label="Reserved units" value={inventory.reduce((sum, item) => sum + item.reserved, 0).toLocaleString()} icon={PackageCheck} color="purple" />
      <Metric label="Damaged units" value={String(inventory.reduce((sum, item) => sum + item.damaged, 0))} icon={TriangleAlert} color="orange" />
      <Metric label="Missing units" value={String(inventory.reduce((sum, item) => sum + item.missing, 0))} icon={CircleHelp} color="orange" />
    </div>
    <section className="panel list-panel"><SectionHeading title="Equipment catalogue" text="Availability is a demo calculation, not a production reservation guarantee." action={<Button variant="primary" onClick={() => openItem("inventory")}><Plus size={14} aria-hidden="true" /> Add item</Button>} />
      <div className="toolbar"><div className="search-input"><span><Search size={15} aria-hidden="true" /></span><input aria-label="Search inventory" placeholder="Search equipment..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter category"><option>All categories</option>{categories.map((value) => <option key={value}>{value}</option>)}</select>
        <Button onClick={() => { setQuery(""); setCategory("All categories"); }}>Reset</Button></div>
      {rows.length ? <InventoryTable rows={rows} /> : <EmptyState>No equipment matches your search.</EmptyState>}
    </section>
  </>;
}
