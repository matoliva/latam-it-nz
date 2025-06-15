import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Users, MapPin, Calendar, Code, Banknote } from 'lucide-react';

interface Technology {
  id: string;
  name: string;
}

interface JobPosition {
  id: string;
  jobTitle: string;
  company: string;
  jobPortal?: string;
  sponsor?: boolean;
  rating?: number;
  publishedDate: string;
  description?: any; // RichText type from Payload
  jobImage?: { url: string; };
  technologies?: string[] | Technology[]; // Update this to reflect both possible states
  jobType?: string;
  experienceLevel?: string;
  salaryRange?: string;
  responsibilities?: any;
  qualifications?: any;
  benefits?: any;
  locationType?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  timezone?: string;
  applicationUrl?: string;
  applicationEmail?: string;
  applicationDeadline?: string;
  companyDescription?: any;
  companyWebsite?: string;
  companyLogo?: { url: string; };
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface JobPositionsResponse {
  docs: JobPosition[];
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

interface TechnologiesResponse {
  docs: Technology[];
}

async function getJobPositions(): Promise<JobPosition[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/job-positions`, { cache: 'no-store' }); // Removed depth=1
    if (!res.ok) {
      throw new Error(`Failed to fetch job positions: ${res.statusText}`);
    }
    const data: JobPositionsResponse = await res.json();
    return data.docs;
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return [];
  }
}

async function getTechnologiesByIds(ids: string[]): Promise<Map<string, Technology>> {
  if (ids.length === 0) return new Map();

  try {
    // Build a comma-separated string of IDs for the 'where' clause
    const idQuery = ids.join(',');
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/technologies?where[id][in]=${idQuery}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch technologies: ${res.statusText}`);
    }
    const data: TechnologiesResponse = await res.json();
    const technologiesMap = new Map<string, Technology>();
    data.docs.forEach(tech => technologiesMap.set(tech.id, tech));
    return technologiesMap;
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return new Map();
  }
}

export default async function JobsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const jobPositions = await getJobPositions();

  // Extract all unique technology IDs
  const technologyIds = new Set<string>();
  jobPositions.forEach(job => {
    if (Array.isArray(job.technologies)) {
      job.technologies.forEach(tech => {
        if (typeof tech === 'string') { // If it's still an ID
          technologyIds.add(tech);
        } else { // If it's already a populated object (unlikely, but for safety)
          technologyIds.add(tech.id);
        }
      });
    }
  });

  const technologiesMap = await getTechnologiesByIds(Array.from(technologyIds));

  // Map technology IDs to full technology objects
  const populatedJobPositions = jobPositions.map(job => {
    if (Array.isArray(job.technologies)) {
      const populatedTechnologies = job.technologies.map(tech => {
        const techId = typeof tech === 'string' ? tech : tech.id;
        return technologiesMap.get(techId) || { id: techId, name: 'Unknown Technology' }; // Fallback
      }).filter(Boolean) as Technology[]; // Filter out any undefineds and cast

      return { ...job, technologies: populatedTechnologies };
    }
    return job;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Open Job Positions ({lang.toUpperCase()})</h1>
      {
        populatedJobPositions.length === 0 ? (
          <p>No job positions found at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {populatedJobPositions.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{job.jobTitle}</CardTitle>
                  <CardDescription className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    {job.company}
                    {job.jobPortal && (
                      <>
                        <span className="mx-1">•</span>
                        <Badge variant="outline" className="text-xs py-0.5 px-2">{job.jobPortal}</Badge>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2 text-foreground">
                  <div className="flex flex-wrap gap-1">
                    {job.jobType && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                        <Clock className="h-3 w-3 mr-1" /> {job.jobType}
                      </Badge>
                    )}
                    {job.experienceLevel && (
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs">
                        <Users className="h-3 w-3 mr-1" /> {job.experienceLevel}
                      </Badge>
                    )}
                    {job.locationType && (
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs">
                        <MapPin className="h-3 w-3 mr-1" /> {job.locationType}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {job.city && (
                      <div className="flex items-center text-base text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" /> {job.city}
                      </div>
                    )}
                    {job.salaryRange && (
                      <div className="flex items-center text-base text-muted-foreground">
                        <Banknote className="h-4 w-4 mr-1" /> {job.salaryRange}
                      </div>
                    )}
                  </div>

                  {job.publishedDate && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" /> Posted on {new Date(job.publishedDate).toLocaleDateString()}
                    </div>
                  )}

                  {job.description && (
                    <div className="mt-4 pt-4 border-t text-muted-foreground">
                      <h3 className="text-lg font-medium mb-2">Description:</h3>
                    </div>
                  )}

                  {job.responsibilities && (
                    <div className="mt-4 pt-4 border-t text-muted-foreground">
                      <h3 className="text-lg font-medium mb-2">Responsibilities:</h3>
                    </div>
                  )}

                  {job.qualifications && (
                    <div className="mt-4 pt-4 border-t text-muted-foreground">
                      <h3 className="text-lg font-medium mb-2">Qualifications:</h3>
                    </div>
                  )}

                  {job.benefits && (
                    <div className="mt-4 pt-4 border-t text-muted-foreground">
                      <h3 className="text-lg font-medium mb-2">Benefits:</h3>
                    </div>
                  )}

                  {job.technologies && job.technologies.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="text-lg font-medium flex items-center mb-2">
                        <Code className="h-5 w-5 mr-2" /> Technologies:
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(job.technologies as Technology[]).map((tech) => (
                          <Badge key={tech.id} variant="secondary">{tech.name}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                {job.applicationUrl && (
                  <CardFooter className="mt-auto">
                    <Button asChild>
                      <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )
      }
    </div>
  );
} 