import { useState } from 'react'
import MoodInput from './components/MoodInput'
import MovieGrid from './components/MovieGrid'
import MovieModal from './components/MovieModal'
import { getMoodFilters } from './utils/gemini'
import { discoverMovies } from './utils/tmdb'
import './App.css'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)

  const handleSearch = async (input) => {
    setLoading(true)
    setError(null)
    setLastQuery(input)

    try {
      const filters = await getMoodFilters(input)
      const results = await discoverMovies(filters)
      setMovies(results)
      setHasSearched(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <MoodInput onSearch={handleSearch} loading={loading} />

      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          <p>Reading the vibe...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>{error}</p>
        </div>
      )}

      {!loading && hasSearched && !error && (
        <>
          <p className="results-label">
            Results for &ldquo;{lastQuery}&rdquo;
          </p>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}
