import React from 'react';
import JobFilters from './JobFilters';

export interface JobPost {
  id?: string;
  title?: string;
  description?: string;
  location?: string;
  modality?: 'onsite' | 'hybrid' | 'remote';
  isSponsorAvailable?: boolean;
  publishedAt?: string;
  technologies?: string[];
  companyImageUrl?: string;
  companyName?: string;
  jobPostUrl?: string;
  salary?: string;
  jobType?: 'full-time' | 'part-time' | 'contractor';
  seniorityLevel?: 'junior' | 'mid' | 'senior' | 'lead';
  reviews?: number;
  referral?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

interface JobPositionsResponse {
  docs: JobPost[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

async function getJobPositions(): Promise<JobPost[]> {
  console.log('getJobPositions called');
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/job-positions`, { cache: 'no-store' });
    console.log('Response status:', res.status);
    if (!res.ok) {
      throw new Error(`Failed to fetch job positions: ${res.statusText}`);
    }
    const data: JobPositionsResponse = await res.json();
    console.log('jobPositions data:', data);
    
    // Transform the data to match the expected interface
    const transformedJobs: JobPost[] = data.docs.map(job => ({
      ...job,
      technologies: job.technologies?.map(tech => typeof tech === 'object' ? tech.technology : tech) || [],
      description: typeof job.description === 'object' ? extractTextFromRichText(job.description) : job.description,
    }));
    
    return transformedJobs;
  } catch (err) {
    console.error('Error fetching job positions:', err);
    return [];
  }
}

// Helper function to extract plain text from Payload's rich text format
function extractTextFromRichText(richText: any): string {
  if (!richText || !richText.root) return '';
  
  const extractText = (node: any): string => {
    if (node.type === 'text') {
      return node.text || '';
    }
    if (node.children) {
      return node.children.map(extractText).join('');
    }
    return '';
  };
  
  return richText.root.children?.map(extractText).join('\n') || '';
}


export default async function JobsPage() {
 
  const jobPositions = await getJobPositions();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-10 text-center">Open Job Positions</h1>
      <div className="w-full justify-center mb-16">
        <JobFilters jobs={jobPositions} />
      </div>
    </div>
  );
} 