import Papa from "papaparse";
import { STORAGE_KEYS } from "./constants";

// Generic Storage Operations
export const storage = {
  get: (key) => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }

      // Auto-seed data on first use
      if (key === STORAGE_KEYS.SDE_JOBS || key === STORAGE_KEYS.PRODUCT_JOBS) {
        const seedKey = `${key}_initial_seed`;
        const hasSeeded = localStorage.getItem(seedKey);

        if (!hasSeeded) {
          // Import seed data dynamically and parse CSV
          if (key === STORAGE_KEYS.SDE_JOBS) {
            import("./seedData").then(({ SDE_SEED_DATA }) => {
              import("papaparse").then((Papa) => {
                const result = Papa.default.parse(SDE_SEED_DATA, {
                  header: true,
                  skipEmptyLines: true,
                });
                const seededJobs = result.data.map((job, idx) => ({
                  ...job,
                  id: Date.now().toString() + idx,
                  createdAt: new Date().toISOString(),
                }));
                localStorage.setItem(key, JSON.stringify(seededJobs));
                localStorage.setItem(seedKey, "true");
                window.location.reload();
              });
            });
          } else if (key === STORAGE_KEYS.PRODUCT_JOBS) {
            import("./productSeedData").then(({ PRODUCT_SEED_DATA }) => {
              import("papaparse").then((Papa) => {
                const result = Papa.default.parse(PRODUCT_SEED_DATA, {
                  header: true,
                  skipEmptyLines: true,
                });
                const seededJobs = result.data.map((job, idx) => ({
                  ...job,
                  id: Date.now().toString() + idx,
                  createdAt: new Date().toISOString(),
                }));
                localStorage.setItem(key, JSON.stringify(seededJobs));
                localStorage.setItem(seedKey, "true");
                window.location.reload();
              });
            });
          }
        }
      }

      return [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },

  set: (key, data) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },

  clear: (key) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

// CRUD Operations for Jobs
export const jobOperations = {
  getAll: (storageKey) => {
    return storage.get(storageKey);
  },

  add: (storageKey, job) => {
    const jobs = storage.get(storageKey);
    const newJob = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    storage.set(storageKey, [...jobs, newJob]);
    return newJob;
  },

  update: (storageKey, id, updates) => {
    const jobs = storage.get(storageKey);
    const updatedJobs = jobs.map((job) =>
      job.id === id
        ? { ...job, ...updates, updatedAt: new Date().toISOString() }
        : job
    );
    storage.set(storageKey, updatedJobs);
    return updatedJobs.find((j) => j.id === id);
  },

  delete: (storageKey, id) => {
    const jobs = storage.get(storageKey);
    const filtered = jobs.filter((job) => job.id !== id);
    storage.set(storageKey, filtered);
  },

  importCSV: (storageKey, csvText) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const jobs = results.data.map((row, index) => ({
            ...row,
            id: Date.now().toString() + index,
            createdAt: new Date().toISOString(),
          }));
          storage.set(storageKey, jobs);
          resolve(jobs);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  },

  exportCSV: (storageKey) => {
    const jobs = storage.get(storageKey);
    // Remove internal fields
    const cleanJobs = jobs.map(({ id, createdAt, updatedAt, ...rest }) => rest);
    return Papa.unparse(cleanJobs);
  },
};

// CRUD Operations for Resources
export const resourceOperations = {
  getAll: (storageKey) => {
    return storage.get(storageKey);
  },

  add: (storageKey, resource) => {
    const resources = storage.get(storageKey);
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    storage.set(storageKey, [...resources, newResource]);
    return newResource;
  },

  update: (storageKey, id, updates) => {
    const resources = storage.get(storageKey);
    const updatedResources = resources.map((resource) =>
      resource.id === id
        ? { ...resource, ...updates, updatedAt: new Date().toISOString() }
        : resource
    );
    storage.set(storageKey, updatedResources);
    return updatedResources.find((r) => r.id === id);
  },

  delete: (storageKey, id) => {
    const resources = storage.get(storageKey);
    const filtered = resources.filter((resource) => resource.id !== id);
    storage.set(storageKey, filtered);
  },
};

// Download utility
export const downloadFile = (content, filename, contentType = "text/csv") => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
