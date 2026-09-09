import { TMDbResponse, PersonDetails, MovieDetails, SearchResults, TMDbItem } from '../types'

const API_KEY = (import.meta as any).env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export class TMDbService {
  private async request<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`)
    url.searchParams.set('api_key', API_KEY)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.statusText}`)
    }

    return await response.json() as T
  }

  // Search endpoints
  async searchPerson(query: string, page: number = 1): Promise<TMDbResponse> {
    return this.request<TMDbResponse>('/search/person', { query, page })
  }

  async searchMovie(query: string, page: number = 1): Promise<TMDbResponse> {
    return this.request<TMDbResponse>('/search/movie', { query, page })
  }

  async searchTV(query: string, page: number = 1): Promise<TMDbResponse> {
    return this.request<TMDbResponse>('/search/tv', { query, page })
  }

  async searchMultiple(query: string, page: number = 1): Promise<SearchResults> {
    const [peopleRes, movieRes, tvRes] = await Promise.all([
      this.searchPerson(query, page),
      this.searchMovie(query, page),
      this.searchTV(query, page),
    ])

    return {
      people: peopleRes.results,
      movies: movieRes.results,
      tvShows: tvRes.results,
    }
  }

  // Detail endpoints
  async getPersonDetails(id: number): Promise<PersonDetails> {
    return this.request<PersonDetails>(`/person/${id}`, {
      append_to_response: 'combined_credits',
    })
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.request<MovieDetails>(`/movie/${id}`, {
      append_to_response: 'credits',
    })
  }

  // Helper to get full image URL
  getImageUrl(path: string | undefined, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'original' = 'w185'): string {
    if (!path) return ''
    return `${IMAGE_BASE_URL}${size}${path}`
  }

  // Helper to format release date
  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'Unknown'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric' })
  }

  // Helper to get media title
  getMediaTitle(media: TMDbItem): string {
    return media.title || media.name || media.original_title || media.original_name || 'Unknown'
  }
}

export const tmdbService = new TMDbService()
