import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';

const ImgSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const [opacity, setOpacity] = useState(1);
  const sliderRef = useRef(null);

  const API_KEY = 'cfacde6feddbad78398140097c11dea4'; // Replace with your TMDB API key

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseTrending = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const dataTrending = await responseTrending.json();

        const responseIndian = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=hi-IN&sort_by=popularity.desc`);
        const dataIndian = await responseIndian.json();

        const responseMalayalam = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ml&sort_by=popularity.desc`);
        const dataMalayalam = await responseMalayalam.json();

        const combinedMovies = [
          ...dataTrending.results,
          ...dataIndian.results,
          dataMalayalam.results[0]
        ];

        const uniqueMovies = combinedMovies
          .filter((movie, index, self) => movie.overview && self.findIndex(m => m.id === movie.id) === index)
          .slice(0, 5);

        setMovies(uniqueMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [API_KEY]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 500, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    fade: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const handleThumbnailClick = (index) => {
    setActiveSlide(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <ImgSliderContainer style={{ opacity }}>
      <Carousel {...settings} ref={sliderRef}>
        {movies.map((movie, index) => (
          <Slide
            key={index}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImgSliderImage
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <Content
              as={motion.div}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Title>{movie.title}</Title>
              <Details>
                <Year>{new Date(movie.release_date).getFullYear()}</Year> | <Genre>{movie.genre_ids.join(', ')}</Genre>
              </Details>
              <Description>{movie.overview}</Description>
            </Content>
          </Slide>
        ))}
      </Carousel>
      <ThumbnailContainer>
        {movies.map((movie, index) => (
          <Thumbnail
            key={index}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Thumbnail ${index}`}
            isActive={index === activeSlide}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </ThumbnailContainer>
    </ImgSliderContainer>
  );
};

const ImgSliderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 80px;
  width: calc(100% - 80px);
  height: 100vh;
  overflow: hidden;
  margin: 0;
  z-index: -1;
`;

// Carousel styles
const Carousel = styled(Slider)`
  .slick-slide {
    height: 100%;
  }
  .slick-list {
    height: 100%;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
  }
`;

// Individual slide container with animation
const Slide = styled(motion.div)`
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 3), transparent);
    z-index: 2;
    transition: opacity 0.9s ease;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
    z-index: 2;
  }
`;

// Image in the slider with zoom animation
const ImgSliderImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 0;
`;

// Content section styles (title, description, buttons) with slide-up animation
const Content = styled(motion.div)`
  position: absolute;
  top: 30%;
  left: 40px;
  z-index: 2;
  color: white;
  max-width: 500px;
`;

// Movie title styles
const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

// Movie details (year, genre)
const Details = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  margin-bottom: 20px;
  opacity: 0.8;
`;

const Year = styled.span`
  font-weight: bold;
`;

const Genre = styled.span``;

// Description of the movie
const Description = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

// Thumbnail container and individual thumbnails
const ThumbnailContainer = styled.div`
  position: absolute;
  bottom: 50%;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translateY(50%);
  z-index: 2;
`;

// Thumbnail component
const Thumbnail = ({ isActive, ...props }) => (
  <img
    {...props}
    style={{
      width: '80px',
      height: '50px',
      objectFit: 'cover',
      border: isActive ? '2px solid white' : '1px solid grey',
      cursor: 'pointer',
      opacity: isActive ? 1 : 0.6,
      transition: 'opacity 0.3s ease',
      borderRadius: '5px'
    }}
  />
);

export default ImgSlider;
