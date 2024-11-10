// Home.js
import React from 'react';
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import RecommendedMovies from './RecommendedMovies';
import RankedMovies from './RankedMovies'; // Import the new component
import TrendingMalayalamMovies from "./TrendingMalayalamMovies";
import NewMoviesForYou from "./NewMoviesForYou";
import EntertainmentMoviesForYou from "./EntertainmentMoviesForYou";
import CartoonDisneyMovies from "./CartoonDisneyMovies";
import HindiActionMovies from "./HindiActionMovies";
import RomanticIndianMovies from "./RomanticIndianMovies";
import PopularGenresMovies from "./PopularGenresMovies";
import PopularLanguageMovies from './PopularLanguageMovies';
import IndianHorrorMovies from './IndianHorrorMovies';
import TamilThrillerMovies from './TamilThrillerMovies';

const Home = () => {

  return (
    <Container>
      <ImgSlider /> {/* First Image Slider */}
      <Viewers /> {/* Viewers at the bottom of ImgSlider */}
      <RankedMovies /> {/* Pass ranked movies here */}
      <NewMoviesForYou />
      <CartoonDisneyMovies />
      <RecommendedMovies />
      <TrendingMalayalamMovies />
      <EntertainmentMoviesForYou />
      <HindiActionMovies />
      <RomanticIndianMovies />
      <PopularGenresMovies />
      <PopularLanguageMovies />
      <IndianHorrorMovies />
      <TamilThrillerMovies />
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full screen height */
  position: relative;
  top: 500px; /* Push the content down from the header */
  padding: 0 calc(3.5vw + 5px);
  overflow-x: hidden;

  &:after {
    background: url('/images/home-background.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
