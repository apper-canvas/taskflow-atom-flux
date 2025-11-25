import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  className,
  taskCounts = {}
}) => {
  const filters = [
    { key: "all", label: "All Tasks", count: taskCounts.all || 0 },
    { key: "active", label: "Active", count: taskCounts.active || 0 },
    { key: "completed", label: "Completed", count: taskCounts.completed || 0 },
    { key: "high", label: "High Priority", count: taskCounts.high || 0 },
    { key: "overdue", label: "Overdue", count: taskCounts.overdue || 0 }
  ]

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "primary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "flex items-center space-x-2",
            activeFilter === filter.key && "shadow-lg"
          )}
        >
          <span>{filter.label}</span>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-semibold",
            activeFilter === filter.key 
              ? "bg-white/20 text-white" 
              : "bg-gray-100 text-gray-600"
          )}>
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  )
}

export default FilterBar