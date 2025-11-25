import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Input = forwardRef(({
  className,
  type = "text",
  label,
  error,
  icon,
  iconPosition = "left",
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
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-all duration-200",
            icon && iconPosition === "left" && "pl-11",
            icon && iconPosition === "right" && "pr-11",
            error && "border-error-500 focus:ring-error-500",
            className
          )}
          {...props}
        />
        
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name="AlertCircle" size={18} className="text-error-500" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-error-600 mt-1">{error}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input