import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToWatchlist, removeMovieFromWatchlist, setWatchlist } from '../features/watchlist/watchlistSlice';
import { fetchMovieById, fetchSimilarMovies, fetchMovieTrailer } from '../services/tmdb'; // Added fetchMovieTrailer
import { addMovieToFirestoreWatchlist, removeMovieFromFirestoreWatchlist, getFirestoreWatchlist } from '../firebase';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck } from '@fortawesome/free-solid-svg-icons';
import { selectUserSubscriptionStatus } from '../features/user/userSlice';

const GlobalStyles = createGlobalStyle`
  body {
    overflow-x: hidden;
  }
`;

// Styled components definitions...

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false); // State for trailer modal
  const [trailerKey, setTrailerKey] = useState(''); // State to store trailer video key
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.movies);
  const userId = useSelector((state) => state.user.email);
  const isSubscribed = useSelector(selectUserSubscriptionStatus); // Get subscription status from Redux
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovieById(id);
        setMovie(movieData);

        const similarMoviesData = await fetchSimilarMovies(id, 20);
        setSimilarMovies(similarMoviesData);
      } catch (error) {
        console.error('Failed to load movie details or similar movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  

  useEffect(() => {
    const loadWatchlist = async () => {
      if (userId) {
        const movies = await getFirestoreWatchlist(userId);
        dispatch(setWatchlist(movies));
      }
    };
    loadWatchlist();
  }, [userId, dispatch]);

  const isMovieInWatchlist = watchlist.some((m) => m.id === movie?.id);

  const handleWatchlistClick = async () => {
    if (isMovieInWatchlist) {
      dispatch(removeMovieFromWatchlist(movie));
      if (userId) {
        await removeMovieFromFirestoreWatchlist(userId, movie.id);
      }
    } else {
      dispatch(addMovieToWatchlist(movie));
      if (userId) {
        await addMovieToFirestoreWatchlist(userId, movie);
      }
    }
  };

  const handleCardClick = (similarMovieId) => {
    navigate(`/movie/${similarMovieId}`);
  };

  const handleSubscribeClick = () => {
    navigate('/subscription');
  };

  const handleWatchNowClick = async () => {
    try {
      const trailerData = await fetchMovieTrailer(id);
      if (trailerData) {
        setTrailerKey(trailerData.key);
        setShowTrailer(true);
      } else {
        console.error('No trailer found');
      }
    } catch (error) {
      console.error('Error loading trailer:', error);
    }
  };
  

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (!movie) {
    return <LoadingContainer>Error loading movie details.</LoadingContainer>;
  }

  return (
    <MovieDetailsContainer>
      <Banner>
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
        <BannerContent>
          <Title>{movie.title}</Title>
          <Details>
            <span>{movie.release_date.split('-')[0]}</span>
            <span>{movie.genres.map((g) => g.name).join(', ')}</span>
          </Details>
          <Description>{movie.overview}</Description>
          <Buttons>
            {isSubscribed ? (
              <WatchNowButton onClick={handleWatchNowClick}>
                <FontAwesomeIcon icon={faPlay} />
                Watch Now
              </WatchNowButton>
            ) : (
              <SubscribeButton onClick={handleSubscribeClick}>
                <FontAwesomeIcon icon={faPlay} />
                Subscribe to Watch
              </SubscribeButton>
            )}

            <WatchlistButton onClick={handleWatchlistClick}>
              {isMovieInWatchlist ? <FontAwesomeIcon icon={faCheck} /> : <PlusIcon>+</PlusIcon>}
            </WatchlistButton>
          </Buttons>
        </BannerContent>
      </Banner>

      {showTrailer && (
        <TrailerModal onClose={() => setShowTrailer(false)}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

        </TrailerModal>
      )}

      <SimilarMoviesContainer>
        <SectionTitle>More Like This</SectionTitle>
        <SimilarMoviesGrid ref={scrollRef}>
          {similarMovies.map((similarMovie) => (
            <MovieCard key={similarMovie.id} onClick={() => handleCardClick(similarMovie.id)}>
              <img src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`} alt={similarMovie.title} />
            </MovieCard>
          ))}
        </SimilarMoviesGrid>
      </SimilarMoviesContainer>
    </MovieDetailsContainer>
  );
};

export default MovieDetails;

// Trailer Modal component
const TrailerModal = ({ children, onClose }) => (
  <ModalBackdrop onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>X</CloseButton>
      {children}
    </ModalContent>
  </ModalBackdrop>
);

// Styled components for modal
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 80%;
  max-width: 800px;
  height: 60%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
`;

const WatchNowButton = styled.button`
  background-color: #ff5733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e74c3c;
  }
`;

const MovieDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 50px;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 60%, transparent 100%);
    z-index: 1;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 50%;
  z-index: 2;
  margin-left: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Details = styled.div`
  font-size: 1rem;
  margin-bottom: 10px;
  span {
    display: block;
    margin-bottom: 5px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;

const SubscribeButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  opacity: 0.8;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const WatchlistButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px;
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const PlusIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
`;

const SimilarMoviesContainer = styled.div`
  margin-top: 20px;
  margin-left: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #fff;
`;

const SimilarMoviesGrid = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 0;
  overflow-x: scroll;
  scroll-behavior: smooth;
  position: relative;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none; /* Firefox */
`;

const MovieCard = styled.div`
  text-align: center;
  flex: 0 0 150px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer; /* Change mouse pointer to hand */

  img {
    width: 100%;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  &:hover img {
    transform: scale(1.05);
  }
`;
