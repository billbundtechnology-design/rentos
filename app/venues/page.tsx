"use client";

import { fmtMoney } from "@/lib/demo-data";
import { CalendarDays, CircleCheck, Gem, House, Sun, UsersRound, Warehouse, Wrench } from "lucide-react";
import { useDemo } from "@/providers/demo-provider";
import { Badge, Button, Metric } from "@/components/ui";

export default function VenuesPage() {
  const { bookings, openBooking, toast, venues } = useDemo();
  const reservations = bookings.filter((booking) => booking.venue !== "—" && booking.status !== "Cancelled").length;
  return <>
    <div className="metrics-grid compact"><Metric label="Spaces" value={String(venues.length)} icon={House} /><Metric label="Available today" value="2" icon={CircleCheck} color="green" /><Metric label="Upcoming reservations" value={String(reservations)} icon={CalendarDays} color="purple" /><Metric label="Maintenance" value="1" icon={Wrench} color="orange" /></div>
    <div className="venue-grid">{venues.map((venue, index) => { const VenueIcon = [House, Gem, Warehouse, Sun][index % 4]; return <article className="venue-card" key={venue.name}><div className={`venue-visual venue-${index}`}><span className="venue-symbol"><VenueIcon size={25} strokeWidth={1.6} aria-hidden="true" /></span><Badge>{venue.status}</Badge></div><div className="venue-body"><div className="venue-title"><h3>{venue.name}</h3><span>{fmtMoney(venue.price)}<small> / day</small></span></div><p><UsersRound size={14} aria-hidden="true" /> Up to {venue.capacity} guests</p><p className="muted">{venue.amenities}</p><div className="venue-actions"><Button small onClick={() => toast(`Availability calendar for ${venue.name} opened.`)}>View calendar</Button><Button small onClick={() => openBooking("Venue", venue.name, venue.price, `${venue.name} reservation`)}>Reserve venue</Button></div></div></article>; })}</div>
  </>;
}
