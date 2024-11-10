import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion

const TMDB_API_KEY = 'e0e0d8b5cc964b11285715d5eef3642e'; // Replace with your TMDB API Key
const TMDB_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('Monthly');
  const [selectedBox, setSelectedBox] = useState('box2'); // Default to box2
  const [planDetails, setPlanDetails] = useState({
    box1: {
      title: 'Super',
      price: '₹299/month',
    },
    box2: {
      title: 'Premium',
      price: '₹299/month',
    },
  });
  const [movies, setMovies] = useState([]); // State to store fetched movies
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch popular movies from TMDB
    const fetchMovies = async () => {
      try {
        const response = await axios.get(TMDB_API_URL);
        setMovies(response.data.results.slice(0, 9)); // Get the first 9 movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleClose = () => {
    navigate('/home');
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    if (plan === 'Monthly') {
      setSelectedBox('box2');
      setPlanDetails({
        box1: {
          title: 'Super',
          price: '₹299/month',
        },
        box2: {
          title: 'Premium',
          price: '₹299/month',
        },
      });
    } else if (plan === 'Quarterly') {
      setSelectedBox('box1');
      setPlanDetails({
        box1: {
          title: 'Super',
          price: '₹799/quarter',
        },
        box2: {
          title: 'Premium',
          price: '₹499/quarter',
        },
      });
    } else { // Yearly
      setSelectedBox('box1');
      setPlanDetails({
        box1: {
          title: 'Super',
          price: '₹888/year',
        },
        box2: {
          title: 'Premium',
          price: '₹1499/year',
        },
      });
    }
  };

  const handleBoxClick = (box) => {
    setSelectedBox(box === selectedBox ? null : box); // Toggle selection
  };

  const handleContinuePay = () => {
    // Navigate to PaymentForm and pass selected plan details
    const selectedPlanDetails = selectedBox === 'box1' ? planDetails.box1 : planDetails.box2;
    navigate('/payment', { state: { plan: selectedPlanDetails } });
  };

  return (
    <GradientBackground>
      <Header>
        <CloseButton onClick={handleClose}>
          <FaTimes />
        </CloseButton>
      </Header>
      <Container>
        <TableContainer>
          <TableHeading>Subscription Plan</TableHeading>
          <Table>
            <thead>
              <tr>
                <th>Features</th>
                <th>Super</th>
                <ThPrime>Premium</ThPrime>
              </tr>
            </thead>
            <motion.tbody
              initial={{ opacity: 0, y: 50 }} // Initial hidden state
              animate={{ opacity: 1, y: 0 }} // Animation to visible
              transition={{ duration: 0.5 }}
            >
              <TableRow>
                <td>All content (movies, shows)</td>
                <td>X</td>
                <TdPrime>&#10003;</TdPrime>
              </TableRow>
              <TableRow>
                <td>Watch on TV or Laptop</td>
                <td>X</td>
                <TdPrime>&#10003;</TdPrime>
              </TableRow>
              <TableRow>
                <td>Ads free movies and shows</td>
                <td>&#10003;</td>
                <TdPrime>&#10003;</TdPrime>
              </TableRow>
              <TableRow>
                <td>Number of devices that can be logged in</td>
                <td>2</td>
                <TdPrime>4</TdPrime>
              </TableRow>
              <TableRow>
                <td>Max video quality</td>
                <td>Full HD 1080p</td>
                <TdPrime>4K 2160p</TdPrime>
              </TableRow>
              <TableRow>
                <td>Audio Quality</td>
                <td>Standard</td>
                <TdPrime>4K + Dolby Atmos</TdPrime>
              </TableRow>
            </motion.tbody>
          </Table>
        </TableContainer>

        <RectangleBox>
          <PlanOption onClick={() => handlePlanClick('Quarterly')} selected={selectedPlan === 'Quarterly'}>Quarterly</PlanOption>
          <PlanOption onClick={() => handlePlanClick('Yearly')} selected={selectedPlan === 'Yearly'}>Yearly</PlanOption>
          <PlanOption onClick={() => handlePlanClick('Monthly')} selected={selectedPlan === 'Monthly'}>Monthly</PlanOption>
        </RectangleBox>

        <HorizontalBoxContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <NewRectangleBox onClick={() => handleBoxClick('box1')} selected={selectedBox === 'box1'}>
              <BoxText>{planDetails.box1.title}</BoxText>
              <PriceText>{planDetails.box1.price}</PriceText>
              {selectedBox === 'box1' && <TickMark>✔️</TickMark>}
            </NewRectangleBox>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <NewRectangleBox onClick={() => handleBoxClick('box2')} selected={selectedBox === 'box2'}>
              <PremiumText>{planDetails.box2.title}</PremiumText>
              <PriceText>{planDetails.box2.price}</PriceText>
              {selectedBox === 'box2' && <TickMark>✔️</TickMark>}
            </NewRectangleBox>
          </motion.div>
        </HorizontalBoxContainer>

        <ContinueButton onClick={handleContinuePay}>
          Continue Payment
        </ContinueButton>

        {/* Movie Poster Grid */}
        <MovieGrid>
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 100 }} // Initial animation state
              animate={{ opacity: 1, y: 0 }} // End animation state
              transition={{ duration: 0.3, delay: index * 0.1 }} // Delay based on index
            >
              <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </motion.div>
          ))}
        </MovieGrid>

      </Container>
    </GradientBackground>
  );
};


