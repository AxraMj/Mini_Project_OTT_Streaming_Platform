// components/PopularLanguageMovies.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LANGUAGES = [
    { code: "en", name: "English" }, // English
    { code: "ml", name: "Malayalam" }, // Malayalam
    { code: "ta", name: "Tamil" }, // Tamil
    { code: "hi", name: "Hindi" }, // Hindi
    { code: "te", name: "Telugu" } // Telugu
];

const PopularLanguageMovies = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLanguageClick = (languageCode) => {
        navigate(`/movies/${languageCode}`); // Navigate to the language-specific movies page
    };

    return (
        <MoviesSection>
            <h2>Popular Languages</h2>
            <CardList>
                {LANGUAGES.map((language) => (
                    <LanguageCard key={language.code} onClick={() => handleLanguageClick(language.code)}>
                        <CardText>{language.name}</CardText>
                    </LanguageCard>
                ))}
            </CardList>
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

const CardList = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 20px 0;
  padding-left: 50px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LanguageCard = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 250px;
  height: 150px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #333; /* Background color for visibility */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardText = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

export default PopularLanguageMovies;
