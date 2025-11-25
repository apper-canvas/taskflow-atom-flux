import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const ErrorView = ({ 
  className, 
  message = "Something went wrong", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-6 text-center",
      className
    )}>
      <div className="w-16 h-16 bg-gradient-to-br from-error-100 to-error-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon 
          name="AlertTriangle" 
          size={32} 
          className="text-error-600" 
        />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-sm mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorView