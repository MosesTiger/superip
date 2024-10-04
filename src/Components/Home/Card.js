import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../../stylefile/Card.css";
import styled from "styled-components";

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  overflow: hidden;
  width: 250px;
  border: 2px solid #f5f5f5;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1);
  }

  &:hover img {
    transform: scale(1.05);
    filter: brightness(1);
  }

  &:hover h2,
  &:hover p {
    display: none;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.3);
  transition: filter 0.3s ease, transform 0.3s ease;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 35%;
  left: 5%;
  color: white;
  z-index: 2;
  transition: color 0.3s ease;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'ChosunGs', sans-serif;
  font-size: 28px;
  font-weight: 100;
  margin: 0;
  color: white;
`;

const Description = styled.p`
  font-family: '조선굴림체';
  font-size: 14px;
  margin-top: 5px;
  color: white;
  display: flex;
  text-align: center;
`;

const GoText = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #f5f5f5;
  display: block;
  
  &::before {
    content: ">>";
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 1;
  }

  ${CardContainer}:hover &::before {
    content: ">>";
    transform: translateX(-20px); /* 오른쪽으로 이동 */
    opacity: 0; /* 사라짐 */
  }

  &::after {
    content: "Go!";
    position: absolute;
    left: 0px;
    transform: translateX(-50px); /* 왼쪽에서 대기 상태 */
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  ${CardContainer}:hover &::after {
    transform: translateX(-10px); /* 원래 위치로 이동 */
    opacity: 1; /* 등장 */
  }
`;

const Card = ({ cardnum, image, title, description, redirectTo, selectedMenu }) => {
  const [navigate, setNavigate] = useState(false);

  const handleClick = () => {
    setNavigate(true);
  };

  if (navigate) {
    if (redirectTo === "/mypage") {
      return <Navigate to={redirectTo} state={{ selectedMenu }} />;
    }
    return <Navigate to={redirectTo} />;
  }

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        <Image src={image} alt={title} />
      </ImageContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextContainer>
      <GoText className="go-text"></GoText>
    </CardContainer>
  );
};

export default Card;
