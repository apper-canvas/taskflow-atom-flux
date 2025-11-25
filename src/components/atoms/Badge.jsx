import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full"
  
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700",
    secondary: "bg-secondary-100 text-secondary-700",
    success: "bg-success-100 text-success-700",
    warning: "bg-warning-100 text-warning-700",
    error: "bg-error-100 text-error-700",
    high: "bg-gradient-to-r from-error-100 to-error-200 text-error-700 border border-error-200",
    medium: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 border border-secondary-200",
    low: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700 border border-accent-200"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge