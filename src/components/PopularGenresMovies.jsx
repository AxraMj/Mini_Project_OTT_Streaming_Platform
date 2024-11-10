import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const GENRES = [
    { id: 28, name: "Action" }, // Action
    { id: 35, name: "Comedy" }, // Comedy
    { id: 18, name: "Drama" },  // Drama
    { id: 80, name: "Crime" },  // Crime
    { id: 27, name: "Horror" }, // Horror
    { id: 10749, name: "Romance" } // Romance
];

const PopularGenresMovies = () => {
    const navigate = useNavigate(); // Use navigate hook

    const handleGenreClick = (id) => {
        navigate(`/genre/${id}`);
    };

    return (
        <MoviesSection>
            <h2>Popular Genre</h2>
            <CardList>
                {GENRES.map((genre) => (
                    <GenreCard key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                        <CardText>{genre.name}</CardText>
                    </GenreCard>
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

const GenreCard = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 250px;
  height: 150px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #333;
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

export default PopularGenresMovies;
