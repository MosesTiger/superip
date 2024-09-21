import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 70px);
  width: 95vw;
  box-sizing: border-box;
  background-color: #182e3f;
  transform: translateX(-50px);
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transform: translateX(-20px);
`;

const DashboardSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: #edf6f6;
  box-sizing: border-box;
  position: relative;
`;

const TitleSection = styled(DashboardSection)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const PenaltySection = styled(DashboardSection)`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

const AnalysisSection = styled(DashboardSection)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const BoxofficeSection = styled(DashboardSection)`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

const MoreButton = styled.button`
  margin-top: auto;
  margin-left: auto;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 20px;
  width: 120px;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85vw;
  height: 85vh;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  z-index: 1000;
  overflow-y: auto;
  border: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function Show() {
  // 대문자로 시작하도록 수정
  const [isAnalysisPopupOpen, setIsAnalysisPopupOpen] = useState(false);
  const [isBoxofficePopupOpen, setIsBoxofficePopupOpen] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    fetchPredictionData();
  }, []);

  const fetchPredictionData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/success-rate/first_predict",
        {
          keyword: "범죄도시 5",
          genre: "액션",
          runtime: 120,
          gender: "남성",
          rating: "15세 이상",
          theme: "범죄",
        }
      );
      setPredictionData(response.data.evaluation);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    }
  };

  const toggleAnalysisPopup = () =>
    setIsAnalysisPopupOpen(!isAnalysisPopupOpen);
  const toggleBoxofficePopup = () =>
    setIsBoxofficePopupOpen(!isBoxofficePopupOpen);

  const isPopupOpen = isAnalysisPopupOpen || isBoxofficePopupOpen;

  return (
    <>
      <DashboardContainer>
        {isPopupOpen && (
          <Overlay
            onClick={() => {
              setIsAnalysisPopupOpen(false);
              setIsBoxofficePopupOpen(false);
            }}
          />
        )}
        <TitleSection className="title-section">
          <h3>제목: 범죄도시 5dkjdkj</h3>
        </TitleSection>
        <AnalysisSection className="analysis-section">
          <h3>시나리오 완성도 분석표</h3>
          <MoreButton onClick={toggleAnalysisPopup}>더보기</MoreButton>
        </AnalysisSection>
        <PenaltySection className="penalty-section">
          <h3>예상 별점</h3>
          {predictionData && (
            <p>{predictionData["최종 흥행도"].average_score.toFixed(1)}</p>
          )}
        </PenaltySection>
        <BoxofficeSection className="boxoffice-section">
          <h3>1차 흥행도 분석표</h3>
          <MoreButton onClick={toggleBoxofficePopup}>더보기</MoreButton>
        </BoxofficeSection>
      </DashboardContainer>

      {isAnalysisPopupOpen && (
        <Popup>
          <CloseButton onClick={toggleAnalysisPopup}>닫기</CloseButton>
          <h2>시나리오 완성도 분석표 자세히 보기</h2>
          {/* Add detailed analysis content here */}
        </Popup>
      )}

      {isBoxofficePopupOpen && (
        <Popup>
          <CloseButton onClick={toggleBoxofficePopup}>닫기</CloseButton>
          <h2>1차 흥행도 분석표 자세히 보기</h2>
          {/* Add detailed boxoffice analysis content here */}
        </Popup>
      )}
    </>
  );
}

export default Show;
