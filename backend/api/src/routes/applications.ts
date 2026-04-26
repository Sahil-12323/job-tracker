import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';

export const applicationsRouter = Router();

const ApplicationSchema = z.object({
  companyName: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(['Applied', 'Screening', 'Interview', 'Offer', 'Rejected']).default('Applied'),
  appliedDate: z.string(),
  jobLink: z.string().optional(),
  notes: z.string().optional(),
  resumeVersion: z.string().optional(),
  followUpDate: z.string().optional(),
  source: z.enum(['manual', 'email', 'share', 'screenshot']).default('manual')
});

applicationsRouter.get('/', async (_req, res) => {
  const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(
    (data || []).map((item) => ({
      id: item.id,
      companyName: item.company_name,
      role: item.role,
      status: item.status,
      appliedDate: item.applied_date,
      jobLink: item.job_link,
      notes: item.notes,
      resumeVersion: item.resume_version,
      followUpDate: item.follow_up_date,
      source: item.source
    }))
  );
});

applicationsRouter.post('/', async (req, res) => {
  const parsed = ApplicationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { data, error } = await supabase
    .from('applications')
    .insert({
      user_id: req.header('x-user-id'),
      company_name: parsed.data.companyName,
      role: parsed.data.role,
      status: parsed.data.status,
      applied_date: parsed.data.appliedDate,
      job_link: parsed.data.jobLink,
      notes: parsed.data.notes,
      resume_version: parsed.data.resumeVersion,
      follow_up_date: parsed.data.followUpDate,
      source: parsed.data.source
    })
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

applicationsRouter.patch('/:id/status', async (req, res) => {
  const statusSchema = z.object({ status: ApplicationSchema.shape.status });
  const parsed = statusSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { data, error } = await supabase
    .from('applications')
    .update({ status: parsed.data.status })
    .eq('id', req.params.id)
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
