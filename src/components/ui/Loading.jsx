import { cn } from "@/utils/cn"

const Loading = ({ className, rows = 6 }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm animate-pulse border-l-4 border-gray-200"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
              <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading