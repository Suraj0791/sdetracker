import { X } from "lucide-react";
import {
  PRODUCT_CATEGORIES,
  APPLICATION_STATUSES,
  PRIORITIES,
} from "@/lib/constants";

export default function ProductFilters({ filters, setFilters }) {
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
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.statuses.length +
    filters.priorities.length;

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-6 h-fit sticky top-20">
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

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
        <div className="space-y-1.5">
          {PRODUCT_CATEGORIES.map((category) => (
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
    </div>
  );
}
