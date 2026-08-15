# MongoDB Backend Migration — Design

## Context

The contact form (`src/components/ContactModal.tsx`) currently writes submissions
directly to Supabase from the browser via `src/lib/supabase.ts`, which calls
`createClient(supabaseUrl, supabaseAnonKey)` at module load time with no guard.
When `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are not set (as on the current
Vercel deployment — only present in local, gitignored `.env.local`), this throws
during module init, crashing the entire React tree and producing a blank white
screen in production.

Decision: replace Supabase entirely with MongoDB, both to change the backend and
to eliminate this crash-on-missing-env-var failure mode.

There is also an orphaned `functions/` directory (Firebase Cloud Function,
`sendContactConfirmationEmail`) that listens for Firestore document creation.
The app has never written to Firestore (it wrote to Supabase, will write to
MongoDB), and there is no `firebase.json`/`.firebaserc` wiring this function to
deploy. It has never fired. EmailJS already sends the confirmation email
client-side in `ContactModal.tsx`. This is dead code and will be removed
alongside the migration.

## Goals

- Contact form submissions persist to MongoDB Atlas instead of Supabase.
- No client-side database credentials exposed to the browser (MongoDB has no
  safe direct-from-browser SDK, unlike Supabase's RLS-guarded anon key model).
- Remove dead code: `functions/` folder, `firebase` and `@supabase/supabase-js`
  dependencies, `src/lib/supabase.ts`.
- Fix the blank-screen root cause as a side effect of removing the Supabase
  client entirely.

## Non-goals

- No admin UI / dashboard for viewing submitted contacts (out of scope).
- No migration of existing Supabase data (current data volume is negligible /
  not required per user).
- No change to EmailJS confirmation email flow.

## Architecture

```
Browser (ContactModal.tsx)
   |
   |  POST /api/contact  { businessName, email, phone, selectedServices }
   v
Vercel Serverless Function (api/contact.ts, Node runtime)
   |
   |  cached MongoClient (api/_lib/mongodb.ts)
   v
MongoDB Atlas — "digiroots" database, "contacts" collection
```

### `api/_lib/mongodb.ts`

Exports a `getDb()` helper that returns a cached `MongoClient` connection,
following the standard serverless reuse pattern (module-scope cached client
promise, reused across warm invocations to avoid reconnect storms). Reads
connection string from `process.env.MONGODB_URI` (no default — throws a clear
error if unset, rather than the silent Supabase-style crash).

### `api/contact.ts`

- Accepts `POST` only; other methods return 405.
- Validates required fields (`businessName`, `email`, `phone`) are non-empty
  strings and `selectedServices` is an array; returns 400 on invalid input.
- Inserts a document `{ businessName, email, phone, selectedServices, createdAt: new Date() }`
  into the `contacts` collection.
- Returns `{ success: true }` (200) on success, `{ success: false, error }`
  (500) on DB failure.

### Frontend change

`ContactModal.tsx` `handleSubmit`: replace the Supabase insert block with:

```ts
const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    businessName: formData.businessName,
    email: formData.email,
    phone: formData.phone,
    selectedServices,
  }),
});
if (!res.ok) throw new Error('Failed to submit contact form');
```

Everything else in `handleSubmit` (the 10s timeout race, EmailJS send,
success/error UI state) is unchanged.

## Removed

- `src/lib/supabase.ts` (deleted)
- `functions/` directory (deleted, entirely — orphaned Firebase function, no
  deploy config references it)
- `@supabase/supabase-js` dependency (removed from `package.json`)
- `firebase` dependency (removed from `package.json` — confirmed unused in
  `src/`, only referenced in a stray code comment)

## Environment variables

- New: `MONGODB_URI` — Atlas connection string. Set in Vercel project settings
  (Production + Preview) and in local `.env.local` for `vercel dev`. User
  creates the Atlas free-tier (M0) cluster and provides the connection string.
- Removed (no longer read anywhere): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- Unchanged: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`,
  `VITE_EMAILJS_PUBLIC_KEY`.

## Error handling

- Missing `MONGODB_URI` at runtime: `getDb()` throws immediately with a clear
  message; `api/contact.ts` catches it and returns 500 with a generic error
  body (no internal details leaked to the client). This replaces the old
  failure mode (silent module-load crash of the whole SPA) with a contained,
  recoverable failure (form shows the existing "Something went wrong" error
  state; rest of the site keeps working).
- Frontend: unchanged existing 10s timeout race and try/catch already handle
  network/API failures; only the call target changes.

## Testing

- Local: `vercel dev` (requires Vercel CLI, linked to the Vercel project) runs
  `api/` functions alongside the Vite dev server. Manual test: submit the
  contact form, confirm a document appears in the Atlas `contacts` collection,
  confirm the EmailJS confirmation email still sends.
- Production smoke test after deploy: submit the live form once, verify the
  document in Atlas, verify the page no longer blank-screens (already
  structurally guaranteed by removing the Supabase client, but worth
  confirming end-to-end).

## Open items requiring user action (not implementable by the agent)

- Create the MongoDB Atlas free-tier (M0) cluster and provide the connection
  string.
- Add `MONGODB_URI` to Vercel project environment variables (Production +
  Preview).
