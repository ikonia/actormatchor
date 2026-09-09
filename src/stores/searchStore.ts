import { create } from 'zustand'
import { tmdbService } from '../services/tmdb'
import { TMDbItem, PersonDetails, MovieDetails, SearchMode } from '../types'

interface SearchResult {
  item: TMDbItem
  type: 'person' | 'movie' | 'tv'
  details?: PersonDetails | MovieDetails
}

interface SearchState {
  mode: SearchMode
  queries: string[]
  searchResults: SearchResult[]
  commonItems: TMDbItem[]
  isLoading: boolean
  error: string | null

  setMode: (mode: SearchMode) => void
  setQueries: (queries: string[]) => void
  setSearchResults: (results: SearchResult[]) => void
  setCommonItems: (items: TMDbItem[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  searchPeople: (queries: string[]) => Promise<void>
  searchMovies: (queries: string[]) => Promise<void>
}

export const useSearchStore = create<SearchState>((set) => ({
  mode: 'actors',
  queries: [],
  searchResults: [],
  commonItems: [],
  isLoading: false,
  error: null,

  setMode: (mode) => set({ mode }),
  setQueries: (queries) => set({ queries }),
  setSearchResults: (results) => set({ searchResults: results }),
  setCommonItems: (items) => set({ commonItems: items }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  searchPeople: async (queries) => {
    set({ isLoading: true, error: null })

    try {
      const people = await Promise.all(
        queries.map(async (query) => {
          const res = await tmdbService.searchPerson(query)
          return res.results.length > 0 ? res.results[0] : null
        }),
      )

      const validPeople = people.filter((p): p is TMDbItem => p !== null)

      set({ searchResults: validPeople.map((p) => ({ item: p, type: 'person' })) })

      // Fetch full credits for each person
      const creditsPromises = validPeople.map(async (person) => {
        const details = await tmdbService.getPersonDetails(person.id)
        return { ...person, details }
      })

      const peopleWithCredits = await Promise.all(creditsPromises)

      // Find common films across all people
      const allFilms = peopleWithCredits.map((p) => {
        const films = new Map()
        p.details?.combined_credits.cast.forEach((credit) => {
          if (credit.media_type === 'movie' || credit.media_type === 'tv') {
            films.set(credit.id, {
              ...credit,
              title: credit.title || credit.name,
            })
          }
        })
        return films
      })

      // Find intersection of all film maps
      const commonFilms = new Map<TMDbItem, number>()
      if (allFilms.length > 0) {
        for (const [id, film] of allFilms[0]) {
          if (allFilms.every((films) => films.has(id))) {
            commonFilms.set(
              film,
              allFilms.findIndex((films) => films.has(id)),
            )
          }
        }
      }

      set({ commonItems: Array.from(commonFilms.keys()) })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Search failed' })
    } finally {
      set({ isLoading: false })
    }
  },

  searchMovies: async (queries) => {
    set({ isLoading: true, error: null })

    try {
      const movies = await Promise.all(
        queries.map(async (query) => {
          const res = await tmdbService.searchMovie(query)
          return res.results.length > 0 ? res.results[0] : null
        }),
      )

      const validMovies = movies.filter((m): m is TMDbItem => m !== null)

      set({ searchResults: validMovies.map((m) => ({ item: m, type: 'movie' })) })

      // Fetch credits for each movie
      const creditsPromises = validMovies.map(async (movie) => {
        const details = await tmdbService.getMovieDetails(movie.id)
        return { ...movie, details }
      })

      const moviesWithCredits = await Promise.all(creditsPromises)

      // Find common cast across all movies
      const allCast = moviesWithCredits.map((m) => {
        const cast = new Map()
        m.details?.cast.forEach((member) => {
          cast.set(member.id, {
            ...member,
            name: member.name,
            character: member.character,
          })
        })
        return cast
      })

      // Find intersection of all cast maps
      const commonCast = new Map<TMDbItem, { character: string }[]>()
      if (allCast.length > 0) {
        for (const [id, castMember] of allCast[0]) {
          const characters = [castMember.character]
          let allHave = true

          for (let i = 1; i < allCast.length; i++) {
            if (allCast[i].has(id)) {
              characters.push(allCast[i].get(id)?.character || '')
            } else {
              allHave = false
              break
            }
          }

          if (allHave) {
            commonCast.set(castMember, characters)
          }
        }
      }

      set({ commonItems: Array.from(commonCast.keys()) })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Search failed' })
    } finally {
      set({ isLoading: false })
    }
  },
}))
