"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, Calendar, Code, Banknote, Star } from "lucide-react";

export interface JobPost {
  id?: string;
  title?: string;
  description?: string;
  location?: string;
  modality?: "onsite" | "hybrid" | "remote";
  isSponsorAvailable?: boolean;
  publishedAt?: string;
  technologies?: any[];
  companyImageUrl?: string;
  companyName?: string;
  jobPostUrl?: string;
  salary?: string;
  jobType?: "full-time" | "part-time" | "contractor";
  seniorityLevel?: "junior" | "mid" | "senior" | "lead";
  reviews?: number;
  referral?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

function extractPlainTextFromPayloadRichText(richText: any): string {
  if (!richText || typeof richText !== "object") return "";
  const root = richText.root || richText;
  let text = "";
  if (Array.isArray(root.children)) {
    for (const child of root.children) {
      if (child.type === "paragraph" && Array.isArray(child.children)) {
        for (const grandChild of child.children) {
          if (grandChild.text) text += grandChild.text + "\n";
        }
      }
    }
  }
  return text.trim();
}

interface JobFiltersProps {
  jobs: JobPost[];
}

const JobFilters: React.FC<JobFiltersProps> = ({ jobs }) => {
  const [sponsorOnly, setSponsorOnly] = useState(false);
  const [technology, setTechnology] = useState<string>("");
  const [sortByDate, setSortByDate] = useState<"newest" | "oldest">("newest");

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    jobs.forEach((job) => {
      if (Array.isArray(job.technologies)) {
        job.technologies.forEach((techObj) => {
          if (typeof techObj === "string") techSet.add(techObj);
          else if (typeof techObj === "object" && techObj !== null && techObj.technology) techSet.add(techObj.technology);
        });
      }
    });
    return Array.from(techSet).sort();
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (sponsorOnly) {
      filtered = filtered.filter((job) => job.isSponsorAvailable);
    }
    if (technology) {
      filtered = filtered.filter((job) =>
        Array.isArray(job.technologies) &&
        job.technologies.some((techObj) =>
          (typeof techObj === "string" && techObj === technology) ||
          (typeof techObj === "object" && techObj !== null && techObj.technology === technology)
        )
      );
    }
    filtered = filtered.slice().sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return sortByDate === "newest" ? dateB - dateA : dateA - dateB;
    });
    return filtered;
  }, [jobs, sponsorOnly, technology, sortByDate]);

  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-6 mb-8 items-center justify-center">
        <label className="flex items-center gap-2 align-middle">
          <input type="checkbox" checked={sponsorOnly} onChange={e => setSponsorOnly(e.target.checked)} />
          Sponsor only
        </label>
        <label className="flex items-center gap-2 align-middle">
          Technology:
          <select value={technology} onChange={e => setTechnology(e.target.value)} className="border rounded px-2 py-1">
            <option value="">All</option>
            {allTechnologies.map((tech) => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 align-middle">
          Sort by date:
          <select value={sortByDate} onChange={e => setSortByDate(e.target.value as any)} className="border rounded px-2 py-1">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
            <p>No job positions found with the selected filters.</p>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    {job.companyName && <span>{job.companyName}</span>}
                    {job.isSponsorAvailable && (
                      <Badge variant="outline" className="text-xs py-0.5 px-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Sponsor</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-2 text-foreground">
                  <div className="flex flex-wrap gap-1">
                    {job.jobType && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                        <Clock className="h-3 w-3 mr-1" /> {job.jobType}
                      </Badge>
                    )}
                    {job.seniorityLevel && (
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs">
                        <Users className="h-3 w-3 mr-1" /> {job.seniorityLevel}
                      </Badge>
                    )}
                    {job.modality && (
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs">
                        <MapPin className="h-4 w-4 mr-1" /> {job.modality}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {job.location && (
                      <div className="flex items-center text-base text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" /> {job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center text-base text-muted-foreground">
                        <Banknote className="h-4 w-4 mr-1" /> {job.salary}
                      </div>
                    )}
                  </div>
                  {job.publishedAt && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" /> Posted on {new Date(job.publishedAt).toLocaleDateString()}
                    </div>
                  )}
                  {job.reviews && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" /> {job.reviews} / 5
                    </div>
                  )}
                  {job.description && (
                    <div className="mt-4 pt-4 border-t text-muted-foreground">
                      <h3 className="text-lg font-medium mb-2">Description:</h3>
                      <div>{typeof job.description === 'string' ? job.description : extractPlainTextFromPayloadRichText(job.description)}</div>
                    </div>
                  )}
                  {job.technologies && job.technologies.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="text-lg font-medium flex items-center mb-2">
                        <Code className="h-5 w-5 mr-2" /> Technologies:
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {job.technologies.map((techObj, idx) => {
                          if (typeof techObj === 'string') {
                            return <Badge key={idx} variant="secondary">{techObj}</Badge>;
                          } else if (typeof techObj === 'object' && techObj !== null) {
                            const obj = techObj as any;
                            return <Badge key={obj.id || idx} variant="secondary">{obj.technology}</Badge>;
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}
                  {job.referral && (job.referral.name || job.referral.phone || job.referral.email) && (
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="text-lg font-medium mb-2">Referral Information:</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {job.referral.name && <li><strong>Name:</strong> {job.referral.name}</li>}
                        {job.referral.phone && <li><strong>Phone:</strong> {job.referral.phone}</li>}
                        {job.referral.email && <li><strong>Email:</strong> {job.referral.email}</li>}
                      </ul>
                    </div>
                  )}
                </CardContent>
                {job.jobPostUrl && (
                  <CardFooter className="mt-auto">
                    <Button asChild>
                      <a href={job.jobPostUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default JobFilters; 