import React from 'react';
import './MovieList.css'; // You can create this file to style your movie list

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.id} className="movie-item">
                    <h3>{movie.title}</h3>
                    <p>Year: {movie.year}</p>
                    {/* Add more movie details you want to display */}
                </div>
            ))}
        </div>
    );
};

export default MovieList;
