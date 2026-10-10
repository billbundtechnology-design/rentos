"use client";

import { Booking, fmtDate, fmtMoney } from "@/lib/demo-data";
import { Ellipsis } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Table } from "@/components/ui";

export function BookingTable({ rows }: { rows: Booking[] }) {
  const { openDetails } = useDemo();
  return <Table headers={["Booking", "Customer", "Event", "Event date", "Amount", "Payment", "Status", ""]}>
    {rows.map((booking) => <tr key={booking.id}>
      <td><button className="text-link" onClick={() => openDetails(booking)}>{booking.id}</button></td>
      <td><div className="cell-title">{booking.customer}</div><span className="muted">{booking.arm}</span></td>
      <td>{booking.event}</td><td>{fmtDate(booking.date)}</td><td className="amount">{fmtMoney(booking.amount)}</td>
      <td><Badge>{booking.payment}</Badge></td><td><Badge>{booking.status}</Badge></td>
      <td><button className="more-button" aria-label={`Actions for ${booking.id}`} onClick={() => openDetails(booking)}><Ellipsis size={17} aria-hidden="true" /></button></td>
    </tr>)}
  </Table>;
}
