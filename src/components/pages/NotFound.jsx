import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="Search" size={48} className="text-primary-600" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist. Let's get you back to your tasks.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
            icon="Home"
            className="w-full"
          >
            Back to TaskFlow
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            icon="ArrowLeft"
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound