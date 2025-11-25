import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TaskForm from "@/components/molecules/TaskForm"
import TaskList from "@/components/organisms/TaskList"
import SearchBar from "@/components/molecules/SearchBar"
import FilterBar from "@/components/molecules/FilterBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import taskService from "@/services/api/taskService"
import { toast } from "react-toastify"
import { isBefore } from "date-fns"

const TaskManager = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [taskCounts, setTaskCounts] = useState({})

  useEffect(() => {
    updateTaskCounts()
  }, [])

  const updateTaskCounts = async () => {
    try {
      const tasks = await taskService.getTasks()
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      
      const counts = {
        all: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
        high: tasks.filter(t => t.priority === "high").length,
        overdue: tasks.filter(t => 
          !t.completed && 
          t.dueDate && 
          isBefore(new Date(t.dueDate.getFullYear(), t.dueDate.getMonth(), t.dueDate.getDate()), today)
        ).length
      }
      
      setTaskCounts(counts)
    } catch (err) {
      console.error("Error updating task counts:", err)
    }
  }

  const handleTaskSubmit = async (taskData) => {
    try {
      setFormLoading(true)
      
      if (editingTask) {
        await taskService.update(editingTask.Id, taskData)
        toast.success("Task updated successfully!")
        setEditingTask(null)
      } else {
        await taskService.create(taskData)
        toast.success("Task created successfully!")
      }
      
      setShowTaskForm(false)
      updateTaskCounts()
    } catch (err) {
      toast.error(editingTask ? "Failed to update task" : "Failed to create task")
      console.error("Error saving task:", err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setShowTaskForm(false)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchClear = () => {
    setSearchQuery("")
  }

  const getFilteredTaskCount = () => {
    if (!searchQuery.trim()) return null
    // This would need to be calculated based on current filters
    return undefined
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4"
        >
          TaskFlow
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-lg"
        >
          Capture, organize, and complete tasks efficiently
        </motion.p>
      </div>

      {/* Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{taskCounts.all || 0}</p>
            </div>
            <ApperIcon name="List" size={24} className="text-primary-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-accent-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{taskCounts.active || 0}</p>
            </div>
            <ApperIcon name="Clock" size={24} className="text-accent-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-success-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{taskCounts.completed || 0}</p>
            </div>
            <ApperIcon name="CheckCircle" size={24} className="text-success-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-error-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{taskCounts.overdue || 0}</p>
            </div>
            <ApperIcon name="AlertTriangle" size={24} className="text-error-500" />
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6 mb-8"
      >
        {/* Add Task Button */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowTaskForm(!showTaskForm)}
            icon={showTaskForm ? "X" : "Plus"}
            className="shadow-lg"
          >
            {showTaskForm ? "Cancel" : "Add New Task"}
          </Button>
        </div>

        {/* Task Form */}
        {showTaskForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <TaskForm
              onSubmit={handleTaskSubmit}
              initialData={editingTask || {}}
              loading={formLoading}
              submitText={editingTask ? "Update Task" : "Add Task"}
            />
            {editingTask && (
              <Button
                variant="ghost"
                onClick={handleCancelEdit}
                className="mt-4"
                icon="X"
              >
                Cancel Edit
              </Button>
            )}
          </motion.div>
        )}

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          placeholder="Search tasks by title or description..."
          resultCount={getFilteredTaskCount()}
        />

        {/* Filter Bar */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />
      </motion.div>

      {/* Task List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <TaskList
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onTaskUpdate={updateTaskCounts}
          onEditTask={handleEditTask}
        />
      </motion.div>
    </div>
  )
}

export default TaskManager