import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from "react";
// BoxofficeSection styled components
const BoxofficeSectionContainer = styled.div`
  width: 90%;
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const Sectiontitlewrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Sectiontitle = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: black;
`;

const MoreButton = styled.button`
  padding: 3px 10px;
  font-size: 14px;
  background: none;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  align-items: center;
  color: white;
  height: 95%;
  width: 95%;
  padding: 10px 0;
`;

const Boxtitle = styled.div`
  font-size: 17px;
  font-weight: bold;
  padding: 10px 20px;
`;

const Boxcontent = styled.div`
  font-size: 15px;
  padding: 5px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Box1 = styled.div`
  grid-column: 1;
  grid-row: 1;
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Box2 = styled.div`
  grid-column: 2;
  grid-row: 1;
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Box3 = styled.div`
  grid-column: 2;
  grid-row: 2;
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Box4 = styled.div`
  grid-column: 1;
  grid-row: 2;
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// 등급 박스 스타일링
const GradeBox = styled.div`
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ grade }) => {
    switch (grade) {
      case "Excellent":
        return "#237ACA";
      case "Good":
        return "#00BD08";
      case "Normal":
        return "#BDAA00";
      case "Bad":
        return "red";
      default:
        return "#ccc";
    }
  }};
`;

// 점수를 등급으로 변환하는 함수
const getGrade = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Normal";
  return "Bad";
};

// BoxofficeSection 컴포넌트
const BoxofficeSection = ({ scenarioId, onMoreClick }) => {
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get(`/api/scenario/${scenarioId}/first-predict`);
        setAnalysisData(response.data);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    fetchAnalysisData();
  }, [scenarioId]);

  if (!analysisData) return <div>Loading...</div>;

  const { genre_score, runtime_score, rating_score, country_score } = analysisData.상세_점수;

  return (
    <BoxofficeSectionContainer>
      <Sectiontitlewrap>
        <Sectiontitle>1차 흥행도 분석표</Sectiontitle>
        <MoreButton onClick={onMoreClick}>분석 더보기</MoreButton>
      </Sectiontitlewrap>
      <BoxContainer>
        <Box1>
          <Boxtitle>장르</Boxtitle>
          <Boxcontent>
            {analysisData.genre} :&nbsp;
            <GradeBox grade={getGrade(genre_score)}>
              {getGrade(genre_score)}
            </GradeBox>
          </Boxcontent>
        </Box1>
        <Box2>
          <Boxtitle>상영 시간</Boxtitle>
          <Boxcontent>
            {analysisData.runtime}분 :&nbsp;
            <GradeBox grade={getGrade(runtime_score)}>
              {getGrade(runtime_score)}
            </GradeBox>
          </Boxcontent>
        </Box2>
        <Box3>
          <Boxtitle>관람 등급</Boxtitle>
          <Boxcontent>
            {analysisData.rating} :&nbsp;
            <GradeBox grade={getGrade(rating_score)}>
              {getGrade(rating_score)}
            </GradeBox>
          </Boxcontent>
        </Box3>
        <Box4>
          <Boxtitle>배경 국가</Boxtitle>
          <Boxcontent>
            {analysisData.country} :&nbsp;
            <GradeBox grade={getGrade(country_score)}>
              {getGrade(country_score)}
            </GradeBox>
          </Boxcontent>
        </Box4>
      </BoxContainer>
    </BoxofficeSectionContainer>
  );
};

export default BoxofficeSection;