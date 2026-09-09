// Types for TMDb API responses

export interface TMDbResponse {
  page: number
  total_results: number
  total_pages: number
  results: TMDbItem[]
}

export interface TMDbItem {
  id: number
  title?: string
  name?: string
  original_title?: string
  original_name?: string
  overview?: string
  poster_path?: string
  backdrop_path?: string
  release_date?: string
  first_air_date?: string
  media_type?: 'movie' | 'tv' | 'person'
  vote_average?: number
  popularity?: number
}

export interface PersonCredits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface CastMember {
  id: number
  character: string
  title?: string
  name?: string
  original_title?: string
  release_date?: string
  first_air_date?: string
  poster_path?: string
  profile_path?: string
  media_type?: 'movie' | 'tv'
}

export interface CrewMember {
  id: number
  job: string
  department: string
  title?: string
  name?: string
  original_title?: string
  release_date?: string
  first_air_date?: string
  poster_path?: string
  profile_path?: string
  media_type?: 'movie' | 'tv'
}

export interface MovieDetails {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path?: string
  backdrop_path?: string
  release_date: string
  runtime: number
  vote_average: number
  genres: Genre[]
  cast: CastMember[]
  crew: CrewMember[]
}

export interface PersonDetails {
  id: number
  name: string
  birthday?: string
  place_of_birth?: string
  profile_path?: string
  known_for_department: string
  popularity: number
  combined_credits: PersonCredits
}

export interface Genre {
  id: number
  name: string
}

// Search results
export interface SearchResults {
  people: TMDbItem[]
  movies: TMDbItem[]
  tvShows: TMDbItem[]
}

// Form state types
export type SearchMode = 'actors' | 'movies'
