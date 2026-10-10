"use client";

import { InventoryItem, fmtMoney } from "@/lib/demo-data";
import { Ellipsis } from "lucide-react";
import { Badge, Table } from "@/components/ui";
import { useDemo } from "@/providers/demo-provider";

export function InventoryTable({ rows }: { rows: InventoryItem[] }) {
  const { toast } = useDemo();
  return <Table headers={["Item", "SKU", "Category", "Total units", "Available", "Condition", "Rate / day", ""]}>
    {rows.map((item) => <tr key={item.id}>
      <td><div className="item-cell"><div className="item-thumb">{item.category.slice(0, 2).toUpperCase()}</div><span className="cell-title">{item.name}</span></div></td>
      <td className="muted">{item.sku}</td><td>{item.category}</td><td>{item.total}</td>
      <td><span className="available-num">{item.total - item.reserved - item.damaged - item.missing}</span> <span className="muted">available</span></td>
      <td><Badge tone={item.damaged || item.missing ? "amber" : "green"}>{item.damaged || item.missing ? `${item.damaged} damaged · ${item.missing} missing` : "Good"}</Badge></td>
      <td className="amount">{fmtMoney(item.rate)}</td><td><button className="more-button" aria-label={`Actions for ${item.name}`} onClick={() => toast(`${item.name}: ${item.total - item.reserved - item.damaged - item.missing} available in demo data.`)}><Ellipsis size={17} aria-hidden="true" /></button></td>
    </tr>)}
  </Table>;
}
