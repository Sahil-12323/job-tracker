# JobTrackr AI

Production-ready starter monorepo for **JobTrackr AI** (iOS + Android) with:

- Expo React Native mobile app
- Supabase schema + auth integration
- Node.js API service for detection pipelines
- Gmail + OCR + AI parsing architecture

## Monorepo layout

- `apps/mobile`: Expo app (Kanban, add form, detection inbox, reminders)
- `backend/supabase`: SQL migrations and auth policies
- `backend/api`: Node.js service for Gmail/OCR/AI processing
- `docs`: setup and architecture docs

## Quick start

1. Copy env templates in each package.
2. Run mobile app:
   ```bash
   cd apps/mobile
   npm install
   npm run start
   ```
3. Run backend API:
   ```bash
   cd backend/api
   npm install
   npm run dev
   ```
4. Apply database migration in Supabase SQL editor from `backend/supabase/migrations`.

See detailed instructions in `docs/setup.md`.
