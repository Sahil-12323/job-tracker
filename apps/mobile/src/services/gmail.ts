export interface GmailConnection {
  connected: boolean;
  authUrl?: string;
}

export async function getGmailConnectionStatus(token: string): Promise<GmailConnection> {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/integrations/gmail/status`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    return { connected: false };
  }

  return response.json();
}
