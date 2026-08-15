# MongoDB Backend Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Supabase (contact form storage) with MongoDB Atlas via a Vercel serverless function, and remove dead Supabase/Firebase code — fixing the blank-screen-on-missing-env-var crash as a side effect.

**Architecture:** Frontend `ContactModal.tsx` POSTs form data to a new `/api/contact` Vercel Node serverless function, which writes to a MongoDB Atlas `contacts` collection via a cached-connection helper (`api/_lib/mongodb.ts`). `src/lib/supabase.ts`, the `functions/` Firebase Cloud Function, and the `@supabase/supabase-js`/`firebase` dependencies are deleted.

**Tech Stack:** Vite + React 19 + TypeScript (existing), `mongodb` driver (native, no ODM), `@vercel/node` (types only, for `VercelRequest`/`VercelResponse`).

**Spec:** `docs/superpowers/specs/2026-08-15-mongodb-migration-design.md`

## Global Constraints

- MongoDB driver: native `mongodb` package, not Mongoose (spec decision — single simple collection, no schema/relations needed).
- API layer: Vercel serverless functions under `api/`, not a standalone server (spec decision — no separate hosting).
- No admin UI, no historical Supabase data migration (spec non-goals).
- EmailJS confirmation email flow is unchanged — only the storage call changes.
- **No test framework exists in this repo** (no vitest/jest, no `test` script). Do not introduce one for this plan — follow existing project convention. Verification steps below are manual (`vercel dev` + `curl` / browser), not automated tests. This is a deliberate deviation from default TDD process, matching what's already in the codebase.
- `MONGODB_URI` already set in local `.env.local` (gitignored) with value `mongodb+srv://inforootsdigital_db_user:<password>@digiroots.vv46glf.mongodb.net/digiroots?retryWrites=true&w=majority&appName=Digiroots`. The user must separately add the same value to Vercel project env vars (Production + Preview) — this is a manual dashboard action, not scriptable, and is called out again in Task 6.

---

### Task 1: Add MongoDB dependency, remove Supabase/Firebase dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `mongodb` package available for import in `api/`; `@vercel/node` types available for `api/contact.ts` (Task 3).

- [ ] **Step 1: Install `mongodb` and `@vercel/node`, uninstall `@supabase/supabase-js` and `firebase`**

Run:
```bash
npm install mongodb
npm install -D @vercel/node
npm uninstall @supabase/supabase-js firebase
```

- [ ] **Step 2: Verify `package.json` no longer lists Supabase/Firebase and now lists mongodb**

Run: `grep -E "supabase|firebase|mongodb|@vercel/node" package.json`
Expected: only lines for `"mongodb"` (dependencies) and `"@vercel/node"` (devDependencies) — no `supabase` or `firebase` lines.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap Supabase/Firebase deps for MongoDB driver"
```

---

### Task 2: MongoDB connection helper

**Files:**
- Create: `api/_lib/mongodb.ts`

**Interfaces:**
- Consumes: `process.env.MONGODB_URI` (string, set in `.env.local` locally and Vercel dashboard in production).
- Produces: `getDb(): Promise<Db>` — used by Task 3's `api/contact.ts`. `Db` type from the `mongodb` package.

- [ ] **Step 1: Write the connection helper**

```typescript
import { MongoClient, type Db } from 'mongodb';

let cachedClientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
  }
  return cachedClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}
```

`client.db()` with no argument uses the database name from the connection
string path (`/digiroots` — already set in `.env.local`). The module-scope
`cachedClientPromise` is reused across warm serverless invocations, avoiding a
new connection per request.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit api/_lib/mongodb.ts --module esnext --moduleResolution bundler --target es2022 --skipLibCheck`
Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add api/_lib/mongodb.ts
git commit -m "feat: add cached MongoDB connection helper"
```

---

### Task 3: Contact form API endpoint

**Files:**
- Create: `api/contact.ts`

**Interfaces:**
- Consumes: `getDb()` from `api/_lib/mongodb.ts` (Task 2).
- Produces: `POST /api/contact` endpoint — used by `ContactModal.tsx` (Task 4). Request body: `{ businessName: string, email: string, phone: string, selectedServices: string[] }`. Response: `{ success: true }` (200) or `{ success: false, error: string }` (400/405/500).

- [ ] **Step 1: Write the handler**

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_lib/mongodb';

interface ContactPayload {
  businessName: string;
  email: string;
  phone: string;
  selectedServices: string[];
}

function isValidPayload(body: unknown): body is ContactPayload {
  const b = body as Partial<ContactPayload> | null | undefined;
  return (
    typeof b?.businessName === 'string' && b.businessName.trim() !== '' &&
    typeof b?.email === 'string' && b.email.trim() !== '' &&
    typeof b?.phone === 'string' && b.phone.trim() !== '' &&
    Array.isArray(b?.selectedServices)
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  if (!isValidPayload(req.body)) {
    res.status(400).json({ success: false, error: 'Invalid contact payload' });
    return;
  }

  try {
    const db = await getDb();
    await db.collection('contacts').insertOne({
      businessName: req.body.businessName,
      email: req.body.email,
      phone: req.body.phone,
      selectedServices: req.body.selectedServices,
      createdAt: new Date(),
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to save contact submission:', err);
    res.status(500).json({ success: false, error: 'Failed to save submission' });
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit api/contact.ts --module esnext --moduleResolution bundler --target es2022 --skipLibCheck`
Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add api/contact.ts
git commit -m "feat: add POST /api/contact serverless endpoint"
```

---

### Task 4: Point the contact form at the new endpoint

**Files:**
- Modify: `src/components/ContactModal.tsx:1-3` (imports), `src/components/ContactModal.tsx:82-94` (submit logic)

**Interfaces:**
- Consumes: `POST /api/contact` from Task 3.

- [ ] **Step 1: Remove the Supabase import**

In `src/components/ContactModal.tsx`, remove line 3:
```typescript
import { supabase } from '../lib/supabase';
```

- [ ] **Step 2: Replace the Supabase insert with a fetch call**

Replace this block (originally lines 82-94):
```typescript
                // 1. Save to Supabase
                const { error: supabaseError } = await supabase
                    .from('contacts')
                    .insert([
                        {
                            business_name: formData.businessName,
                            email: formData.email,
                            phone: formData.phone,
                            selected_services: selectedServices,
                        }
                    ]);

                if (supabaseError) throw supabaseError;
