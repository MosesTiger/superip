import React from "react";
import styled from "styled-components";

// ExampleCard styled component
const ExampleCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 300px;
  margin: 0 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ExampleImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ExampleTitle = styled.h3`
  font-size: 18px;
  margin: 10px 0;
  color: #333;
  text-align: center;
`;

const ExampleDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
`;

// ExampleCard component
const ExampleCard = ({ title, description, image }) => {
  return (
    <ExampleCardContainer>
      <ExampleImage src={image} alt={title} />
      <ExampleTitle>{title}</ExampleTitle>
      <ExampleDescription>{description}</ExampleDescription>
    </ExampleCardContainer>
  );
};

export default ExampleCard;