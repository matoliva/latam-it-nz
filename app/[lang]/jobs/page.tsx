import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, Calendar, Code, Banknote, Star } from 'lucide-react';
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
    return data.docs;
  } catch (err) {
    console.error('Error fetching job positions:', err);
    return [];
  }
}

// Helper to extract plain text from Payload rich text
function extractPlainTextFromPayloadRichText(richText: any): string {
  if (!richText || typeof richText !== 'object') return '';
  // Payload rich text root is usually { root: { children: [...] } }
  const root = richText.root || richText;
  let text = '';
  if (Array.isArray(root.children)) {
    for (const child of root.children) {
      if (child.type === 'paragraph' && Array.isArray(child.children)) {
        for (const grandChild of child.children) {
          if (grandChild.text) text += grandChild.text + '\n';
        }
      }
    }
  }
  return text.trim();
}

export default async function JobsPage({ params }: { params: Promise<any> }) {
  const { lang } = await params;
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