import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({
  className,
  checked = false,
  onChange,
  disabled = false,
  label,
  ...props
}, ref) => {
  return (
    <label className={cn(
      "inline-flex items-center cursor-pointer group",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        
        <div className={cn(
          "w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center",
          "group-hover:scale-110 group-active:scale-95",
          checked 
            ? "bg-gradient-to-br from-success-500 to-success-600 border-success-500 shadow-lg" 
            : "bg-white border-gray-300 group-hover:border-gray-400",
          !disabled && "group-hover:shadow-md"
        )}>
          {checked && (
            <ApperIcon 
              name="Check" 
              size={14} 
              className="text-white animate-bounce-in" 
            />
          )}
        </div>
      </div>
      
      {label && (
        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
          {label}
        </span>
      )}
    </label>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox