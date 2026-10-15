# HSEvents event operations demo

This is a Next.js admin workspace for event planning, equipment rentals, and intimate venue operations. Business records still use seeded demo data in browser memory. Authentication connects to the Express API using bearer tokens.

## Workspace structure

- `app/<section>/page.tsx` contains the content for each sidebar route; `/` redirects to `/overview`.
- `components/ui.tsx`, `components/booking-table.tsx`, and `components/inventory-table.tsx` hold shared interface components.
- `components/workspace-shell.tsx` owns the persistent sidebar, top bar, and page heading.
- `providers/auth-provider.tsx` handles API sign-in, session verification, protected routes, and sign-out.
- `providers/demo-provider.tsx` shares seeded demo records and simulated actions across routes.
- `lib/demo-data.ts` contains the strongly typed seed data.

Sidebar routes: `/overview`, `/bookings`, `/calendar`, `/inventory`, `/dispatch-returns`, `/event-planning`, `/venues`, `/customers`, `/payments`, `/reports`, `/services-packages`, `/staff`, and `/settings`. The standalone `/login` route authenticates against `POST /api/v1/auth/login`. The workspace verifies the token with `GET /api/v1/auth/me`.

## Run locally

```powershell
cd hsevent_admin
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to the backend API base URL (defaults to `http://localhost:4000/api/v1`), and make sure the backend's `CORS_ORIGINS` includes the admin origin. Then open `http://localhost:3000`. Build the production app with `npm run build`, then run it with `npm start`.

## Demo data

The strongly typed seed data lives in `lib/demo-data.ts`. It supplies shared bookings, inventory, customers, venues, team, services, and derived payment records. Use **Settings → Reset demo data** to restore the initial client-side state. Amounts use NGN and displayed dates use the Africa/Lagos timezone.

The UI currently connects to the backend only for authentication. Other records are illustrative placeholders; booking, inventory, and payment actions still update only in-memory demo records.
