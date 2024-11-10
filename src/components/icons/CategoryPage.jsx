import React from "react";
import styled from "styled-components";
import PopularGenresMovies from "../PopularGenresMovies"; // Adjust the path as needed
import PopularLanguageMovies from "../PopularLanguageMovies"; // Adjust the path as needed
import RankedMovies from "../RankedMovies"; // Import the new component
import Viewers from "../Viewers";
import { motion } from "framer-motion"; // Import framer-motion

const CategoryPage = () => {
  return (
    <Container>
      <Title>Categories</Title>
      <Section
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Viewers />
      </Section>

      <Section
        as={motion.div}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <PopularGenresMovies />
      </Section>

      <Section
        as={motion.div}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <PopularLanguageMovies />
      </Section>

      <Section
        as={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <RankedMovies />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  margin-left: 40px;
`;

const Title = styled.h1`
  margin-left: 20px; /* Adjust the value to move it further right */
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

export default CategoryPage;
