import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTamilThrillerMovies } from "../services/tmdb"; // Adjust the path as needed
import { Link } from 'react-router-dom';

const TamilThrillerMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const moviesData = await fetchTamilThrillerMovies();
                setMovies(shuffleArray(moviesData).slice(0, 10)); // Shuffle and display the first 10 random movies
            } catch (error) {
                console.error("Failed to load Tamil thriller movies:", error);
            }
        };

        loadMovies();
    }, []);

    // Function to shuffle the array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    return (
        <MoviesSection>
            <h2>Thriller Movies</h2>
            <MovieList>
                {movies.map((movie) => (
                    <MovieCard key={movie.id}>
                        <Link to={`/movie/${movie.id}`}> {/* Link to movie details */}
                            <MoviePoster
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </Link>
                    </MovieCard>
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

const MovieCard = styled.div`
  flex: 0 0 auto;
  width: 150px;
  height: 225px;
  margin-right: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default TamilThrillerMovies;
