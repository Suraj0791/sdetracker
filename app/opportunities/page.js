"use client";

import { useState } from "react";
import { Sparkles, Briefcase, Target, Info } from "lucide-react";
import ExternalJobs from "@/components/common/ExternalJobs";
import { useRouter } from "next/navigation";

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState("sde");
  const router = useRouter();

  const handleAddToTracker = (jobData) => {
    // Navigate to the respective tracker with pre-filled state
    // For now, we'll store in sessionStorage or pass via query params
    // Simply saving to local storage for the AddEditDialog to pick up
    sessionStorage.setItem("importedJob", JSON.stringify(jobData));
    router.push(
      activeTab === "sde" ? "/sde?import=true" : "/product?import=true"
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-background border border-primary/20 p-8 md:p-12">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Live Opportunities
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover Your Next{" "}
            <span className="text-primary italic">Career Move</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We track top hiring portals so you don't have to. Browse the latest
            openings and add them to your personal tracker with one click.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Tabs Layout */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-px">
          <div className="flex p-1 bg-secondary/50 rounded-xl border border-border">
            <button
              onClick={() => setActiveTab("sde")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "sde"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              SDE Openings
            </button>
            <button
              onClick={() => setActiveTab("product")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "product"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Target className="w-4 h-4" />
              Product Openings
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <ExternalJobs
            key={activeTab} // Re-mount when tab changes
            type={activeTab}
            onAddToTracker={handleAddToTracker}
          />
        </div>
      </div>

      {/* Resources Preview (Future) */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-colors group">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            Interview Resources
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Curated guides, mock interview platforms, and company-specific
            question banks coming soon.
          </p>
          <div className="inline-flex items-center text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">
            COMING SOON
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-colors group">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            Resume Tailoring
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            AI-powered resume suggestions based on the job links you track.
            Improve your callback rates.
          </p>
          <div className="inline-flex items-center text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">
            COMING SOON
          </div>
        </div>
      </div>
    </div>
  );
}
