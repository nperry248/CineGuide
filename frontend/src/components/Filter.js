import React from 'react';

const Filter = ({ 
    genres, 
    sources, 
    onGenreChange, 
    onServiceChange, 
    selectedGenreIDs, 
    selectedSourceIDs,
    genreMap, 
    sourceMap 
}) => {
    return (
        <div className="filter-container">
            <div className="genres-filter">
                <h2>Select Genres:</h2>
                {genres.map(genreName => (
                    <div key={genreName} className="checkbox-container">
                        <input
                            type="checkbox"
                            id={`genre-${genreName}`}
                            name={genreName}
                            checked={selectedGenreIDs.includes(genreMap[genreName])}
                            onChange={() => onGenreChange(genreName)}
                        />
                        <label htmlFor={`genre-${genreName}`}>{genreName}</label>
                    </div>
                ))}
            </div>
            
            <div className="sources-filter">
                <h2>Select Sources:</h2>
                {sources.map(sourceName => (
                    <div key={sourceName} className="checkbox-container">
                        <input
                            type="checkbox"
                            id={`source-${sourceName}`}
                            name={sourceName}
                            checked={selectedSourceIDs.includes(sourceMap[sourceName])}
                            onChange={() => onServiceChange(sourceName)}
                        />
                        <label htmlFor={`source-${sourceName}`}>{sourceName}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;
