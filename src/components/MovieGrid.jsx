import MovieCard from './MovieCard'

export default function MovieGrid({ movies, onSelect }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No movies found for that vibe. Try something different.</p>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  )
}
