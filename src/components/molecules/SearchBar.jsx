import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const SearchBar = ({ 
  value, 
  onChange, 
  onClear, 
  placeholder = "Search tasks...", 
  className,
  resultCount 
}) => {
  return (
    <div className={cn("relative", className)}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icon="Search"
        className="pr-12"
      />
      
      {value && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {resultCount !== undefined && (
            <span className="text-xs text-gray-500 font-medium">
              {resultCount}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            icon="X"
            className="p-1 h-6 w-6 hover:bg-gray-100"
          />
        </div>
      )}
    </div>
  )
}

export default SearchBar