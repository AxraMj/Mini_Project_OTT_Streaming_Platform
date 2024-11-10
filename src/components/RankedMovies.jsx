import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPopularIndianMovies } from '../services/tmdb';
import { useNavigate } from 'react-router-dom';

const RankedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const fetchedMovies = await fetchPopularIndianMovies();
        const rankedMovies = fetchedMovies.slice(0, 10).map((movie, index) => ({
          id: movie.id,
          rank: index + 1,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setMovies(rankedMovies);
      } catch (err) {
        setError('Failed to fetch ranked Indian movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) return <LoadingMessage>Loading ranked Indian movies...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Title>Top Ranked</Title>
      <MoviesList>
        {movies.map((movie) => (
          <MovieItem key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <CardPulseBorder>
              <Poster src={movie.poster} alt={movie.title} />
              <Rank>{movie.rank}</Rank>
            </CardPulseBorder>
          </MovieItem>
        ))}
      </MoviesList>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px 0;
  padding-left: 30px;
`;

const MoviesList = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-left: 30px;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const MovieItem = styled.div`
  position: relative;
  margin-right: 100px;
  cursor: pointer;
`;

const CardPulseBorder = styled.div`
  position: relative;
  border-radius: 10px;
  border: 2px solid #4A4A4A;
  background: linear-gradient(to bottom, #1E1E1E, #000);
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, rgba(17, 17, 17, 0), white, rgba(17, 17, 17, 0));
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% { width: 0; }
    50% { width: 100%; }
    100% { width: 0; }
  }
`;

const Rank = styled.div`
  position: absolute;
  bottom: 10px;
  left: -30px;
  color: white;
  font-size: 70px;
  font-weight: bold;
`;

const Poster = styled.img`
  width: 150px;
  height: auto;
  border-radius: 8px;
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

export default RankedMovies;
