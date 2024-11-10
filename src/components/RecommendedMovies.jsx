// components/RecommendedMovies.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPopularMovies } from "../services/tmdb"; // Adjust the path as needed
import { Link } from 'react-router-dom';
const RecommendedMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const moviesData = await fetchPopularMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error("Failed to load movies:", error);
            }
        };

        loadMovies();
    }, []);

    return (
      <MoviesSection>
        <h2>Recommended Movies</h2>
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
  padding-left: 50px; /* Adjust this value to move the list to the right */

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

export default RecommendedMovies;
