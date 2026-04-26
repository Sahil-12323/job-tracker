# Setup Guide

## 1) Supabase

1. Create a Supabase project.
2. Run the SQL in `backend/supabase/migrations/20260426_init.sql`.
3. Enable Email auth provider.
4. Add redirect URL for Expo auth callback.

## 2) Gmail OAuth

1. Create Google Cloud OAuth credentials.
2. Enable Gmail API.
3. Add scopes:
   - `openid`
   - `email`
   - `profile`
   - `https://www.googleapis.com/auth/gmail.readonly`
4. Set callback URL to your backend endpoint:
   - `https://<your-api>/auth/google/callback`

## 3) Mobile env

Create `apps/mobile/.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_API_BASE_URL=
EXPO_PUBLIC_GOOGLE_CLIENT_ID=
EXPO_PUBLIC_GROK_API_KEY=
```

## 4) API env

Create `backend/api/.env`:

```env
PORT=8080
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
GROK_API_KEY=
```

## 5) Notifications

- Configure Expo push credentials for iOS/Android.
- Store `expo_push_token` in user profile table (optional extension).

## 6) OCR options

- On-device: `react-native-mlkit-ocr` (recommended in bare workflow)
- Managed workflow fallback: send image to backend OCR provider

This repository ships with an OCR adapter abstraction so you can switch providers.