const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  padding: 10px;
     &::after {
    content: '';
    position: absolute;
    top: 0; /* Cover the entire height */
    left: 0;
    right: 0;
    bottom: 0; /* Ensure it covers from top to bottom */
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent 70%), /* Vertical gradient */
                linear-gradient(to right, rgba(0, 0, 0, 1), transparent 70%); /* Horizontal gradient */
    background-blend-mode: multiply; /* Blend the two gradients */
    pointer-events: none; /* Ensures the overlay does not interfere with mouse events */
  }
`;

const MoviePoster = styled.img`
  width: 150px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  opacity: 0.7; /* Reduced opacity */
`;


const pulse = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: -200% 0;
  }
`;

const ContinueButton = styled.button`
  background: linear-gradient(110deg, #000103 45%, #1e2631 55%, #000103); /* Gradient background */
  background-size: 200% 100%; /* Ensures smooth animation */
   color: rgba(173, 216, 230, 0.7); /* Light blue text with reduced opacity */
  font-size: 18px;
  padding: 10px 20px;
  border: 2px solid #2d3748; /* Gray border */
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 900px; /* Adjust this value to move it to the right */
  cursor: pointer;
  animation: ${pulse} 2s linear infinite; /* Apply background shine animation */

  &:hover {
    border-color: rgba(0, 123, 255, 1); /* Change border color on hover */
    animation: none; /* Stop the shine animation on hover */
  }
`;

const TickMark = styled.span`
  font-size: 24px;
  color: blue;
  position: absolute;
  top: 10px;
  right: 10px;
`;



const shine = keyframes`
  0% {
    border-color: rgba(255, 255, 255, 0.5);
  }
  50% {
    border-color: blue;
  }
  100% {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const NewRectangleBox = styled.div`
  width: 300px;
  height: 70px;
  background-color: transparent;
  border: 2px solid ${props => (props.selected ? 'white' : 'rgba(255, 255, 255, 0.5)')};
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  position: relative;

  animation: ${props => (props.selected ? css`${shine} 1.5s infinite` : 'none')};

  &:first-child {
    margin-left: 0;
  }
`;



const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  z-index: -2;
  height: 100vh;
  width: 100vw;
  background: radial-gradient(
    ellipse 80% 80% at 50% -20%,
    rgba(120, 119, 198, 0.3),
    rgba(255, 255, 255, 0)
  );
`;


const Header = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  z-index: 10;
`;

const CloseButton = styled.div`
  color: white;
  font-size: 40px;
  cursor: pointer;
  margin-right: 10px;
  font-weight: 200;

  &:hover {
    color: #ccc;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  justify-content: center; /* Center vertically */
  height: 100vh; /* Full height */
  color: white;
  padding: 20px;
  position: relative;
  margin-left: 20px; /* Add some space from the left */
`;



const TableContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const TableHeading = styled.h1`
  text-align: left; /* Change to left alignment */
  margin-left: 20px; /* Adjust as needed for spacing */
  margin-top: 70px;
  color: white;
  margin-bottom: 10px;
  position: absolute;
  top: 50px;
  left: 20px; /* Move to the left side */
`;


const Table = styled.table`
  margin-left: auto;
  width: 50%;
  max-height: 400px;
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;
`;

const ThPrime = styled.th`
  background: linear-gradient(90deg, #4f4f4f, #1e1e1e);
  color: #4caf50;
  border: none;
  padding: 12px;
  width: 120px;
  text-align: left;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const TdPrime = styled.td`
  background: linear-gradient(90deg, #4f4f4f, #1e1e1e);
  color: white;
  border: none;
  padding: 12px;
  width: 120px;
  text-align: left;
`;

const TableRow = styled.tr`
  margin-bottom: 10px;
`;

const RectangleBox = styled.div`
  width: 20%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const HorizontalBoxContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: flex-end;
`;

const BoxText = styled.span`
  color: white;
  font-size: 24px;
`;

const PremiumText = styled.span`
  color: #4caf50;
  font-size: 24px;
  margin-bottom: 5px;
`;

const PriceText = styled.span`
  color: white;
  font-size: 18px;
`;

const PlanOption = styled.span`
  cursor: pointer;
  opacity: ${props => (props.selected ? 1 : 0.5)};

  &:hover {
    opacity: 0.7;
  }
`;

export default Subscription;
