import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const MovieInfo = styled.div`
  font-family: Arial, sans-serif;
  padding: 100px;
  margin-left: 40px;
  margin-right: 40px;
`;

const MovieTitle = styled.h1`
  font-size: 28px;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 30px;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: 1px solid #ddd;
  width: 100%;
`;

const MovieMeta = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #c4c4c4;
`;

const MoviePoster = styled.img`
  width: 200px;
  height: auto;
  border-radius: 8px;
  margin-top: 20px;
  float: right;
`;

const PlotWrapper = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  color: #2c3e50;
  margin-top: 80px;
`;

const PlotTitle = styled.h2`
  font-size: 18px;
`;

const PlotText = styled.p`
  font-size: 14px;
`;

export default function Detail() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/search");
  };

  return (
    <div className="page">
      <Header />
      <MovieInfo>
        <BackButton onClick={handleBackClick}>이전</BackButton>
        <MovieTitle>괴물</MovieTitle>
        <Divider />
        <MoviePoster src="https://example.com/monster.jpg" alt="괴물 포스터" />
        <MovieMeta>12세 관람가, 대한민국, 119분</MovieMeta>
        <MovieMeta>2006-07-27</MovieMeta>
        <MovieMeta>감독  |  봉준호</MovieMeta>
        <PlotWrapper>
          <PlotTitle>Plot</PlotTitle>
          <PlotText>
            한강 둔치에서 아버지(변희봉)와 햄버거를 먹고 돌아오는 강두(송강호)는 둔치 옆에서 
            무언가 꿈틀대는 물체를 본다. 공포의 정체가 드러나고...
          </PlotText>
        </PlotWrapper>
      </MovieInfo>
    </div>
  );
}
