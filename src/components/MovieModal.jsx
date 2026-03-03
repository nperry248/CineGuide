import { useEffect, useState } from 'react'
import { IMG_BASE, LOGO_BASE, getMovieDetails } from '../utils/tmdb'

export default function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null)

  // Fetch extra details (runtime, tagline, genres) after modal opens
  useEffect(() => {
    getMovieDetails(movie.id)
      .then(setDetails)
      .catch(() => {}) // fail silently, we already have the basics
  }, [movie.id])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null
  const services = movie.streamingServices || []
  const genres = details?.genres || []
  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : null
  const tagline = details?.tagline || null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-body">
          <div className="modal-poster">
            {movie.poster_path ? (
              <img
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster">No Image</div>
            )}
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{movie.title}</h2>
            {tagline && <p className="modal-tagline">{tagline}</p>}

            <div className="modal-meta">
              <span>{year}</span>
              {runtime && <span>{runtime}</span>}
              {rating && <span className="modal-rating">★ {rating}</span>}
            </div>

            {genres.length > 0 && (
              <div className="modal-genres">
                {genres.map((g) => (
                  <span key={g.id} className="genre-chip">{g.name}</span>
                ))}
              </div>
            )}

            {movie.overview && (
              <p className="modal-overview">{movie.overview}</p>
            )}

            {services.length > 0 && (
              <div className="modal-streaming">
                <p className="modal-streaming-label">Available on</p>
                <div className="modal-services">
                  {services.map((s) => (
                    <div key={s.provider_id} className="modal-service">
                      <img
                        src={`${LOGO_BASE}${s.logo_path}`}
                        alt={s.provider_name}
                        className="modal-service-logo"
                      />
                      <span>{s.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {services.length === 0 && (
              <p className="modal-no-streaming">Not available on streaming in the US</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
