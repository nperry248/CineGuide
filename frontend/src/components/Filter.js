import React from 'react';
import './Filter.css';

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
<div className="filters">
    <div className="filter-container2">
        <ul className="list">
            <li className="list-item">
                <div className="list-item__center">Select Streaming Services:</div>
                <div className="list-item__center__lower">
                    {sources.map((sourceName, index) => (
                        <div key={sourceName} className="list-item__right">
                            <input
                                type="checkbox"
                                id={`source-${index}`} // Unique identifier for each checkbox
                                className="switch__input"
                                checked={selectedSourceIDs.includes(sourceMap[sourceName])}
                                onChange={() => onServiceChange(sourceName)}
                            />
                            <label htmlFor={`source-${index}`} className="btn-label"> {/* Label acts as the button */}
                                {sourceName}
                            </label>
                        </div>
                    ))}
                </div>
            </li>
        </ul>
    </div>

    <div className="filter-container1">
        <ul className="list">
            <li className="list-item">
                <div className="list-item__center">Select Genres:</div>
                <div className="list-item__center__lower">
                    {genres.map((genreName, index) => (
                        <div key={genreName} className="list-item__right">
                            <input
                                type="checkbox"
                                id={`genre-${index}`} // Unique identifier for each checkbox
                                className="switch__input"
                                checked={selectedGenreIDs.includes(genreMap[genreName])}
                                onChange={() => onGenreChange(genreName)}
                            />
                            <label htmlFor={`genre-${index}`} className="btn-label"> {/* Label acts as the button */}
                                {genreName}
                            </label>
                        </div>
                    ))}
                </div>
            </li>
        </ul>
    </div>
</div>

    );
};

export default Filter;

