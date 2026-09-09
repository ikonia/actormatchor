import * as React from 'react'
import { useSearchStore } from '../stores/searchStore'

interface SearchFormProps {
  onSearch: (queries: string[]) => void
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { mode, queries } = useSearchStore()
  const [inputValue, setInputValue] = React.useState('')
  const [inputQueries, setInputQueries] = React.useState<string[]>(queries)

  React.useEffect(() => {
    setInputQueries(queries)
  }, [queries])

  const handleAdd = () => {
    if (inputValue.trim()) {
      setInputQueries((prev) => [...prev, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemove = (index: number) => {
    setInputQueries((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputQueries.length >= 2) {
      onSearch(inputQueries)
    }
  }

  const placeholder = mode === 'actors' ? 'Enter actor name' : 'Enter movie title'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex-1">Search {mode === 'actors' ? 'Actors' : 'Movies'}</h2>
        <span className="text-sm text-gray-500">
          Enter at least 2 {mode === 'actors' ? 'actors' : 'movies'} to find connections
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add
        </button>
      </div>

      {inputQueries.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {inputQueries.map((query, index) => (
            <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm">
              {query}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-2 text-blue-600 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={inputQueries.length < 2}
          className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Find Connections
        </button>
      </div>
    </form>
  )
}
