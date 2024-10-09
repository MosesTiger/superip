import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ExampleCard styled component
const ExampleCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  border-radius: 8px;
  overflow: hidden;
  position: relative; /* 제목 및 그라데이션을 위한 상대 위치 설정 */
  width: 500px; /* 카드 크기 고정 */
  height: 250px; /* 고정 높이 */
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover img {
    transform: scale(1.1); /* 이미지가 살짝 커지도록 줌 인 */
  }
`;

const ExampleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  z-index: 1; /* 이미지가 위에 위치하도록 설정 */
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7)); /* 그라데이션 */
  z-index: 2;
  transition: opacity 0.3s ease;

  ${ExampleCardContainer}:hover & {
    opacity: 0; /* 호버 시 그라데이션이 사라짐 */
  }
`;

const ExampleTitle = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 10px;
  color: white;
  font-size: 18px;
  margin: 0;
  z-index: 3; /* 텍스트가 이미지와 그라데이션 위에 위치 */
  transition: color 0.3s ease;
`;

const ExampleDescription = styled.p`
  position: absolute;
  bottom: 5px;
  left: 10px;
  color: white;
  font-size: 14px;
  margin: 0;
  z-index: 3; /* 텍스트가 이미지와 그라데이션 위에 위치 */
  transition: color 0.3s ease;
`;

// ExampleCard component
const ExampleCard = ({ id, title, genre, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/story/${id}`);
  };

  return (
    <ExampleCardContainer onClick={handleClick}>
      <ExampleImage src={image} alt={title} />
      <GradientOverlay />
      <ExampleTitle>{title}</ExampleTitle>
      <ExampleDescription>{genre}</ExampleDescription>
    </ExampleCardContainer>
  );
};

export default ExampleCard;
