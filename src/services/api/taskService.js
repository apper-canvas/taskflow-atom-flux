import tasksData from "@/services/mockData/tasks.json"

class TaskService {
  constructor() {
    this.initializeData()
  }

  initializeData() {
    const storedTasks = localStorage.getItem("taskflow-tasks")
    if (!storedTasks) {
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasksData))
    }
  }

  getTasks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem("taskflow-tasks")
        const tasks = data ? JSON.parse(data) : []
        resolve(tasks.map(task => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : null
        })))
      }, 300)
    })
  }

  getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem("taskflow-tasks")
        const tasks = data ? JSON.parse(data) : []
        const task = tasks.find(t => t.Id === parseInt(id))
        if (task) {
          resolve({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
            completedAt: task.completedAt ? new Date(task.completedAt) : null
          })
        } else {
          resolve(null)
        }
      }, 200)
    })
  }

  create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem("taskflow-tasks")
        const tasks = data ? JSON.parse(data) : []
        
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0
        const now = new Date().toISOString()
        
        const newTask = {
          Id: maxId + 1,
          title: taskData.title || "",
          description: taskData.description || "",
          priority: taskData.priority || "medium",
          dueDate: taskData.dueDate ? taskData.dueDate.toISOString().split('T')[0] : null,
          completed: false,
          completedAt: null,
          createdAt: now,
          updatedAt: now
        }
        
        tasks.push(newTask)
        localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
        
        resolve({
          ...newTask,
          dueDate: newTask.dueDate ? new Date(newTask.dueDate) : null,
          createdAt: new Date(newTask.createdAt),
          updatedAt: new Date(newTask.updatedAt)
        })
      }, 250)
    })
  }

  update(id, updates) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem("taskflow-tasks")
        const tasks = data ? JSON.parse(data) : []
        
        const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
        if (taskIndex !== -1) {
          const updatedTask = {
            ...tasks[taskIndex],
            ...updates,
            Id: tasks[taskIndex].Id,
            dueDate: updates.dueDate ? updates.dueDate.toISOString().split('T')[0] : (updates.dueDate === null ? null : tasks[taskIndex].dueDate),
            completedAt: updates.completed && !tasks[taskIndex].completed ? new Date().toISOString() : (updates.completed === false ? null : tasks[taskIndex].completedAt),
            updatedAt: new Date().toISOString()
          }
          
          tasks[taskIndex] = updatedTask
          localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
          
          resolve({
            ...updatedTask,
            dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : null,
            createdAt: new Date(updatedTask.createdAt),
            updatedAt: new Date(updatedTask.updatedAt),
            completedAt: updatedTask.completedAt ? new Date(updatedTask.completedAt) : null
          })
        } else {
          resolve(null)
        }
      }, 200)
    })
  }

  delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem("taskflow-tasks")
        const tasks = data ? JSON.parse(data) : []
        
        const filteredTasks = tasks.filter(t => t.Id !== parseInt(id))
        localStorage.setItem("taskflow-tasks", JSON.stringify(filteredTasks))
        
        resolve(true)
      }, 200)
    })
  }
}

export default new TaskService()