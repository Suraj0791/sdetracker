"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Upload, Download, Plus, Search, Filter, Loader2 } from "lucide-react";
import { supabaseJobOps, downloadFile } from "@/lib/supabaseDataManager";
import { SDE_SEED_DATA } from "@/lib/seedData";
import JobsTable from "@/components/sde/JobsTable";
import StatsCards from "@/components/sde/StatsCards";
import FilterSidebar from "@/components/sde/FilterSidebar";
import AddEditDialog from "@/components/sde/AddEditDialog";
import JobDetailsModal from "@/components/sde/JobDetailsModal";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SDEContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
    priorities: [],
    referralFriendly: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewingJob, setViewingJob] = useState(null);

  const searchParams = useSearchParams();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  // Handle auto-import from Opportunities page
  useEffect(() => {
    if (searchParams.get("import") === "true") {
      const savedJob = sessionStorage.getItem("importedJob");
      if (savedJob) {
        setEditingJob(JSON.parse(savedJob));
        setDialogOpen(true);
        sessionStorage.removeItem("importedJob");
        // Clear URL param without refresh
        window.history.replaceState(null, "", "/sde");
      }
    }
  }, [searchParams]);

  // Load jobs and auto-seed if needed
  useEffect(() => {
    if (user) {
      loadJobs();
    }
  }, [user]);

  const loadJobs = async () => {
    setLoading(true);
    setSeeding(true);

    try {
      // Auto-seed for new users
      await supabaseJobOps.autoSeed("sde_jobs", SDE_SEED_DATA);

      // Load all jobs
      const loadedJobs = await supabaseJobOps.getAll("sde_jobs");
      setJobs(loadedJobs);
      setFilteredJobs(loadedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
      setSeeding(false);
    }
  };

  // Handle quick filter from stats cards
  const handleQuickFilter = (filter) => {
    setActiveFilter(filter);
    // Clear sidebar filters when using quick filter
    if (filter !== "all") {
      setFilters({
        categories: [],
        statuses: [],
        priorities: [],
        referralFriendly: [],
      });
    }
  };

  // Filter jobs
  useEffect(() => {
    let result = [...jobs];

    // Apply quick filter from stats cards
    if (activeFilter === "applied") {
      result = result.filter((job) => job.application_status === "Applied");
    } else if (activeFilter === "interviews") {
      result = result.filter((job) => job.application_status === "Interview");
    } else if (activeFilter === "rejected") {
      result = result.filter((job) => job.application_status === "Rejected");
    } else if (activeFilter === "referred") {
      result = result.filter((job) => job.referral_status === "Referred");
    } else if (activeFilter === "bigTech") {
      result = result.filter((job) => job.category === "BigTech");
    } else if (activeFilter === "startup") {
      result = result.filter(
        (job) =>
          job.category?.includes("Startup") ||
          job.category === "Product" ||
          job.category === "Indian Product"
      );
    } else if (activeFilter === "highPriority") {
      result = result.filter((job) => parseInt(job.priority) >= 4);
    }
    // If "all", apply sidebar filters

    if (activeFilter === "all" && filters.categories.length > 0) {
      result = result.filter((job) =>
        filters.categories.includes(job.category)
      );
    }

    if (activeFilter === "all" && filters.statuses.length > 0) {
      result = result.filter((job) =>
        filters.statuses.includes(job.application_status)
      );
    }

    if (activeFilter === "all" && filters.priorities.length > 0) {
      result = result.filter((job) =>
        filters.priorities.includes(parseInt(job.priority))
      );
    }

    if (activeFilter === "all" && filters.referralFriendly.length > 0) {
      result = result.filter((job) =>
        filters.referralFriendly.includes(job.referral_friendly)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.company?.toLowerCase().includes(query) ||
          job.role?.toLowerCase().includes(query) ||
          job.domain?.toLowerCase().includes(query) ||
          job.notes?.toLowerCase().includes(query)
      );
    }

    setFilteredJobs(result);
  }, [jobs, filters, searchQuery, activeFilter]);

  const handleImportCSV = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvText = e.target?.result;
        await supabaseJobOps.importCSV("sde_jobs", csvText);
        await loadJobs();
        alert(`Successfully imported jobs!`);
      } catch (error) {
        alert("Error importing CSV: " + error.message);
      }
    };
    reader.readAsText(file);
  };

  const handleExportCSV = async () => {
    try {
      const csv = await supabaseJobOps.exportCSV("sde_jobs");
      downloadFile(
        csv,
        `sde-jobs-${new Date().toISOString().split("T")[0]}.csv`
      );
    } catch (error) {
      alert("Error exporting CSV: " + error.message);
    }
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setDialogOpen(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setDialogOpen(true);
  };

  const handleSaveJob = async (jobData) => {
    try {
      if (editingJob && editingJob.id) {
        await supabaseJobOps.update("sde_jobs", editingJob.id, jobData);
      } else {
        await supabaseJobOps.add("sde_jobs", jobData);
      }
      await loadJobs();
      setDialogOpen(false);
    } catch (error) {
      alert("Error saving job: " + error.message);
    }
  };

  const handleDeleteJob = async (id) => {
    if (confirm("Are you sure you want to delete this job application?")) {
      try {
        await supabaseJobOps.delete("sde_jobs", id);
        await loadJobs();
      } catch (error) {
        alert("Error deleting job: " + error.message);
      }
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">
            {seeding ? "Loading your companies..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">SDE Job Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your software engineering applications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors">
              <Upload className="w-4 h-4" />
              Import CSV
            </div>
          </label>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          <button
            onClick={handleAddJob}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Job
          </button>
        </div>
      </div>

      <StatsCards
        jobs={jobs}
        onFilterClick={handleQuickFilter}
        activeFilter={activeFilter}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by company, role, domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showFilters
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {showFilters && (
          <FilterSidebar filters={filters} setFilters={setFilters} />
        )}

        <div className={showFilters ? "" : "lg:col-span-2"}>
          <JobsTable
            jobs={filteredJobs}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            onViewDetails={setViewingJob}
          />
        </div>
      </div>

      {dialogOpen && (
        <AddEditDialog
          job={editingJob}
          onSave={handleSaveJob}
          onClose={() => setDialogOpen(false)}
        />
      )}

      {viewingJob && (
        <JobDetailsModal
          job={viewingJob}
          onClose={() => setViewingJob(null)}
          onEdit={handleEditJob}
        />
      )}
    </div>
  );
}

export default function SDEPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <SDEContent />
    </Suspense>
  );
}
