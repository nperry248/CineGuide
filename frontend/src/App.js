import React, { useState } from 'react';
import Filter from './components/Filter';
import MovieList from './components/MovieList'; // Ensure you have this component
import './App.css';

const genreMap = {
    " Action"  : 1, 
    " Comedy"  : 4,
    " Drama"   : 7,
    " Fantasy" : 9,
    " Horror"  : 11,
    " Romance" : 14,
    " Sci-Fi"  : 40,
    " Thriller": 17
}


const sourceMap = {
    ' Netflix': 203,
    ' Hulu': 157,
    ' Max': 387,
    ' Disney+': 372,
    ' Peacock': 388,
    ' Prime Video': 26
}



function App() {
    const [selectedGenreIDs, setSelectedGenreIDs] = useState([]);
    const [selectedSourceIDs, setSelectedSourceIDs] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);



    const handleGenreChange = (selectedGenreName) => {
        const genreId = genreMap[selectedGenreName];
        setSelectedGenreIDs(prevIDs => 
            prevIDs.includes(genreId) 
                ? prevIDs.filter(id => id !== genreId)  // Remove the ID if it's already in the array
                : [...prevIDs, genreId]  // Add the ID if it's not in the array
        );
    };
    
    const handleServiceChange = (selectedSourceName) => {
        const sourceId = sourceMap[selectedSourceName];
        setSelectedSourceIDs(prevIDs => 
            prevIDs.includes(sourceId)
                ? prevIDs.filter(id => id !== sourceId)
                : [...prevIDs, sourceId]
        );
    };
    
    
    


    const fetchMovies = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const genreQuery = selectedGenreIDs.join(','); 
            const sourceQuery = selectedSourceIDs.join(','); // This represents source_ids
            const params = new URLSearchParams({
                apiKey: 'LMzwGLuzv9hMVLRSpVrfHLcPJrhWxTWN0eJmYATT', // Replace with your actual API key
                genres: genreQuery,
                source_ids: sourceQuery,
                types: "movie",
                limit: 4,
                // Add more parameters as needed
            });

            const response = await fetch(`https://api.watchmode.com/v1/list-titles/?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setMovies(data.titles); // Adjust based on the actual structure of the API response
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="App">
            <header>
                <h1>CineGuide</h1>
            </header>
            <main>
            <Filter
                genres={Object.keys(genreMap)}  // Pass genre names
                sources={Object.keys(sourceMap)}  // Pass source names
                selectedGenreIDs={selectedGenreIDs} // Pass selected genre IDs
                selectedSourceIDs={selectedSourceIDs}
                sourceMap={sourceMap}
                genreMap={genreMap} // Pass the genreMap
                onGenreChange={handleGenreChange}  // Pass the handler for genre change
                onServiceChange={handleServiceChange}  // Pass the handler for source change
            />
                <button onClick={fetchMovies}>Get Movies</button>
                {isLoading && <p>Loading...</p>}
                {!isLoading && !error && movies.length > 0 && <MovieList movies={movies} />}
                {!isLoading && !error && movies.length === 0 && <p>No movies found.</p>}
                {!isLoading && error && <p>{error}</p>}
            </main>
        </div>
    );
}

export default App;



