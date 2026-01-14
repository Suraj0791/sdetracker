import { Target, CheckCircle, Clock, Star } from "lucide-react";

export default function ProductStats({ jobs }) {
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.Application_Status === "Applied").length,
    interviews: jobs.filter((j) => j.Application_Status === "Interview").length,
    highPriority: jobs.filter((j) => parseInt(j.Priority) >= 4).length,
  };

  const cards = [
    {
      label: "Total Applications",
      value: stats.total,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Applied",
      value: stats.applied,
      icon: CheckCircle,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Interviews",
      value: stats.interviews,
      icon: Clock,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "High Priority",
      value: stats.highPriority,
      icon: Star,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors"
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
          </div>
        );
      })}
    </div>
  );
}
