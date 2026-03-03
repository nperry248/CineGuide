import { IMG_BASE, LOGO_BASE } from '../utils/tmdb'

export default function MovieCard({ movie, onSelect }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null
  const overview = movie.overview?.length > 140
    ? movie.overview.slice(0, 140) + '…'
    : movie.overview
  const services = movie.streamingServices || []

  return (
    <div className="movie-card" onClick={() => onSelect(movie)} style={{ cursor: 'pointer' }}>
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">No Image</div>
        )}
        {rating && (
          <span className="rating-badge">{rating}</span>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <span className="movie-year">{year}</span>
        {overview && <p className="movie-overview">{overview}</p>}
        {services.length > 0 && (
          <div className="streaming-services">
            {services.slice(0, 4).map((s) => (
              <img
                key={s.provider_id}
                src={`${LOGO_BASE}${s.logo_path}`}
                alt={s.provider_name}
                title={s.provider_name}
                className="service-logo"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
