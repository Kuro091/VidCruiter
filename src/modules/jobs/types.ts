export interface Job {
  title: string;
  category: string;
  city: string;
  state: string;
  date: string;
  "apply-url": string;
}

export type JobFilter = keyof Job;
export type JobFilters = JobFilter[];

export type JobFilterAndAll = keyof Job | "All";
