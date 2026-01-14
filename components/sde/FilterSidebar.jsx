import { X } from "lucide-react";
import {
  SDE_CATEGORIES,
  APPLICATION_STATUSES,
  PRIORITIES,
  REFERRAL_FRIENDLY,
} from "@/lib/constants";

export default function FilterSidebar({ filters, setFilters }) {
  const handleToggle = (filterType, value) => {
    setFilters((prev) => {
      const current = prev[filterType];
      const isSelected = current.includes(value);

      return {
        ...prev,
        [filterType]: isSelected
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      statuses: [],
      priorities: [],
      referralFriendly: [],
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.statuses.length +
    filters.priorities.length +
    filters.referralFriendly.length;

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-6 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
          {SDE_CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleToggle("categories", category)}
                className="w-4 h-4 rounded border-border bg-background checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
        <div className="space-y-1.5">
          {APPLICATION_STATUSES.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.statuses.includes(status)}
                onChange={() => handleToggle("statuses", status)}
                className="w-4 h-4 rounded border-border bg-background checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                {status}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
        <div className="flex gap-2">
          {PRIORITIES.map((priority) => (
            <button
              key={priority}
              onClick={() => handleToggle("priorities", priority)}
              className={`
                w-10 h-10 rounded-lg border font-semibold text-sm transition-all
                ${
                  filters.priorities.includes(priority)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary border-border hover:border-primary/50"
                }
              `}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Referral Friendly Filter */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">
          Referral Friendly
        </h4>
        <div className="space-y-1.5">
          {REFERRAL_FRIENDLY.map((level) => (
            <label
              key={level}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.referralFriendly.includes(level)}
                onChange={() => handleToggle("referralFriendly", level)}
                className="w-4 h-4 rounded border-border bg-background checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
