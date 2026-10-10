"use client";

import { fmtDate, fmtMoney } from "@/lib/demo-data";
import { Banknote, Clock3, CornerDownLeft, Plus, ReceiptText } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, Metric, SectionHeading, Table } from "@/components/ui";

export default function PaymentsPage() {
  const { bookings, openPayment, payments } = useDemo();
  const received = bookings.reduce((sum, booking) => sum + booking.paid, 0);
  const outstanding = bookings.filter((booking) => booking.status !== "Cancelled").reduce((sum, booking) => sum + booking.amount - booking.paid, 0);
  return <>
    <div className="metrics-grid compact"><Metric label="Recorded payments" value={fmtMoney(received)} icon={Banknote} color="green" /><Metric label="Outstanding balances" value={fmtMoney(outstanding)} icon={Clock3} color="orange" /><Metric label="Deposits received" value={fmtMoney(Math.round(received * .58))} icon={CornerDownLeft} /><Metric label="Demo transactions" value={String(payments.filter((payment) => payment.amount > 0).length)} icon={ReceiptText} color="purple" /></div>
    <section className="panel list-panel"><SectionHeading title="Payment records" text="All amounts are simulated demo records; no money has moved." action={<Button variant="primary" onClick={openPayment}><Plus size={14} aria-hidden="true" /> Record payment</Button>} /><div className="inline-alert">Demo mode · These records are illustrative only and are not evidence of an actual transfer.</div>
      <Table headers={["Reference", "Booking", "Customer", "Date", "Method", "Amount", "Status", ""]}>{payments.filter((payment) => payment.amount > 0).map((payment) => <tr key={payment.reference}><td className="text-link">{payment.reference}</td><td>{payment.booking}</td><td>{payment.customer}</td><td>{fmtDate(payment.date)}</td><td>{payment.method}</td><td className="amount">{fmtMoney(payment.amount)}</td><td><Badge>{payment.status}</Badge></td><td><Button small onClick={() => window.print()}>Print receipt</Button></td></tr>)}</Table>
    </section>
  </>;
}
