# Liquira Waitlist

## Local development

1. Copy `.env.example` to `.env.local`.
2. Fill in your dev Supabase project values.
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for client-side routing or public pages
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for server-side API inserts
   - `RESEND_API_KEY` to send admin signup notifications through Resend
   - `ADMIN_NOTIFICATION_EMAIL` to set who receives signup alerts
3. Run:

```bash
npm install
npm run dev
```

## Testing against a dev Supabase backend

- Use a separate Supabase project for development.
- Create the `waitlist_signups` table with the same schema used in `supabase/migrations/`.
- Send test signups through the form at the app URL.
- The backend route at `/api/public/waitlist` will write data to your dev Supabase project.

## New `name` field

The waitlist form now includes an optional `name` field and stores it in the waitlist row.
