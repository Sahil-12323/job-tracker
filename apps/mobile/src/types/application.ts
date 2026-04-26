export type ApplicationStatus = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
export type SourceType = 'manual' | 'email' | 'share' | 'screenshot';

export interface JobApplication {
  id: string;
  companyName: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string;
  jobLink?: string;
  notes?: string;
  resumeVersion?: string;
  followUpDate?: string;
  source: SourceType;
}

export interface DetectionEvent {
  id: string;
  source: Exclude<SourceType, 'manual'>;
  rawText: string;
  parsed: Pick<JobApplication, 'companyName' | 'role' | 'appliedDate'>;
  createdAt: string;
}
