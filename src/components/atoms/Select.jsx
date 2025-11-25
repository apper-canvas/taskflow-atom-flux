import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({
  children,
  className,
  label,
  error,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-all duration-200 appearance-none pr-10",
            error && "border-error-500 focus:ring-error-500",
            className
          )}
          {...props}
        >
          {children}
        </select>
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ApperIcon name="ChevronDown" size={18} className="text-gray-400" />
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-error-600 mt-1">{error}</p>
      )}
    </div>
  )
})

Select.displayName = "Select"

export default Select