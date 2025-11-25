import { useState } from "react"
import { motion } from "framer-motion"
import { format, isAfter, isBefore, addDays } from "date-fns"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)
  
  const handleToggleComplete = async () => {
    setIsCompleting(true)
    await onToggleComplete(task.Id, !task.completed)
    setIsCompleting(false)
  }

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "border-error-500"
      case "medium":
        return "border-secondary-500"
      case "low":
        return "border-accent-500"
      default:
        return "border-gray-300"
    }
  }

  const getDueDateStatus = () => {
    if (!task.dueDate) return null
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const dueDate = new Date(task.dueDate.getFullYear(), task.dueDate.getMonth(), task.dueDate.getDate())
    const tomorrow = addDays(today, 1)
    
    if (isBefore(dueDate, today)) {
      return { status: "overdue", color: "error", icon: "AlertTriangle" }
    }
    
    if (dueDate.getTime() === today.getTime()) {
      return { status: "today", color: "warning", icon: "Clock" }
    }
    
    if (dueDate.getTime() === tomorrow.getTime()) {
      return { status: "tomorrow", color: "warning", icon: "Calendar" }
    }
    
    return { status: "future", color: "success", icon: "Calendar" }
  }

  const dueDateStatus = getDueDateStatus()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border-l-4",
        getPriorityColor(),
        task.completed && "opacity-75",
        dueDateStatus?.status === "overdue" && !task.completed && "ring-1 ring-error-200",
        className
      )}
    >
      <div className="flex items-start justify-between space-x-4">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isCompleting}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold text-gray-900 mb-1",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
{task.description && (
              <div 
                className={cn(
                  "text-sm text-gray-600 mb-3 prose prose-sm max-w-none",
                  "prose-headings:text-gray-800 prose-headings:font-medium",
                  "prose-p:text-gray-600 prose-p:leading-relaxed prose-p:my-1",
                  "prose-strong:text-gray-700 prose-em:text-gray-600",
                  "prose-ul:text-gray-600 prose-ol:text-gray-600",
                  "prose-li:text-gray-600 prose-blockquote:text-gray-600",
                  "prose-code:text-gray-800 prose-code:bg-gray-100",
                  "prose-a:text-primary-600 hover:prose-a:text-primary-700",
                  task.completed && "prose-p:text-gray-400 prose-headings:text-gray-400 prose-strong:text-gray-400"
                )}
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
            )}
            
            <div className="flex items-center space-x-3">
              <Badge variant={task.priority} size="sm">
                {task.priority} priority
              </Badge>
              
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <ApperIcon 
                    name={dueDateStatus?.icon || "Calendar"} 
                    size={14} 
                    className={cn(
                      dueDateStatus?.status === "overdue" && !task.completed && "text-error-500",
                      dueDateStatus?.status === "today" && "text-warning-500",
                      dueDateStatus?.status === "future" && "text-success-500",
                      dueDateStatus?.status === "overdue" && !task.completed && "animate-pulse-ring"
                    )}
                  />
                  <span className={cn(
                    "text-xs",
                    dueDateStatus?.status === "overdue" && !task.completed && "text-error-600 font-medium",
                    dueDateStatus?.status === "today" && "text-warning-600",
                    dueDateStatus?.status === "future" && "text-gray-500"
                  )}>
                    {dueDateStatus?.status === "overdue" && !task.completed && "Overdue"}
                    {dueDateStatus?.status === "today" && "Due today"}
                    {dueDateStatus?.status === "tomorrow" && "Due tomorrow"}
                    {dueDateStatus?.status === "future" && format(task.dueDate, "MMM d")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            icon="Edit2"
            className="p-2 h-8 w-8"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.Id)}
            icon="Trash2"
            className="p-2 h-8 w-8 hover:text-error-600"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard