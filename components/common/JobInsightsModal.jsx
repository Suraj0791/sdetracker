"use client";

import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  Globe,
  ExternalLink,
  PlusCircle,
  Building2,
  Calendar,
  X,
} from "lucide-react";

export default function JobInsightsModal({
  job,
  isOpen,
  onClose,
  onAddToTracker,
}) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                {job.company}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {job.role}
            </h2>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                <Globe className="w-3.5 h-3.5" />
                {job.work_mode}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                <Calendar className="w-3.5 h-3.5" />
                {job.job_date
                  ? new Date(job.job_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent"}
              </div>
            </div>
          </div>

          <div className="space-y-8 my-8">
            {/* Quick Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-secondary/20 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Eligibility
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.eligibility}
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-secondary/20 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Experience
                </div>
                <p className="text-sm text-muted-foreground">
                  {job.experience}
                </p>
              </div>
            </div>

            {/* Description Snippet */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Role Overview
              </h3>
              <div
                className="text-sm text-muted-foreground leading-relaxed max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-secondary prose prose-invert prose-sm"
                dangerouslySetInnerHTML={{ __html: job.content }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <button
              onClick={() => onAddToTracker(job)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-all border border-border"
            >
              <PlusCircle className="w-4 h-4" />
              Add to Tracker
            </button>
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Apply now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      {/* Backdrop overlay for closing */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
