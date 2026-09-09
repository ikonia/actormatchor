import * as React from 'react'
import { useSearchStore } from '../stores/searchStore'
import { SearchForm } from './SearchForm'
import { ResultsDisplay } from './ResultsDisplay'

export const App: React.FC = () => {
  const { mode, setMode } = useSearchStore()
  const [searchPerformed, setSearchPerformed] = React.useState(false)

  const handleSearch = async (queries: string[]) => {
    setSearchPerformed(true)
    if (mode === 'actors') {
      await useSearchStore.getState().searchPeople(queries)
    } else {
      await useSearchStore.getState().searchMovies(queries)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Actormatchor</h1>
          <p className="text-blue-100 mt-1">Find connections between actors and movies</p>

          {/* Mode Toggle */}
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => { setMode('actors'); setSearchPerformed(false) }}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                mode === 'actors'
                  ? 'bg-white text-blue-700'
                  : 'bg-blue-700 text-blue-100 hover:bg-blue-600'
              }`}
            >
              Find Common Films
            </button>
            <button
              onClick={() => { setMode('movies'); setSearchPerformed(false) }}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                mode === 'movies'
                  ? 'bg-white text-blue-700'
                  : 'bg-blue-700 text-blue-100 hover:bg-blue-600'
              }`}
            >
              Find Common Cast
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Section */}
          <div className="lg:col-span-1">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {searchPerformed ? (
              <ResultsDisplay />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Find Film Connections
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter {mode === 'actors' ? 'two or more actors' : 'two or more movies'} above to discover their common films or cast members.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">
            Data provided by The Movie Database (TMDb) API
          </p>
        </div>
      </footer>
    </div>
  )
}
