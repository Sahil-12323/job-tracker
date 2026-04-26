import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';
import { parseJobSignal } from '../services/ai.js';

export const detectionsRouter = Router();

const resolveSchema = z.object({ action: z.enum(['add', 'edit', 'ignore']) });

detectionsRouter.get('/', async (_req, res) => {
  const { data, error } = await supabase.from('detection_events').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

detectionsRouter.post('/ingest', async (req, res) => {
  const { source, rawText, userId } = req.body as { source: 'email' | 'share' | 'screenshot'; rawText: string; userId: string };
  const parsed = await parseJobSignal(rawText);

  const { data, error } = await supabase
    .from('detection_events')
    .insert({
      user_id: userId,
      source,
      raw_text: rawText,
      parsed_company: parsed.company,
      parsed_role: parsed.role,
      parsed_date: parsed.date || new Date().toISOString().slice(0, 10)
    })
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

detectionsRouter.post('/:id/resolve', async (req, res) => {
  const parsed = resolveSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { data: event } = await supabase.from('detection_events').select('*').eq('id', req.params.id).single();
  if (!event) return res.status(404).json({ error: 'Event not found' });

  if (parsed.data.action === 'add') {
    await supabase.from('applications').insert({
      user_id: event.user_id,
      company_name: event.parsed_company,
      role: event.parsed_role,
      status: 'Applied',
      applied_date: event.parsed_date,
      source: event.source
    });
  }

  await supabase.from('detection_events').delete().eq('id', req.params.id);
  res.json({ ok: true });
});
