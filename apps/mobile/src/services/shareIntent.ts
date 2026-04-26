import * as Sharing from 'expo-sharing';

export async function canUseShareIntent() {
  return Sharing.isAvailableAsync();
}

export function parseSharedText(text: string) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const titleLine = lines[0] || '';
  const [role, companyName] = titleLine.includes(' at ')
    ? titleLine.split(' at ')
    : [titleLine, lines.find((line) => /inc|llc|corp|technologies/i.test(line)) || ''];

  return {
    role: role || 'Unknown Role',
    companyName: companyName || 'Unknown Company',
    jobLink: lines.find((line) => line.startsWith('http')) || ''
  };
}
