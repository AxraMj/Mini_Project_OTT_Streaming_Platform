import React from 'react';
import styled from 'styled-components';

const TrailerModal = ({ children, onClose }) => (
  <ModalBackdrop onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>X</CloseButton>
      {children}
    </ModalContent>
  </ModalBackdrop>
);

export default TrailerModal;

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
