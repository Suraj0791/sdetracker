import {
  Target,
  CheckCircle,
  Clock,
  Star,
  XCircle,
  Users,
  Building2,
  Rocket,
} from "lucide-react";

export default function ProductStats({ jobs, onFilterClick, activeFilter }) {
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.application_status === "Applied").length,
    interviews: jobs.filter((j) => j.application_status === "Interview").length,
    rejected: jobs.filter((j) => j.application_status === "Rejected").length,
    referred: jobs.filter((j) => j.referral_status === "Referred").length,
    bigTech: jobs.filter((j) => j.category === "BigTech").length,
    startup: jobs.filter(
      (j) =>
        j.category?.includes("Startup") ||
        j.category === "Product" ||
        j.category === "Indian Product"
    ).length,
    highPriority: jobs.filter((j) => parseInt(j.priority) >= 4).length,
  };

  const cards = [
    {
      label: "Total Applications",
      value: stats.total,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
      filter: "all",
    },
    {
      label: "Applied",
      value: stats.applied,
      icon: CheckCircle,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      filter: "applied",
    },
    {
      label: "Interviews",
      value: stats.interviews,
      icon: Clock,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      filter: "interviews",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      filter: "rejected",
    },
    {
      label: "Referred",
      value: stats.referred,
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      filter: "referred",
    },
    {
      label: "BigTech",
      value: stats.bigTech,
      icon: Building2,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      filter: "bigTech",
    },
    {
      label: "Startup",
      value: stats.startup,
      icon: Rocket,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      filter: "startup",
    },
    {
      label: "High Priority",
      value: stats.highPriority,
      icon: Star,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      filter: "highPriority",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.filter;

        return (
          <button
            key={card.label}
            onClick={() => onFilterClick(card.filter)}
            className={`rounded-lg border bg-card p-4 transition-all text-left ${
              isActive
                ? "border-primary shadow-lg shadow-primary/20 scale-105"
                : "border-border hover:border-primary/50 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
              <div className="text-sm text-muted-foreground">{card.label}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
