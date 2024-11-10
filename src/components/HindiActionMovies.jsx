// components/HindiActionMovies.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchActionMoviesByLanguage } from "../services/tmdb"; // Adjust the path as needed
import { Link } from 'react-router-dom';

const ACTION_GENRE_ID = 28; // Action genre ID


const HindiActionMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                // Fetch Hindi action movies
                const hindiActionMovies = await fetchActionMoviesByLanguage("hi", ACTION_GENRE_ID);

                // Limit to 10 movies
                const limitedMovies = hindiActionMovies.slice(0, 10);
                setMovies(limitedMovies);
            } catch (error) {
                console.error("Failed to load Hindi action movies:", error);
            }
        };

        loadMovies();
    }, []);

      return (
        <MoviesSection>
          <h2>Hindi Movies</h2>
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

export default HindiActionMovies;
