import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function Badge({ children, tone = "" }: { children: string; tone?: string }) {
  const statusTone = tone || (["Confirmed", "Paid", "Available", "Active", "Good", "Completed"].includes(children) ? "green" :
    ["Pending", "Part paid", "Maintenance", "On leave", "Awaiting payment"].includes(children) ? "amber" :
      ["Cancelled", "Unpaid", "Damaged", "Overdue", "Inactive"].includes(children) ? "red" : "blue");
  return <span className={`badge ${statusTone}`}>{children}</span>;
}

export function Button({ children, variant = "secondary", small = false, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; small?: boolean }) {
  return <button {...props} type={props.type ?? "button"} className={`button ${variant} ${small ? "small" : ""} ${props.className ?? ""}`}>{children}</button>;
}

export function SectionHeading({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return <div className="section-heading"><div><h2>{title}</h2><p>{text}</p></div>{action}</div>;
}

export function Metric({ label, value, change, icon: Icon, color = "blue" }: { label: string; value: string; change?: string; icon: LucideIcon; color?: string }) {
  return <div className="metric-card"><div className={`metric-icon ${color}`}><Icon size={16} strokeWidth={1.8} aria-hidden="true" /></div><div className="metric-label">{label}</div><strong>{value}</strong>{change && <small className="metric-change">{change}</small>}</div>;
}

export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return <div className="table-wrap"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty-state">{children}</div>;
}
