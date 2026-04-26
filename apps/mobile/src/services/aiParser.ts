import { z } from 'zod';

const ParsedSchema = z.object({
  company: z.string(),
  role: z.string(),
  date: z.string()
});

export async function parseJobSignal(text: string) {
  const apiKey = process.env.EXPO_PUBLIC_GROK_API_KEY;

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'grok-2-latest',
      temperature: 0,
      messages: [
        { role: 'system', content: 'Extract company name, job role, and application date. Return JSON only.' },
        { role: 'user', content: text }
      ]
    })
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '{}';
  return ParsedSchema.parse(JSON.parse(content));
}
