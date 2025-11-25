import { useState } from "react"
import ReactQuill from "react-quill"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"
import { format } from "date-fns"

const TaskForm = ({ 
  onSubmit, 
  initialData = {}, 
  className,
  loading = false,
  submitText = "Add Task"
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    priority: initialData.priority || "medium",
    dueDate: initialData.dueDate ? format(initialData.dueDate, "yyyy-MM-dd") : ""
  })
  
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Submit with parsed date
    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null
    }
    
    onSubmit(submitData)
    
    // Reset form if it's a new task (no initial data)
    if (!initialData.title) {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: ""
      })
    }
    
    setErrors({})
  }

const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: value
    }))
    
    // Clear error when user starts typing
    if (errors.description) {
      setErrors(prev => ({
        ...prev,
        description: ""
      }))
    }
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ]
  }

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block', 'link'
  ]

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <Input
        label="Task Title"
        placeholder="What needs to be done?"
        value={formData.title}
        onChange={handleChange("title")}
        error={errors.title}
        icon="Edit3"
      />
      
<div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <div className="task-form">
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Add more details about this task..."
            modules={quillModules}
            formats={quillFormats}
            className="bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all duration-200"
          />
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-error-600">{errors.description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Priority"
          value={formData.priority}
          onChange={handleChange("priority")}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </Select>
        
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={handleChange("dueDate")}
          icon="Calendar"
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        icon="Plus"
        className="w-full"
      >
        {submitText}
      </Button>
    </form>
  )
}

export default TaskForm