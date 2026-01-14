"use client";

import { useState, useEffect } from "react";
import {
  ExternalLink,
  Plus,
  Loader2,
  Briefcase,
  Calendar,
  Info,
  ChevronDown,
} from "lucide-react";
import JobInsightsModal from "./JobInsightsModal";

export default function ExternalJobs({ type = "sde", onAddToTracker }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  useEffect(() => {
    // Reset when type changes
    setJobs([]);
    setPage(1);
    setHasMore(true);
    fetchJobs(1, true);
  }, [type]);

  async function fetchJobs(pageNum, isInitial = false) {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(`/api/jobs?type=${type}&page=${pageNum}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      if (data.length < 12) setHasMore(false);

      setJobs((prev) => (isInitial ? data : [...prev, ...data]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(nextPage);
  };

  const openInsights = (job) => {
    setSelectedJob(job);
    setIsInsightsOpen(true);
  };

  const extractApplyLink = (content) => {
    const match =
      content.match(/href="([^"]*)"[^>]*>Apply Link/i) ||
      content.match(/href="([^"]*)"[^>]*>Apply Here/i) ||
      content.match(/href="([^"]*)"[^>]*>Direct Link/i);
    return match ? match[1] : null;
  };

  if (loading && page === 1) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4 bg-card/50 rounded-xl border border-dashed border-border">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">
          Hunting for latest {type === "sde" ? "SDE" : "Product"} openings...
        </p>
      </div>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <div className="p-6 text-center bg-destructive/10 border border-destructive/20 rounded-xl">
        <p className="text-destructive font-medium">Unable to load openings</p>
        <button
          onClick={() => fetchJobs(1, true)}
          className="mt-2 text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">Recent Discoveries</h3>
          <span className="ml-2 text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full uppercase tracking-tighter">
            Live Updates
          </span>
        </div>
        <p className="text-xs text-muted-foreground italic hidden sm:block">
          Synced with JobCode.in
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {jobs.length === 0 ? (
          <div className="col-span-full p-12 text-center text-muted-foreground bg-card rounded-2xl border border-dashed border-border">
            No openings found in the current pool.
          </div>
        ) : (
          jobs.map((job) => {
            const applyLink = extractApplyLink(job.content) || job.link;
            const jobDate = job.job_date
              ? new Date(job.job_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "Recent";

            return (
              <div
                key={job.id || job.external_id}
                className="group p-5 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 relative flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest truncate">
                        {job.company}
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground line-clamp-2 text-lg leading-tight group-hover:text-primary transition-colors">
                      {job.role}
                    </h4>
                  </div>
                  <div className="text-[10px] font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md shrink-0 border border-border/50">
                    {jobDate}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {job.work_mode && (
                    <div className="px-2 py-0.5 rounded-md bg-secondary/30 text-[10px] text-muted-foreground border border-border">
                      {job.work_mode}
                    </div>
                  )}
                  {job.experience && (
                    <div className="px-2 py-0.5 rounded-md bg-secondary/30 text-[10px] text-muted-foreground border border-border">
                      {job.experience}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => openInsights(job)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold hover:bg-secondary/80 transition-colors border border-border"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Details
                  </button>
                  <a
                    href={applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
                  >
                    Apply Now
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() =>
                      onAddToTracker({
                        company: job.company,
                        role: job.role,
                        target_role: job.role,
                        careers_page: applyLink,
                        category: type === "sde" ? "BigTech" : "Fintech",
                        notes: `Imported from JobCode.in (Insights: ${job.experience}, ${job.work_mode})`,
                      })
                    }
                    className="p-2.5 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors border border-border"
                    title="Add to My Tracker"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {hasMore && jobs.length > 0 && (
        <div className="flex justify-center pt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-card border border-border hover:border-primary/50 text-sm font-bold transition-all hover:shadow-lg disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Discoveries
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Insights Modal */}
      <JobInsightsModal
        job={selectedJob}
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
        onAddToTracker={onAddToTracker}
      />

      <p className="text-[10px] text-center text-muted-foreground italic pt-8 opacity-60">
        Discoveries are kept for up to 7 days from JobCode.in. Always verify
        official links.
      </p>
    </div>
  );
}
