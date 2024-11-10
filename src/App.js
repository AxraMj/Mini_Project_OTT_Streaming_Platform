import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe
import store from "./app/store";
import Login from "./components/Login";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Header from "./components/Header";
import GenreMovies from "./components/GenreMovies";
import MoviesByLanguage from "./components/MoviesByLanguage";
import PopularLanguageMovies from "./components/PopularLanguageMovies";
import WatchlistPage from "./components/icons/WatchlistPage";
import SearchPage from "./components/icons/SearchPage";  
import CategoryPage from './components/icons/CategoryPage'; 
import Subscription from './components/icons/Subscription';
import PaymentForm from "./components/PaymentForm";

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51QFzgAFARBi7FLwL1bYP3yzTTDN1exG1UzrcR2OE6FUfMSdUP2tZcPaKoTZ2ff0rUtg8xVrbUjLkfJ6p1m9gguSg008shJKogc'); // Replace with your actual key

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/genre/:id" element={<GenreMovies />} />
          <Route path="/movies/:languageCode" element={<MoviesByLanguage />} />
          <Route path="/popular-languages" element={<PopularLanguageMovies />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route 
            path="/payment" 
            element={
              <Elements stripe={stripePromise}> {/* Wrap PaymentForm with Elements */}
                <PaymentForm />
              </Elements>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
