// components/GenreMovies.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchPopularMoviesByGenreAndLanguage } from "../services/tmdb"; // Import your service function

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"; // Base URL for TMDB images

// Mapping of genre IDs to genre names
const GENRE_NAMES = {
    28: "Action",
    35: "Comedy",
    18: "Drama",
    80: "Crime",
    27: "Horror",
    10749: "Romance",
    // Add other genres as needed
};

const GenreMovies = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genreName, setGenreName] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const genreId = parseInt(id, 10); // Convert id to number
                const languageCode = 'en'; // Adjust as needed, or use the user's preference
                const movieList = await fetchPopularMoviesByGenreAndLanguage(genreId, languageCode);
                setMovies(movieList);
                
                // Set genre name based on the genre ID
                setGenreName(GENRE_NAMES[genreId] || "Unknown Genre");
            } catch (error) {
                console.error("Error fetching movies by genre:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`); // Navigate to MovieDetails page
    };

    return (
        <MoviesContainer>
            <h2>{`Movies in ${genreName}`}</h2>
            <MoviesList>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                        <MoviePoster
                            src={movie.poster_path ? `${BASE_IMAGE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                            alt={movie.title}
                        />
                    </MovieCard>
                ))}
            </MoviesList>
        </MoviesContainer>
    );
};

const MoviesContainer = styled.div`
  padding: 20px;
  max-width: 1200px; /* Adjust as needed */
  margin: 0 auto; /* Centers the container */
`;

const MoviesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Center items horizontally */
`;

const MovieCard = styled.div`
  width: 200px;
  height: 300px;
  background-color: #444;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Adjusted to center the poster */
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effect */
  cursor: pointer; /* Pointer cursor to indicate clickable item */

  &:hover {
    transform: scale(1.05); /* Slightly enlarge the card on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); /* More prominent shadow on hover */
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%; /* Ensure the poster takes up the full height */
  object-fit: cover;
  transition: opacity 0.3s ease; /* Smooth transition for hover effect */
`;

export default GenreMovies;
