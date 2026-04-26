import { JobApplication, DetectionEvent } from '@/types/application';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getApplications: () => request<JobApplication[]>('/applications'),
  createApplication: (payload: Partial<JobApplication>) =>
    request<JobApplication>('/applications', { method: 'POST', body: JSON.stringify(payload) }),
  updateStatus: (id: string, status: JobApplication['status']) =>
    request<JobApplication>(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getDetectionEvents: () => request<DetectionEvent[]>('/detections'),
  resolveDetection: (id: string, action: 'add' | 'edit' | 'ignore') =>
    request<{ ok: boolean }>(`/detections/${id}/resolve`, { method: 'POST', body: JSON.stringify({ action }) })
};
