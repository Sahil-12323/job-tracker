import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { applicationsRouter } from './routes/applications.js';
import { detectionsRouter } from './routes/detections.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'jobtrackr-ai-api' }));
app.use('/applications', applicationsRouter);
app.use('/detections', detectionsRouter);

app.get('/integrations/gmail/status', (_req, res) => {
  res.json({ connected: false, authUrl: '/auth/google/start' });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`API listening on :${process.env.PORT || 8080}`);
});
