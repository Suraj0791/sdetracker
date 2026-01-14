import { Edit, Trash2, ExternalLink } from "lucide-react";
import { PRIORITY_COLORS, STATUS_COLORS } from "@/lib/constants";

export default function ProductTable({
  jobs,
  onEdit,
  onDelete,
  onViewDetails,
}) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="text-6xl">🎯</div>
          <h3 className="text-xl font-semibold">No product jobs yet</h3>
          <p className="text-muted-foreground">
            Start tracking PM roles by adding a job or importing your CSV
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
                SQL Level
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
                      <button
                        onClick={() => onViewDetails(job)}
                        className="font-medium hover:text-primary transition-colors text-left"
                      >
                        {job.company}
                      </button>
                      <div className="text-sm text-muted-foreground">
                        {job.country}
                      </div>
                    </div>
                    {job.careers_page && (
                      <a
                        href={job.careers_page}
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
                    {job.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div className="font-medium">{job.target_role}</div>
                    {job.product_domain && (
                      <div className="text-muted-foreground">
                        {job.product_domain}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      STATUS_COLORS[job.application_status] ||
                      "bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {job.application_status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold border ${
                      PRIORITY_COLORS[job.priority] || PRIORITY_COLORS[3]
                    }`}
                  >
                    {job.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {job.sql_level}
                  </span>
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

      <div className="border-t border-border px-4 py-3 bg-secondary/20">
        <p className="text-sm text-muted-foreground">
          Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </p>
      </div>
    </div>
  );
}
