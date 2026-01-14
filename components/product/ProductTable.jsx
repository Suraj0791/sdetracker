import { useState } from "react";
import {
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Check,
} from "lucide-react";
import { PRIORITY_COLORS, STATUS_COLORS } from "@/lib/constants";

export default function ProductTable({
  jobs,
  onEdit,
  onDelete,
  onViewDetails,
}) {
  const [columnVisibility, setColumnVisibility] = useState({
    company: true,
    category: true,
    role: true,
    status: true,
    priority: true,
    sql_level: true,
    country: false,
    domain: false,
    analytics: false,
    case_focus: false,
    referral: false,
    notes: false,
    interview_notes: false,
  });

  const toggleColumn = (col) => {
    setColumnVisibility((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const columns = [
    { id: "company", label: "Company", visible: columnVisibility.company },
    { id: "category", label: "Category", visible: columnVisibility.category },
    { id: "role", label: "Role", visible: columnVisibility.role },
    { id: "status", label: "Status", visible: columnVisibility.status },
    { id: "priority", label: "Priority", visible: columnVisibility.priority },
    {
      id: "sql_level",
      label: "SQL Level",
      visible: columnVisibility.sql_level,
    },
    { id: "country", label: "Country", visible: columnVisibility.country },
    { id: "domain", label: "Domain", visible: columnVisibility.domain },
    {
      id: "analytics",
      label: "Analytics Tools",
      visible: columnVisibility.analytics,
    },
    {
      id: "case_focus",
      label: "Case Focus",
      visible: columnVisibility.case_focus,
    },
    { id: "referral", label: "Referral", visible: columnVisibility.referral },
    { id: "notes", label: "Notes", visible: columnVisibility.notes },
    {
      id: "interview_notes",
      label: "Interview Notes",
      visible: columnVisibility.interview_notes,
    },
  ];

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
    <div className="space-y-4">
      {/* Column Toggles */}
      <div className="bg-card border border-border rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground px-1">
          Show Columns:
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {columns.map((col) => (
            <label
              key={col.id}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={col.visible}
                  onChange={() => toggleColumn(col.id)}
                  className="peer h-4 w-4 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground accent-primary"
                />
              </div>
              <span
                className={`text-sm transition-colors ${
                  col.visible
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {col.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                {columnVisibility.company && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Company
                  </th>
                )}
                {columnVisibility.category && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                )}
                {columnVisibility.role && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Role
                  </th>
                )}
                {columnVisibility.status && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                )}
                {columnVisibility.priority && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Priority
                  </th>
                )}
                {columnVisibility.sql_level && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    SQL Level
                  </th>
                )}
                {columnVisibility.country && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Country
                  </th>
                )}
                {columnVisibility.domain && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Domain
                  </th>
                )}
                {columnVisibility.analytics && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Analytics
                  </th>
                )}
                {columnVisibility.case_focus && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Case Focus
                  </th>
                )}
                {columnVisibility.referral && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Referral
                  </th>
                )}
                {columnVisibility.notes && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Notes
                  </th>
                )}
                {columnVisibility.interview_notes && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Interview Notes
                  </th>
                )}
                <th className="px-4 py-3 text-right text-sm font-semibold whitespace-nowrap">
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
                  {columnVisibility.company && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <div className="truncate">
                          <button
                            onClick={() => onViewDetails(job)}
                            className="font-medium hover:text-primary transition-colors text-left block truncate"
                          >
                            {job.company}
                          </button>
                        </div>
                        {job.careers_page && (
                          <a
                            href={job.careers_page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 shrink-0"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                  )}
                  {columnVisibility.category && (
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                        {job.category}
                      </span>
                    </td>
                  )}
                  {columnVisibility.role && (
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className="font-medium truncate max-w-[150px]">
                          {job.target_role}
                        </div>
                      </div>
                    </td>
                  )}
                  {columnVisibility.status && (
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                          STATUS_COLORS[job.application_status] ||
                          "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {job.application_status}
                      </span>
                    </td>
                  )}
                  {columnVisibility.priority && (
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold border ${
                          PRIORITY_COLORS[job.priority] || PRIORITY_COLORS[3]
                        }`}
                      >
                        {job.priority}
                      </span>
                    </td>
                  )}
                  {columnVisibility.sql_level && (
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {job.sql_level}
                      </span>
                    </td>
                  )}
                  {columnVisibility.country && (
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {job.country}
                    </td>
                  )}
                  {columnVisibility.domain && (
                    <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[150px]">
                      {job.product_domain}
                    </td>
                  )}
                  {columnVisibility.analytics && (
                    <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[150px]">
                      {job.analytics_tools}
                    </td>
                  )}
                  {columnVisibility.case_focus && (
                    <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[150px]">
                      {job.case_interview_focus}
                    </td>
                  )}
                  {columnVisibility.referral && (
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        <div className="font-medium">{job.referral_status}</div>
                        {job.referral_name && (
                          <div className="text-muted-foreground italic">
                            {job.referral_name}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                  {columnVisibility.notes && (
                    <td className="px-4 py-3">
                      <div
                        className="text-sm text-muted-foreground truncate max-w-[150px]"
                        title={job.notes}
                      >
                        {job.notes}
                      </div>
                    </td>
                  )}
                  {columnVisibility.interview_notes && (
                    <td className="px-4 py-3">
                      <div
                        className="text-sm text-muted-foreground truncate max-w-[150px]"
                        title={job.metadata?.interview_notes}
                      >
                        {job.metadata?.interview_notes}
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
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
    </div>
  );
}
