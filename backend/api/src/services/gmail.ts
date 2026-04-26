import { google } from 'googleapis';

const keywords = ['application received', 'you applied', 'thank you for applying'];

export function getGoogleOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export async function fetchPotentialApplicationEmails(accessToken: string) {
  const auth = getGoogleOAuthClient();
  auth.setCredentials({ access_token: accessToken });
  const gmail = google.gmail({ version: 'v1', auth });

  const query = keywords.map((keyword) => `"${keyword}"`).join(' OR ');
  const list = await gmail.users.messages.list({ userId: 'me', q: query, maxResults: 20 });
  return list.data.messages || [];
}
