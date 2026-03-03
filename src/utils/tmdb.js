const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'
export const LOGO_BASE = 'https://image.tmdb.org/t/p/original'

export async function discoverMovies(filters) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    include_adult: false,
    'vote_count.gte': 100,
    page: 1,
    ...filters,
  })

  const res = await fetch(`${BASE_URL}/discover/movie?${params}`)
  if (!res.ok) throw new Error('Failed to fetch movies from TMDB')

  const data = await res.json()
  const movies = data.results || []

  // Fetch watch providers for all movies in parallel
  const withProviders = await Promise.all(
    movies.map(async (movie) => {
      try {
        const provRes = await fetch(
          `${BASE_URL}/movie/${movie.id}/watch/providers?api_key=${API_KEY}`
        )
        const provData = await provRes.json()
        const us = provData.results?.US
        // Only show flatrate (subscription) services
        movie.streamingServices = us?.flatrate || []
      } catch {
        movie.streamingServices = []
      }
      return movie
    })
  )

  return withProviders
}

export async function getMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  )
  if (!res.ok) throw new Error('Failed to fetch movie details')
  return res.json()
}
