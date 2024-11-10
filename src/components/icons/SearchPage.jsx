import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Importing both search and times (cross) icons

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]); // State for trending movies
  const navigate = useNavigate();

  // API Key for TMDB
  const API_KEY = 'e0e0d8b5cc964b11285715d5eef3642e'; // Replace with your TMDB API key

  // Fetch trending movies when the component mounts
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrendingMovies();
  }, []);

  const handleSearch = async () => {
    if (!query) return; // Prevent empty queries
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await response.json();

      if (data.results) {
        setResults(data.results); // Store movie results
      } else {
        setResults([]); // Clear results if no movies are found
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]); // Clear search results
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <SearchContainer>
      <SearchBar>
        <SearchIcon onClick={handleSearch}>
          <FaSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
          placeholder="Search for a movie..."
        />
        {query && ( // Show the clear icon only if there is text in the input
          <ClearIcon onClick={handleClear}>
            <FaTimes />
          </ClearIcon>
        )}
      </SearchBar>

      <ResultsContainer>
        {query ? (
          <>
            {results.length > 0 && <h2>Results for "{query}"</h2>} {/* Display search query */}
            
            {results.length === 0 && query && ( // Check if there are no results and a query exists
              <NoResultsMessage>No movies found for "{query}". Please try a different search.</NoResultsMessage>
            )}

            <MoviesRow>
              {results.map(
                (movie) =>
                  movie.poster_path && ( // Check if poster exists
                    <MoviePosterContainer key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                      <MoviePoster
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // URL for the movie poster
                        alt={movie.title}
                      />
                    </MoviePosterContainer>
                  )
              )}
            </MoviesRow>
          </>
        ) : (
          <>
            <h2>Trending Movies</h2>
            <MoviesRow>
              {trendingMovies.map(
                (movie) =>
                  movie.poster_path && ( // Check if poster exists
                    <MoviePosterContainer key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                      <MoviePoster
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // URL for the movie poster
                        alt={movie.title}
                      />
                    </MoviePosterContainer>
                  )
              )}
            </MoviesRow>
          </>
        )}
      </ResultsContainer>
    </SearchContainer>
  );
};

// Styled Components
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  padding: 20px;
  min-height: 100vh;
  position: relative;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-top: 40px;
`;

const SearchInput = styled.input`
  padding: 10px;
  padding-left: 40px; /* Space for the search icon */
  padding-right: 40px; /* Space for the clear icon */
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  outline: none;
  background-color: #222;
  color: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Add transition for border and shadow */

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px #007bff; /* Add shadow on focus */
  }

  ::placeholder {
    color: #aaa;
  }
`;


const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  cursor: pointer;
  color: white;
  font-size: 18px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ClearIcon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: white;
  font-size: 18px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ResultsContainer = styled.div`
  width: 100%;
  margin-top: 50px;

  h2 {
    color: white;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const NoResultsMessage = styled.p`
  color: white;
  text-align: center;
  margin: 20px 0;
`;

const MoviesRow = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows the movie cards to wrap to the next line if needed */
  justify-content: center; /* Center the movie cards */
  gap: 20px; /* Space between movie cards */
`;

const MoviePosterContainer = styled.div`
  width: 200px; /* Set a fixed width for the movie posters */
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MoviePoster = styled.img`
  border-radius: 8px;
  width: 100%; /* Set the width to 100% of the container */
  height: 300px;
  object-fit: cover;
`;

export default SearchPage;
