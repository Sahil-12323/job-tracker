# Architecture

## Data flow

1. **Manual entry** → Mobile form → API/Supabase insert.
2. **Gmail detection** → API polling/webhook → AI parse → detection event.
3. **Share intent** → App receives URL/text → parser → pre-filled form.
4. **Screenshot OCR** → OCR adapter → AI parser → detection modal.
5. **Reminder scheduler** → API cron/edge function → push notification.

## Privacy & security

- Raw email/screenshot text is processed transiently; only structured fields are persisted.
- OAuth refresh tokens are encrypted at rest (implement using KMS in production).
- Row Level Security enforces user-level data isolation.
- API validates JWT from Supabase before writes.

## Scale strategy

- Event-driven detection pipeline (`detection_events` queue table).
- Idempotency keys for Gmail message IDs and screenshot hashes.
- Stateless API deployment behind autoscaling.
