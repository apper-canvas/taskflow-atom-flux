import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"
import ConfettiEffect from "@/components/molecules/ConfettiEffect"
import taskService from "@/services/api/taskService"
import { toast } from "react-toastify"
import { isBefore } from "date-fns"

const TaskList = ({ 
  searchQuery, 
  activeFilter, 
  onTaskUpdate,
  onEditTask 
}) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.update(taskId, { completed })
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      
      if (completed) {
        setShowConfetti(true)
        toast.success("Task completed! 🎉")
      } else {
        toast.success("Task marked as active")
      }
      
      onTaskUpdate && onTaskUpdate()
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }
    
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted successfully")
      onTaskUpdate && onTaskUpdate()
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

  const getFilteredTasks = () => {
    let filtered = tasks

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }

    // Apply status/priority filters
    switch (activeFilter) {
      case "active":
        filtered = filtered.filter(task => !task.completed)
        break
      case "completed":
        filtered = filtered.filter(task => task.completed)
        break
      case "high":
        filtered = filtered.filter(task => task.priority === "high")
        break
      case "overdue":
        {
          const now = new Date()
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          filtered = filtered.filter(task => 
            !task.completed && 
            task.dueDate && 
            isBefore(new Date(task.dueDate.getFullYear(), task.dueDate.getMonth(), task.dueDate.getDate()), today)
          )
        }
        break
      default:
        // "all" - no additional filtering
        break
    }

    return filtered
  }

  const filteredTasks = getFilteredTasks()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <ErrorView 
        message={error}
        onRetry={loadTasks}
      />
    )
  }

  if (tasks.length === 0) {
    return (
      <Empty 
        title="No tasks yet"
        message="Create your first task to get started with TaskFlow. Organize your work and boost your productivity!"
        actionText="Start Adding Tasks"
        icon="CheckSquare"
      />
    )
  }

  if (filteredTasks.length === 0) {
    const emptyMessages = {
      active: "No active tasks found. All caught up! 🎉",
      completed: "No completed tasks yet. Start checking off some tasks!",
      high: "No high priority tasks. Great job staying on top of urgent work!",
      overdue: "No overdue tasks. You're doing great with deadlines! ⭐"
    }
    
    const defaultMessage = searchQuery 
      ? `No tasks found matching "${searchQuery}"`
      : "No tasks match the current filter"
    
    return (
      <Empty 
        title="No tasks found"
        message={emptyMessages[activeFilter] || defaultMessage}
        icon="Filter"
      />
    )
  }

  return (
    <>
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.Id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={onEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </AnimatePresence>
      </div>
      
      <ConfettiEffect 
        show={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </>
  )
}

export default TaskList