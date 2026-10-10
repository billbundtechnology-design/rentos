"use client";

import { useState } from "react";
import { useDemo } from "@/providers/demo-provider";
import { Button, SectionHeading } from "@/components/ui";

const sections = ["Business profile", "Booking policies", "Notifications", "Invoice branding", "Staff roles", "Demo data"];

export default function SettingsPage() {
  const { resetDemo, toast } = useDemo();
  const [section, setSection] = useState(sections[0]);
  const [notifications, setNotifications] = useState({ bookings: true, dispatch: true, payment: false });
  function toggle(name: keyof typeof notifications) {
    setNotifications((current) => ({ ...current, [name]: !current[name] }));
  }
  return <div className="settings-layout">
    <nav className="settings-nav" aria-label="Settings sections">{sections.map((item) => <button className={section === item ? "active" : ""} key={item} onClick={() => setSection(item)}>{item}</button>)}</nav>
    <section className="panel settings-panel"><SectionHeading title={section} text="Configure your workspace preferences." />
      {section === "Business profile" && <>
        <label className="form-label">Business name<input defaultValue="HSEvents" /></label>
        <div className="form-grid"><label className="form-label">Currency<select defaultValue="NGN"><option>NGN — Nigerian Naira</option></select></label><label className="form-label">Timezone<select defaultValue="Africa/Lagos"><option>Africa/Lagos (WAT, UTC+1)</option></select></label></div>
        <label className="form-label">Business address<input defaultValue="Lekki Phase 1, Lagos, Nigeria" /></label>
      </>}
      {section === "Booking policies" && <>
        <label className="form-label">Default deposit<input defaultValue="40%" /></label>
        <label className="form-label">Cancellation notice<select defaultValue="7 days"><option>7 days</option><option>14 days</option><option>30 days</option></select></label>
        <p className="muted">Example policy only. Confirm your terms directly with customers.</p>
      </>}
      {section === "Notifications" && <div className="settings-options">{(["bookings", "dispatch", "payment"] as const).map((name) => <label className="setting-line" key={name}><span><b>{name === "bookings" ? "Booking updates" : name === "dispatch" ? "Dispatch reminders" : "Payment reminders"}</b><small>Local preference preview for this demo</small></span><input type="checkbox" checked={notifications[name]} onChange={() => toggle(name)} /></label>)}</div>}
      {section === "Invoice branding" && <><label className="form-label">Invoice business name<input defaultValue="HSEvents" /></label><label className="form-label">Invoice footer<textarea rows={3} defaultValue="Thank you for celebrating with HSEvents." /></label></>}
      {section === "Staff roles" && <div className="role-list role-list-settings"><b>Role descriptions</b><span>Owner / Admin · Full workspace overview and settings</span><span>Manager · Day-to-day operational oversight</span><span>Booking Staff · Booking records and customer details</span><span>Inventory Staff · Equipment catalogue and stock</span><span>Delivery Staff · Dispatch and return checklists</span><span>Finance Staff · Payment records and reports</span><p className="muted">Illustrative descriptions only; permissions are not enforced.</p></div>}
      {section === "Demo data" && <><div className="inline-alert">Resetting restores the original seeded demo records in this browser session. It does not affect another browser or session.</div><Button onClick={resetDemo}>Reset demo data</Button></>}
      {section !== "Demo data" && <div className="settings-divider" />}
      {section !== "Demo data" && <Button variant="primary" onClick={() => toast(`${section} saved for this demo session.`)}>Save changes</Button>}
      <p className="muted settings-note">Settings are local to this browser session. No sensitive data is stored.</p>
    </section>
  </div>;
}
