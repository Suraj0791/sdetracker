import { createBrowserClient } from "./supabase";
import Papa from "papaparse";

// Supabase Data Manager - Replaces localStorage operations
export const supabaseJobOps = {
  // Get all jobs for current user
  async getAll(table) {
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }

    return data || [];
  },

  // Add new job
  async add(table, jobData) {
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from(table)
      .insert([{ ...jobData, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update existing job
  async update(table, id, jobData) {
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from(table)
      .update(jobData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete job
  async delete(table, id) {
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  },

  // Auto-seed data for new users
  async autoSeed(table, seedCsvData) {
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Check if user already has data
    const { count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // If user has data, don't seed
    if (count > 0) return;

    // Parse CSV and insert all rows
    const result = Papa.parse(seedCsvData, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.data && result.data.length > 0) {
      const jobsToInsert = result.data.map((job) => ({
        ...job,
        user_id: user.id,
      }));

      const { error } = await supabase.from(table).insert(jobsToInsert);

      if (error) {
        console.error("Error seeding data:", error);
      } else {
        console.log(`Seeded ${jobsToInsert.length} jobs for new user!`);
      }
    }
  },

  // Import CSV (user-initiated)
  async importCSV(table, csvText) {
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.errors.length > 0) {
      throw new Error("CSV parsing failed: " + result.errors[0].message);
    }

    // Delete existing jobs
    await supabase.from(table).delete().eq("user_id", user.id);

    // Insert new jobs
    const jobsToInsert = result.data.map((job) => ({
      ...job,
      user_id: user.id,
    }));

    const { data, error } = await supabase
      .from(table)
      .insert(jobsToInsert)
      .select();

    if (error) throw error;
    return data;
  },

  // Export CSV
  async exportCSV(table) {
    const jobs = await this.getAll(table);

    // Remove Supabase-specific fields
    const cleanedJobs = jobs.map(
      ({ id, user_id, created_at, updated_at, metadata, ...job }) => job
    );

    const csv = Papa.unparse(cleanedJobs);
    return csv;
  },
};

// Helper to download file
export const downloadFile = (content, filename) => {
  const blob = new Blob([content], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
