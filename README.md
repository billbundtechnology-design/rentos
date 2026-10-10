# HSEvents event operations demo

This is a client-side Next.js demo for event planning, equipment rentals, and intimate venue operations. All seeded records and simulated changes stay in browser memory. The Axios client uses an in-memory adapter; it does not make application-data network requests.

## Workspace structure

- `app/<section>/page.tsx` contains the content for each sidebar route; `/` redirects to `/overview`.
- `components/ui.tsx`, `components/booking-table.tsx`, and `components/inventory-table.tsx` hold shared interface components.
- `components/workspace-shell.tsx` owns the persistent sidebar, top bar, and page heading.
- `providers/demo-provider.tsx` shares seeded demo records and simulated actions across routes.
- `lib/demo-data.ts` contains the strongly typed seed data.

Sidebar routes: `/overview`, `/bookings`, `/calendar`, `/inventory`, `/dispatch-returns`, `/event-planning`, `/venues`, `/customers`, `/payments`, `/reports`, `/services-packages`, `/staff`, and `/settings`. The standalone `/login` route is a visual sign-in demo; it does not authenticate users or create sessions.

## Run locally

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. Build the production app with `npm run build`, then run it with `npm start`.

## Demo data

The strongly typed seed data lives in `lib/demo-data.ts`. It supplies shared bookings, inventory, customers, venues, team, services, and derived payment records. Use **Settings → Reset demo data** to restore the initial client-side state. Amounts use NGN and displayed dates use the Africa/Lagos timezone.

The UI deliberately does not connect to a server, database, payment provider, or external business API. Customer details and transactions are illustrative placeholders; payment actions update only in-memory demo records.
