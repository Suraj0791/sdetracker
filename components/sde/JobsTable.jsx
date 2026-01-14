import { Edit, Trash2, ExternalLink } from "lucide-react";
import {
  APPLICATION_STATUSES,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "@/lib/constants";

export default function JobsTable({ jobs, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="text-6xl">📝</div>
          <h3 className="text-xl font-semibold">No jobs yet</h3>
          <p className="text-muted-foreground">
            Start tracking by adding a job or importing your CSV file
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Company
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Referral
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="hover:bg-secondary/20 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium">{job.Company}</div>
                      <div className="text-sm text-muted-foreground">
                        {job.Country}
                      </div>
                    </div>
                    {job.Careers_Page && (
                      <a
                        href={job.Careers_Page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                    {job.Category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div className="font-medium">{job.Role}</div>
                    {job.Domain && (
                      <div className="text-muted-foreground">{job.Domain}</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      STATUS_COLORS[job.Application_Status] ||
                      "bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {job.Application_Status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold border ${
                      PRIORITY_COLORS[job.Priority] || PRIORITY_COLORS[3]
                    }`}
                  >
                    {job.Priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div className="text-muted-foreground">
                      {job.Referral_Friendly}
                    </div>
                    {job.Referral_Status && (
                      <div className="text-xs text-muted-foreground">
                        {job.Referral_Status}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(job)}
                      className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(job.id)}
                      className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3 bg-secondary/20">
        <p className="text-sm text-muted-foreground">
          Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </p>
      </div>
    </div>
  );
}
