// components/RomanticIndianMovies.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchRomanticMoviesByLanguage } from "../services/tmdb"; // Adjust the path as needed
import { Link } from 'react-router-dom';
const ROMANCE_GENRE_ID = 10749; // Romance genre ID

const RomanticIndianMovies = () => {
    const [movies, setMovies] = useState([]);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const loadMovies = async () => {
            try {
                // Fetch romantic movies from multiple Indian languages
                const hindiRomance = await fetchRomanticMoviesByLanguage("hi", ROMANCE_GENRE_ID);
                const tamilRomance = await fetchRomanticMoviesByLanguage("ta", ROMANCE_GENRE_ID);
                const teluguRomance = await fetchRomanticMoviesByLanguage("te", ROMANCE_GENRE_ID);
                const malayalamRomance = await fetchRomanticMoviesByLanguage("ml", ROMANCE_GENRE_ID);

                // Combine the movies into one array and shuffle them
                const combinedMovies = [
                    ...hindiRomance.slice(0, 5),  // Limit to 5 movies from each language
                    ...tamilRomance.slice(0, 5),
                    ...teluguRomance.slice(0, 5),
                    ...malayalamRomance.slice(0, 5),
                ];

                const shuffledMovies = shuffleArray(combinedMovies);
                setMovies(shuffledMovies);
            } catch (error) {
                console.error("Failed to load romantic Indian movies:", error);
            }
        };

        loadMovies();
    }, []);

    return (
      <MoviesSection>
        <h2>Romantic Movies</h2>
        <MovieList>
          {movies.map((movie) => (
            <MovieItem key={movie.id}>
              <Link to={`/movie/${movie.id}`}> {/* Link to movie details */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </MovieItem>
          ))}
        </MovieList>
      </MoviesSection>
    );
};

const MoviesSection = styled.section`
  padding: 20px 0;
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    padding-left: 50px;
  }
`;

const MovieList = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 20px 0;
  padding-left: 50px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieItem = styled.div`
  flex: 0 0 auto;
  margin-right: 20px;
  img {
    width: 150px;
    height: 225px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default RomanticIndianMovies;
