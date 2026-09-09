import * as React from 'react'
import { useSearchStore } from '../stores/searchStore'
import { FilmCard } from './ResultCards'

export const ResultsDisplay: React.FC = () => {
  const { mode, commonItems, searchResults, isLoading, error } = useSearchStore()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Finding connections...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-bold">Error:</p>
        <p>{error}</p>
      </div>
    )
  }

  if (commonItems.length === 0 && searchResults.length > 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No common connections found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {mode === 'actors'
            ? 'The actors you selected haven\'t appeared in any of the same films or TV shows.'
            : 'The movies you selected don\'t have any common cast or crew members.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {mode === 'actors' ? 'Common Films & TV Shows' : 'Common Cast & Crew'}
          <span className="ml-3 text-sm font-normal text-gray-500">
            ({commonItems.length} {commonItems.length === 1 ? 'result' : 'results'})
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {commonItems.map((item, index) => (
          <FilmCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}
