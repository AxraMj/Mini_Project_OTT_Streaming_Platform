// components/CartoonDisneyMovies.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCartoonMoviesByLanguage } from "../services/tmdb"; // Adjust the path as needed
import { Link } from 'react-router-dom';

const CARTOON_GENRE_ID = 16; // Animation genre ID. Adjust if needed for more specific cartoon genres.

const CartoonDisneyMovies = () => {
    const [movies, setMovies] = useState([]);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const loadMovies = async () => {
            try {
                // Fetch cartoon movies in English
                const englishCartoons = await fetchCartoonMoviesByLanguage("en", CARTOON_GENRE_ID);

                // Limit to 10 movies and shuffle them
                const limitedMovies = englishCartoons.slice(0, 10);
                const shuffledMovies = shuffleArray(limitedMovies);
                setMovies(shuffledMovies);
            } catch (error) {
                console.error("Failed to load English cartoon movies:", error);
            }
        };

        loadMovies();
    }, []);

    return (
      <MoviesSection>
        <h2>Cartoon & Disney Movies</h2>
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

export default CartoonDisneyMovies;
