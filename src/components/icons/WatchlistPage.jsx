import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectWatchlist } from '../../features/watchlist/watchlistSlice';
import styled from 'styled-components';

const WatchlistPage = () => {
  const navigate = useNavigate();
  const watchlist = useSelector(selectWatchlist);

  const handlePosterClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <WatchlistContainer>
      <Heading>My Watchlist</Heading>
      {watchlist.length === 0 ? (
        <NoMoviesMessage>No movies in your watchlist</NoMoviesMessage>
      ) : (
        <MoviesRow>
          {watchlist.map(movie => (
            <MoviePoster key={movie.id} onClick={() => handlePosterClick(movie.id)}>
              <PosterImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <PosterTitle>{movie.title}</PosterTitle>
            </MoviePoster>
          ))}
        </MoviesRow>
      )}
    </WatchlistContainer>
  );
};

export default WatchlistPage;

const WatchlistContainer = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
`;

const NoMoviesMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #ccc;
`;

const MoviesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 70px;
`;

const MoviePoster = styled.div`
  width: 150px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;

const PosterImage = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: opacity 0.3s;

  ${MoviePoster}:hover & {
    opacity: 0.8;
  }
`;

const PosterTitle = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 5px;
  transition: color 0.3s;

  ${MoviePoster}:hover & {
    color: #f1c40f;
  }
`;
