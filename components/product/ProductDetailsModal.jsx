"use client";

import {
  X,
  Edit,
  ExternalLink,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  Star,
  Database,
  Target,
  工具,
} from "lucide-react";
import { PRIORITY_COLORS, STATUS_COLORS } from "@/lib/constants";

export default function ProductDetailsModal({ job, onClose, onEdit }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{job.company}</h2>
              <p className="text-sm text-muted-foreground">{job.target_role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)] scrollbar-thin">
          {/* Status & Priority */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium ${
                  STATUS_COLORS[job.application_status] ||
                  "bg-gray-500/10 text-gray-400"
                }`}
              >
                {job.application_status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Priority:</span>
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-bold border ${
                  PRIORITY_COLORS[job.priority] || PRIORITY_COLORS[3]
                }`}
              >
                {job.priority}
              </span>
            </div>

            {job.category && (
              <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-primary/10 text-primary">
                {job.category}
              </span>
            )}
          </div>

          {/* Job Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Role & Domain
              </h3>

              {job.product_domain && (
                <div>
                  <span className="text-sm text-muted-foreground">Domain:</span>
                  <p className="font-medium">{job.product_domain}</p>
                </div>
              )}

              {job.country && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Location:
                  </span>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {job.country}
                  </p>
                </div>
              )}

              {job.hiring_season && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Hiring Season:
                  </span>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {job.hiring_season}
                  </p>
                </div>
              )}

              {job.internship_type && (
                <div>
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <p className="font-medium">{job.internship_type}</p>
                </div>
              )}

              {job.conversion_potential && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Conversion Potential:
                  </span>
                  <p className="font-medium">{job.conversion_potential}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Database className="w-5 h-5" />
                Technical Skills
              </h3>

              <div>
                <span className="text-sm text-muted-foreground">
                  SQL Level:
                </span>
                <p className="font-medium">{job.sql_level}</p>
              </div>

              {job.analytics_tools && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Analytics Tools:
                  </span>
                  <p className="font-medium">{job.analytics_tools}</p>
                </div>
              )}

              {job.case_interview_focus && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Case Focus:
                  </span>
                  <p className="font-medium text-primary">
                    {job.case_interview_focus}
                  </p>
                </div>
              )}

              {job.product_sense_level && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Product Sense:
                  </span>
                  <p className="font-medium">{job.product_sense_level}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Referral Info
              </h3>

              <div>
                <span className="text-sm text-muted-foreground">Status:</span>
                <p className="font-medium">{job.referral_status}</p>
              </div>

              {job.referral_name && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Contact:
                  </span>
                  <p className="font-medium">{job.referral_name}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Links
              </h3>
              {job.careers_page && (
                <div>
                  <a
                    href={job.careers_page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline mt-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Careers Page
                  </a>
                </div>
              )}
              {job.linkedin_profile && (
                <div>
                  <a
                    href={job.linkedin_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline mt-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn Post/Profile
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {job.notes && (
            <div>
              <h3 className="text-lg font-semibold mb-2">General Notes</h3>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-muted-foreground whitespace-pre-line">
                  {job.notes}
                </p>
              </div>
            </div>
          )}

          {/* Interview Notes */}
          {job.metadata?.interview_notes && (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400" />
                Interview Experience
              </h3>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-foreground whitespace-pre-line leading-relaxed">
                  {job.metadata.interview_notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-secondary/20">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onEdit(job);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Job
          </button>
        </div>
      </div>
    </div>
  );
}
