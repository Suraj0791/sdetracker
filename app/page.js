import Link from "next/link";
import { Briefcase, Target, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
          Career Tracker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personal hub for tracking job applications and career resources
        </p>
      </div>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* SDE Tracker Card */}
        <Link href="/sde">
          <div className="group relative p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative space-y-4">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">SDE Tracker</h2>
                <p className="text-muted-foreground">
                  Track software engineering roles, applications, and technical
                  interview resources
                </p>
              </div>

              <div className="flex items-center text-primary text-sm font-medium">
                Open tracker
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Product Tracker Card */}
        <Link href="/product">
          <div className="group relative p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative space-y-4">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Product Tracker</h2>
                <p className="text-muted-foreground">
                  Track PM/APM roles, product case interviews, and product
                  management resources
                </p>
              </div>

              <div className="flex items-center text-primary text-sm font-medium">
                Open tracker
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="p-6 rounded-lg bg-card/50 border border-border text-center">
          <div className="text-3xl font-bold text-primary">0</div>
          <div className="text-sm text-muted-foreground mt-1">
            Total Applications
          </div>
        </div>
        <div className="p-6 rounded-lg bg-card/50 border border-border text-center">
          <div className="text-3xl font-bold text-purple-400">0</div>
          <div className="text-sm text-muted-foreground mt-1">
            Resources Saved
          </div>
        </div>
        <div className="p-6 rounded-lg bg-card/50 border border-border text-center">
          <div className="text-3xl font-bold text-blue-400">0</div>
          <div className="text-sm text-muted-foreground mt-1">
            High Priority
          </div>
        </div>
      </div>
    </div>
  );
}
