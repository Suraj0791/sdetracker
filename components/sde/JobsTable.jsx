"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { PRIORITY_COLORS, STATUS_COLORS } from "@/lib/constants";

export default function SDETableAdvanced({ jobs, onEdit, onDelete }) {
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    // Show these by default
    company: true,
    category: true,
    role: true,
    application_status: true,
    priority: true,
    // Hide these initially - user can toggle
    country: false,
    domain: false,
    hiring_season: false,
    intern_type: false,
    ppo_probability: false,
    referral_friendly: false,
    referral_status: false,
    careers_page: false,
    notes: false,
  });
  const [expandedRows, setExpandedRows] = useState({});

  const columns = useMemo(
    () => [
      {
        id: "expand",
        header: () => null,
        cell: ({ row }) => (
          <button
            onClick={() =>
              setExpandedRows((prev) => ({
                ...prev,
                [row.id]: !prev[row.id],
              }))
            }
            className="p-1 hover:bg-secondary rounded"
          >
            {expandedRows[row.id] ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ),
        size: 40,
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 min-w-[150px]">
            <div>
              <div className="font-medium">{row.original.Company}</div>
              {row.original.Country && (
                <div className="text-xs text-muted-foreground">
                  {row.original.Country}
                </div>
              )}
            </div>
            {row.original.Careers_Page && (
              <a
                href={row.original.Careers_Page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <div className="min-w-[120px]">
            <div className="font-medium text-sm">{row.original.Role}</div>
            {row.original.Domain && (
              <div className="text-xs text-muted-foreground">
                {row.original.Domain}
              </div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "application_status",
        header: "Status",
        cell: ({ getValue }) => (
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
              STATUS_COLORS[getValue()] || "bg-gray-500/10 text-gray-400"
            }`}
          >
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ getValue }) => {
          const priority = getValue();
          return (
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold border ${
                PRIORITY_COLORS[priority] || PRIORITY_COLORS[3]
              }`}
            >
              {priority}
            </span>
          );
        },
        size: 80,
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        accessorKey: "domain",
        header: "Domain",
      },
      {
        accessorKey: "hiring_season",
        header: "Season",
      },
      {
        accessorKey: "intern_type",
        header: "Type",
      },
      {
        accessorKey: "ppo_probability",
        header: "PPO",
      },
      {
        accessorKey: "referral_friendly",
        header: "Ref Friendly",
      },
      {
        accessorKey: "referral_status",
        header: "Ref Status",
      },
      {
        accessorKey: "careers_page",
        header: "Careers URL",
        cell: ({ getValue }) => {
          const url = getValue();
          return url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs truncate max-w-[200px] block"
            >
              {url}
            </a>
          ) : null;
        },
      },
      {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground truncate max-w-[200px] block">
            {getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(row.original)}
              className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(row.original.id)}
              className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
        size: 100,
      },
    ],
    [expandedRows, onEdit, onDelete]
  );

  const table = useReactTable({
    data: jobs,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="text-6xl">💼</div>
          <h3 className="text-xl font-semibold">No SDE jobs yet</h3>
          <p className="text-muted-foreground">
            Start tracking by adding a job or importing your CSV
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Column Visibility Toggle */}
      <div className="flex flex-wrap gap-2 p-4 bg-card border border-border rounded-lg">
        <div className="text-sm font-medium text-muted-foreground mr-2">
          Show Columns:
        </div>
        {table
          .getAllLeafColumns()
          .filter((column) => column.id !== "expand" && column.id !== "actions")
          .map((column) => (
            <label
              key={column.id}
              className="flex items-center gap-1.5 px-2 py-1 bg-secondary hover:bg-secondary/80 rounded text-sm cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                className="w-3 h-3 rounded border-border"
              />
              <span className="capitalize">{column.id.replace("_", " ")}</span>
            </label>
          ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-secondary/70 transition-colors select-none"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.map((row) => (
                <>
                  <tr
                    key={row.id}
                    className="hover:bg-secondary/20 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Expanded Row Details */}
                  {expandedRows[row.id] && (
                    <tr className="bg-secondary/10">
                      <td
                        colSpan={row.getVisibleCells().length}
                        className="px-4 py-4"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Hiring Season:</span>
                            <p className="text-muted-foreground">
                              {row.original.Hiring_Season}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Intern Type:</span>
                            <p className="text-muted-foreground">
                              {row.original.Intern_Type}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">
                              PPO Probability:
                            </span>
                            <p className="text-muted-foreground">
                              {row.original.PPO_Probability}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">
                              Referral Friendly:
                            </span>
                            <p className="text-muted-foreground">
                              {row.original.Referral_Friendly}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">
                              Referral Status:
                            </span>
                            <p className="text-muted-foreground">
                              {row.original.Referral_Status}
                            </p>
                          </div>
                          {row.original.Referral_Name && (
                            <div>
                              <span className="font-medium">
                                Referral Contact:
                              </span>
                              <p className="text-muted-foreground">
                                {row.original.Referral_Name}
                              </p>
                            </div>
                          )}
                          {row.original.Notes && (
                            <div className="col-span-2 md:col-span-3">
                              <span className="font-medium">Notes:</span>
                              <p className="text-muted-foreground">
                                {row.original.Notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border px-4 py-3 bg-secondary/20 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
          </p>
          <p className="text-xs text-muted-foreground">
            Click row to expand • Click column to sort
          </p>
        </div>
      </div>
    </div>
  );
}
