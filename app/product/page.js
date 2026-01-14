"use client";

import { useState, useEffect } from "react";
import { Upload, Download, Plus, Search, Filter } from "lucide-react";
import { STORAGE_KEYS } from "@/lib/constants";
import { jobOperations, downloadFile } from "@/lib/dataManager";
import ProductTable from "@/components/product/ProductTable";
import ProductStats from "@/components/product/ProductStats";
import ProductFilters from "@/components/product/ProductFilters";
import ProductDialog from "@/components/product/ProductDialog";

export default function ProductPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
    priorities: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const loadedJobs = jobOperations.getAll(STORAGE_KEYS.PRODUCT_JOBS);
    setJobs(loadedJobs);
    setFilteredJobs(loadedJobs);
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (filters.categories.length > 0) {
      result = result.filter((job) =>
        filters.categories.includes(job.Category)
      );
    }

    if (filters.statuses.length > 0) {
      result = result.filter((job) =>
        filters.statuses.includes(job.Application_Status)
      );
    }

    if (filters.priorities.length > 0) {
      result = result.filter((job) =>
        filters.priorities.includes(parseInt(job.Priority))
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.Company?.toLowerCase().includes(query) ||
          job.Target_Role?.toLowerCase().includes(query) ||
          job.Product_Domain?.toLowerCase().includes(query) ||
          job.Notes?.toLowerCase().includes(query)
      );
    }

    setFilteredJobs(result);
  }, [jobs, filters, searchQuery]);

  const handleImportCSV = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvText = e.target?.result;
        const imported = await jobOperations.importCSV(
          STORAGE_KEYS.PRODUCT_JOBS,
          csvText
        );
        setJobs(imported);
        alert(`Successfully imported ${imported.length} jobs!`);
      } catch (error) {
        alert("Error importing CSV: " + error.message);
      }
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    const csv = jobOperations.exportCSV(STORAGE_KEYS.PRODUCT_JOBS);
    downloadFile(
      csv,
      `product-jobs-${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setDialogOpen(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setDialogOpen(true);
  };

  const handleSaveJob = (jobData) => {
    if (editingJob) {
      jobOperations.update(STORAGE_KEYS.PRODUCT_JOBS, editingJob.id, jobData);
    } else {
      jobOperations.add(STORAGE_KEYS.PRODUCT_JOBS, jobData);
    }
    const updated = jobOperations.getAll(STORAGE_KEYS.PRODUCT_JOBS);
    setJobs(updated);
    setDialogOpen(false);
  };

  const handleDeleteJob = (id) => {
    if (confirm("Are you sure you want to delete this job application?")) {
      jobOperations.delete(STORAGE_KEYS.PRODUCT_JOBS, id);
      const updated = jobOperations.getAll(STORAGE_KEYS.PRODUCT_JOBS);
      setJobs(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Product Job Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your PM, APM, and Product Analyst applications
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

      <ProductStats jobs={jobs} />

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
          <ProductFilters filters={filters} setFilters={setFilters} />
        )}

        <div className={showFilters ? "" : "lg:col-span-2"}>
          <ProductTable
            jobs={filteredJobs}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
          />
        </div>
      </div>

      {dialogOpen && (
        <ProductDialog
          job={editingJob}
          onSave={handleSaveJob}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}
