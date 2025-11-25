import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-primary-500 shadow-sm hover:shadow-md hover:scale-105",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-primary-500 hover:text-gray-700",
    danger: "bg-gradient-to-r from-error-500 to-error-600 text-white hover:from-error-600 hover:to-error-700 focus:ring-error-500 shadow-lg hover:shadow-xl hover:scale-105",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700 focus:ring-success-500 shadow-lg hover:shadow-xl hover:scale-105"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }
  
  const IconComponent = icon ? ApperIcon : null
  
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "transform-none hover:scale-100",
        className
      )}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
      )}
      
      {!loading && IconComponent && iconPosition === "left" && (
        <IconComponent name={icon} size={16} className="mr-2" />
      )}
      
      {children}
      
      {!loading && IconComponent && iconPosition === "right" && (
        <IconComponent name={icon} size={16} className="ml-2" />
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button