```

with:
```typescript
                // 1. Save to MongoDB
                const contactRes = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        businessName: formData.businessName,
                        email: formData.email,
                        phone: formData.phone,
                        selectedServices,
                    }),
                });

                if (!contactRes.ok) throw new Error('Failed to submit contact form');
```

Everything else in `handleSubmit` (the 10s timeout race via `Promise.race`, the
EmailJS send, success/error UI state) stays unchanged.

- [ ] **Step 3: Verify the frontend still type-checks**

Run: `npx tsc -b`
Expected: no errors (this also confirms `src/lib/supabase.ts`, deleted in Task 5, isn't referenced anywhere else — if Task 5 hasn't run yet, this step may still pass since the file still exists; re-run after Task 5 too).

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactModal.tsx
git commit -m "feat: submit contact form to /api/contact instead of Supabase"
```

---

### Task 5: Remove dead Supabase client and Firebase functions

**Files:**
- Delete: `src/lib/supabase.ts`
- Delete: `functions/` (entire directory — `index.js`, `package.json`, `package-lock.json`, `.eslintrc.js`, `.gitignore`, `.env`)

**Interfaces:**
- None (pure deletion; Task 4 already removed the only import of `src/lib/supabase.ts`).

- [ ] **Step 1: Confirm nothing still imports `src/lib/supabase.ts`**

Run: `grep -rn "lib/supabase" src/`
Expected: no output.

- [ ] **Step 2: Delete the files**

```bash
git rm src/lib/supabase.ts
git rm -r functions/
```

- [ ] **Step 3: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds (no missing-module errors).

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove dead Supabase client and orphaned Firebase function"
```

**Note:** `functions/.env` (deleted here) was previously committed to git with a
real Gmail app password. Deleting it in this commit does **not** remove it
from git history — that requires a separate history-purge step (out of scope
for this plan; tracked separately, blocked on the user revoking the password
first).

---

### Task 6: End-to-end verification and deploy

**Files:** none (verification only)

**Interfaces:** none

- [ ] **Step 1: Confirm Vercel CLI is available**

Run: `npx vercel --version`
Expected: prints a version number. If not installed, `npx` will offer to
install it on first use — accept.

- [ ] **Step 2: Run the app locally with `vercel dev`**

Run: `npx vercel dev`
This links the project to Vercel on first run (follow prompts: select
existing project or create one) and serves both the Vite frontend and the
`api/` functions together, reading `MONGODB_URI` from `.env.local`.

- [ ] **Step 3: Manually submit the contact form**

In the browser (URL printed by `vercel dev`, typically `http://localhost:3000`):
open the contact modal, fill in both steps, submit.
Expected: success screen ("Request Received!") appears, no error message.

- [ ] **Step 4: Verify the submission landed in MongoDB Atlas**

In the Atlas UI: Database → Browse Collections → `digiroots` database →
`contacts` collection.
Expected: a new document with `businessName`, `email`, `phone`,
`selectedServices`, `createdAt` matching what was submitted.

- [ ] **Step 5: Verify the confirmation email still sends**

Check the inbox for the email address used in Step 3.
Expected: EmailJS confirmation email arrives (unchanged from before this
migration — confirms Task 4 didn't disturb the EmailJS call).

- [ ] **Step 6: Add `MONGODB_URI` to Vercel project environment variables**

This is a manual dashboard action (not scriptable): Vercel project → Settings
→ Environment Variables → add `MONGODB_URI` for both Production and Preview,
using the same value as in `.env.local`. Also remove the now-unused
`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` entries if present.

- [ ] **Step 7: Deploy and smoke-test production**

Push to `main` (already the deploy trigger per existing Vercel setup) or run
`npx vercel --prod`. Once deployed, open the production URL, confirm the page
renders (no blank screen), submit the contact form once, confirm a document
appears in Atlas.
