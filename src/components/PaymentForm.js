import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { addPaymentToFirestore } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUserSubscriptionStatus } from '../features/user/userSlice';

const FormContainer = styled.form`
  max-width: 450px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
  color: #333;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f9f9f9;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const CardWrapper = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
  }

  &:hover:not(:disabled) {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
`;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { plan } = location.state || {};
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      await addPaymentToFirestore('USER_ID', email, name, plan?.title, plan?.price);

      alert('Payment successful!');
      dispatch(setUserSubscriptionStatus(true)); // Update Redux store with subscription status
      navigate('/home');
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Pay for {plan?.title}</Title>

      <InputWrapper>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
      </InputWrapper>

      <InputWrapper>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
      </InputWrapper>

      <CardWrapper>
        <Label>Card Number</Label>
        <CardNumberElement />
      </CardWrapper>

      <CardWrapper>
        <Label>Expiry Date</Label>
        <CardExpiryElement />
      </CardWrapper>

      <Button type="submit" disabled={!stripe}>
        Pay {plan?.price}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default PaymentForm;
