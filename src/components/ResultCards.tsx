import * as React from 'react'
import { TMDbItem, CastMember } from '../types'

interface FilmCardProps {
  item: TMDbItem
  index?: number
}

export const FilmCard: React.FC<FilmCardProps> = ({ item, index }) => {
  const title = item.title || item.name || item.original_title || item.original_name || 'Unknown'
  const date = item.release_date || item.first_air_date || ''
  const year = date ? new Date(date).getFullYear() : 'Unknown'
  const poster = item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : null

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      {poster ? (
        <img src={poster} alt={title} className="w-full sm:w-32 h-48 sm:h-auto object-cover" />
      ) : (
        <div className="w-full sm:w-32 h-48 sm:h-auto bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No Image</span>
        </div>
      )}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {index !== undefined && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                #{index + 1}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {item.media_type ? item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1) : 'Movie'} • {year}
          </p>
          {item.overview && (
            <p className="text-gray-700 text-sm mt-2 line-clamp-3">{item.overview}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          {item.vote_average && (
            <div className="flex items-center">
              <span className="text-yellow-500 text-sm font-bold mr-1">★</span>
              <span className="text-gray-700 text-sm">{item.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface CastCardProps {
  item: CastMember
  characters: string[]
}

export const CastCard: React.FC<CastCardProps> = ({ item, characters }) => {
  const name = item.name || item.title || item.original_title || 'Unknown'
  const profile = item.profile_path ? `https://image.tmdb.org/t/p/w185${item.profile_path}` : null

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200 p-4">
      {profile ? (
        <img src={profile} alt={name} className="w-24 h-32 object-cover rounded-full mb-3" />
      ) : (
        <div className="w-24 h-32 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900 text-center">{name}</h3>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {characters.slice(0, 3).map((char, i) => (
          <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            {char}
          </span>
        ))}
        {characters.length > 3 && (
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            +{characters.length - 3} more
          </span>
        )}
      </div>
    </div>
  )
}
