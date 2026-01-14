import { Briefcase, CheckCircle, Clock, Star } from "lucide-react";

export default function StatsCards({ jobs, onFilterClick, activeFilter }) {
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.application_status === "Applied").length,
    interviews: jobs.filter((j) => j.application_status === "Interview").length,
    highPriority: jobs.filter((j) => parseInt(j.priority) >= 4).length,
  };

  const cards = [
    {
      label: "Total Applications",
      value: stats.total,
      icon: Briefcase,
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
