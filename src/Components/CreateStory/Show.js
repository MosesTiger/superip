import React, { useState } from 'react';
import styled from 'styled-components';
import StoryNav from './StoryNav';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
  grid-template-rows: repeat(2, 1fr); /* 두 개의 행 */
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 80px); /* 헤더 높이만큼 줄임 */
  width: 100vw;
  box-sizing: border-box;
  background-color: #182E3F;
`;

const DashboardSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: #EDF6F6;
  box-sizing: border-box;
  position: relative;
`;

const MoreButton = styled.button`
  margin-top: auto; /* 버튼을 하단으로 위치시킴 */
  padding: 5px 10px;
  font-size: 14px;
  background-color: #0056b3; /* 어두운 파란색 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85vw;
  height: 85vh;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* 그림자 더 뚜렷하게 */
  z-index: 1000;
  overflow-y: auto;
  border: none; /* 테두리 제거 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #d9534f; /* 어두운 빨간색 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function Show() {
  const [isAnalysisPopupOpen, setIsAnalysisPopupOpen] = useState(false);
  const [isBoxofficePopupOpen, setIsBoxofficePopupOpen] = useState(false);

  const toggleAnalysisPopup = () => setIsAnalysisPopupOpen(!isAnalysisPopupOpen);
  const toggleBoxofficePopup = () => setIsBoxofficePopupOpen(!isBoxofficePopupOpen);

  // URL 경로를 확인하여 StoryNav를 숨길지 결정합니다.
  const hideStoryNav = window.location.pathname === '/create/predict';

  return (
    <>
      {/* hideStoryNav가 true일 경우 StoryNav를 렌더링하지 않음 */}
      {!hideStoryNav && <StoryNav hideNav={true} />}
      <DashboardContainer>
        <DashboardSection className="title-section">
          <h2>제목: 범죄도시 5</h2>
        </DashboardSection>
        <DashboardSection className="analysis-section">
          <h2>시나리오 완성도 분석표</h2>
          <MoreButton onClick={toggleAnalysisPopup}>더보기</MoreButton>
        </DashboardSection>
        <DashboardSection className="penalty-section">
          <h2>예상 별점</h2>
        </DashboardSection>
        <DashboardSection className="boxoffice-section">
          <h2>1차 흥행도 분석표</h2>
          <MoreButton onClick={toggleBoxofficePopup}>더보기</MoreButton>
        </DashboardSection>
      </DashboardContainer>

      {isAnalysisPopupOpen && (
        <Popup>
          <CloseButton onClick={toggleAnalysisPopup}>닫기</CloseButton>
          <h2>시나리오 완성도 분석표 자세히 보기</h2>
        </Popup>
      )}

      {isBoxofficePopupOpen && (
        <Popup>
          <CloseButton onClick={toggleBoxofficePopup}>닫기</CloseButton>
          <h2>1차 흥행도 분석표 자세히 보기</h2>
        </Popup>
      )}
    </>
  );
}

export default Show;
