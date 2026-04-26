import { z } from 'zod';

const ParsedSignal = z.object({
  company: z.string(),
  role: z.string(),
  date: z.string().optional()
});

export async function parseJobSignal(rawText: string) {
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'grok-2-latest',
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: 'Extract company name, job role, and application date from this text. Return JSON only.'
        },
        { role: 'user', content: rawText }
      ]
    })
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '{}';
  return ParsedSignal.parse(JSON.parse(content));
}
