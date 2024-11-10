// components/NewMoviesForYou.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMoviesByLanguage } from "../services/tmdb"; // Adjust the path as needed
import { Link } from 'react-router-dom';
const NewMoviesForYou = () => {
    const [movies, setMovies] = useState([]);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const loadMovies = async () => {
            try {
                // Fetch movies from multiple languages
                const englishMovies = await fetchMoviesByLanguage("en");
                const malayalamMovies = await fetchMoviesByLanguage("ml");
                const tamilMovies = await fetchMoviesByLanguage("ta");
                const hindiMovies = await fetchMoviesByLanguage("hi");

                // Combine the movies into one array and shuffle them
                const combinedMovies = [
                    ...englishMovies.slice(0, 5),  // Limit to 5 movies from each language
                    ...malayalamMovies.slice(0, 5),
                    ...tamilMovies.slice(0, 5),
                    ...hindiMovies.slice(0, 5),
                ];

                const shuffledMovies = shuffleArray(combinedMovies);
                setMovies(shuffledMovies);
            } catch (error) {
                console.error("Failed to load movies:", error);
            }
        };

        loadMovies();
    }, []);

    return (
      <MoviesSection>
        <h2>New Movies for you</h2>
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

export default NewMoviesForYou;
