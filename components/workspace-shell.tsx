"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowLeftToLine, ArrowRight, Bell, CalendarDays, ChartNoAxesCombined, ClipboardList,
  CreditCard, House, LayoutGrid, LifeBuoy, Menu, Package, Settings,
  Sparkles, Truck, Users, Warehouse, Search, LogOut, ChevronDown, Plus
} from "lucide-react";
import { DemoDialogs, useDemo } from "@/providers/demo-provider";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui";

const navigation = [
  ["Overview", "/overview", LayoutGrid],
  ["Bookings", "/bookings", ClipboardList],
  ["Calendar", "/calendar", CalendarDays],
  ["Inventory", "/inventory", Warehouse],
  ["Dispatch & Returns", "/dispatch-returns", Truck],
  ["Event Planning", "/event-planning", Sparkles],
  ["Venues", "/venues", House],
  ["Customers", "/customers", Users],
  ["Payments", "/payments", CreditCard],
  ["Reports", "/reports", ChartNoAxesCombined],
  ["Services & Packages", "/services-packages", Package],
  ["Staff", "/staff", Users],
  ["Settings", "/settings", Settings]
] as const;

const descriptions: Record<string, string> = {
  Overview: "Here’s what’s happening with your business today.",
  Bookings: "Track and manage your event reservations.",
  Calendar: "Plan your events, deliveries and venue schedule.",
  Inventory: "Keep your rental catalogue ready for every event.",
  "Dispatch & Returns": "Coordinate deliveries, collections and returns.",
  "Event Planning": "Bring every celebration together, beautifully.",
  Venues: "Manage your intimate event spaces and reservations.",
  Customers: "Get to know your clients and their history.",
  Payments: "Review payment records and customer balances.",
  Reports: "Understand performance across your business.",
  "Services & Packages": "Curate what customers can book.",
  Staff: "Your team and their operational responsibilities.",
  Settings: "Manage your business workspace preferences."
};

function todayLabel() {
  return new Intl.DateTimeFormat("en-NG", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos"
  }).format(new Date()).toUpperCase();
}

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const activePath = pathname === "/" ? "/overview" : pathname;
  const activeItem = navigation.find(([, href]) => href === activePath);
  const title = activeItem?.[0] ?? "Overview";
  const { openBooking, toast } = useDemo();
  const { user, signOut } = useAuth();
  const displayName = user?.user.name ?? "Workspace user";
  const initials = displayName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  if (isLoginPage) return <>{children}</>;

  return <div className={`app-shell${sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
    <aside className="sidebar">
      <div className="brand"><Image className="brand-logo" src="/logo.jpeg" alt="HSEvents" width={42} height={42} priority /><span>HSEvents<small>EVENT OPERATIONS</small></span><button className="collapse" aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!sidebarCollapsed} onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}>{sidebarCollapsed ? <ArrowRight size={17} aria-hidden="true" /> : <ArrowLeftToLine size={17} aria-hidden="true" />}</button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="main-nav" aria-label="Main navigation">{navigation.map(([label, href, Icon]) => <Link key={href} href={href} className={activePath === href ? "active" : ""} onClick={(event) => event.currentTarget.closest(".sidebar")?.classList.remove("mobile-open")}><span className="nav-icon"><Icon size={16} strokeWidth={1.8} aria-hidden="true" /></span><span>{label}</span>{label === "Dispatch & Returns" && <i className="nav-count">2</i>}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><span><LifeBuoy size={16} aria-hidden="true" /></span><b>Need a hand?</b><small>Visit the demo help centre</small><button onClick={() => toast("The help centre is unavailable in this visual demo.")}>Explore help <ArrowRight size={12} aria-hidden="true" /></button></div><div className="sidebar-profile"><div className="avatar">{initials}</div><div><b>{displayName}</b><small>{user?.role ?? "Workspace member"}</small></div><button className="more-button" aria-label="Sign out" title="Sign out" onClick={signOut}><LogOut size={17} aria-hidden="true" /></button></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu-button" aria-label="Open navigation" onClick={() => document.querySelector(".sidebar")?.classList.toggle("mobile-open")}><Menu size={19} aria-hidden="true" /></button><div className="breadcrumbs">{user?.business.name ?? "Workspace"} <span>/</span> <b>{title}</b></div><div className="top-actions"><div className="global-search"><span><Search size={15} aria-hidden="true" /></span><input aria-label="Global search" placeholder="Search anything..." onKeyDown={(event) => { if (event.key === "Enter") toast("Use the search controls on each page to filter demo data."); }} /><kbd>⌘ K</kbd></div><button className="icon-button notification" aria-label="Notifications" onClick={() => toast("You’re all caught up.")}><Bell size={16} aria-hidden="true" /><i /></button><div className="top-user"><div className="avatar">{initials}</div><span><b>{displayName}</b><small>{user?.role ?? "Member"}</small></span><span className="chevron"><ChevronDown size={14} aria-hidden="true" /></span></div></div></header>
      <div className="content-area"><div className="page-heading"><div><div className="eyebrow">{todayLabel()} <span className="demo-pill">DEMO DATA</span></div><h1>{title === "Overview" ? `Good morning, ${displayName.split(/\s+/)[0]}` : title}</h1><p>{descriptions[title]}</p></div>{title === "Overview" && <Button variant="primary" onClick={() => openBooking()}><Plus size={15} aria-hidden="true" /> Create booking</Button>}</div>{children}<footer>HSEvents workspace <span>·</span> Workspace data integration is in progress <span>·</span> WAT (UTC+1)</footer></div>
    </main>
    <DemoDialogs />
  </div>;
}
