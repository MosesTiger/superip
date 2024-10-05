import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TextContent from "./TextContent";
import Graph from "./Graph";
import BoxofficeSection from "./BoxofficeSection";

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  min-height: calc(100vh - 70px);
  width: 95vw;
  box-sizing: border-box;
  background-color: #1e1e1e;
  transform: translateX(-50px);
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 67%; /* 가로 크기 확실히 지정 */
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
  background-color: #f5f5f5;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1); /* 오른쪽과 아래쪽에 섀도우 추가 */
`;

const TitleSection = styled(DashboardSection)`
  height: 480px;
  width: 30%;
`;

const Titleposter = styled.img`
  background-color: black;
  width: 100%;
  height: 60%;
`;

const Plot = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding: 10px;
  color: black;
  box-sizing: border-box;
  overflow: hidden;
`;

const TitleContent = styled.div`
  max-height: 100px;
  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 17px;
  font-weight: bold;
  position: relative;
`;

const PenaltySection = styled(DashboardSection)`
  display: flex;
  justify-content: flex-start;
  gap: 10px; /* 각 div 간격 */
  color: white;
  width: 90%;
  height: 130px;
`;

const PenaltyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px; /* 각 div 간격 */
  align-items: center;
  color: white;
  width: 100%;
`;

const Divtitle = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  padding-left: 20px;
  padding-top: 8px;
  padding-bottom: 5px;
`;

const DivContent = styled.div`
  width: 100%;
  font-size: ${(props) =>
    props.content === "star" ||
    props.content === "first" ||
    props.content === "second"
      ? "30px"
      : "40px"};
  font-weight: bold;
  text-align: right;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end; /* 수평 방향 오른쪽 정렬 */
  align-items: center; /* 수직 방향 중앙 정렬 */
  height: 100%; /* 부모 높이에 맞추기 */
`;

const Div1 = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 20%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Div2 = styled(Div1)`
  width: 20%;
`;

const Div3 = styled(Div1)`
  width: 20%;
`;

const Div4 = styled(Div1)`
  width: 20%;
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

const AnalysisSection = styled(DashboardSection)`
  width: 90%;
  height: 300px;
  align-items: center;
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

const graphData = [
  { label: "개연성", value: 85 },
  { label: "기승전결", value: 70 },
  { label: "흐름", value: 55 },
  { label: "시나리오 완성도", value: 90 },
];

function Show() {
  const longText = `
    이것은 매우 긴 텍스트입니다. 128자를 넘어가는 텍스트는 자동으로 자르고 '더보기' 버튼을 생성하게 됩니다. 예를 들어 이 텍스트는 128자를 넘어가도록 작성하고 있습니다. 사용자가 더보기를 클릭하면 전체 텍스트를 팝업 창에서 확인할 수 있습니다. 자주 사용될 수 있는 패턴입니다.
  `;
  const genreScore = 85;
  const runtimeScore = 70;
  const ratingScore = 50;
  const countryScore = 90;

  const [isAnalysisPopupOpen, setIsAnalysisPopupOpen] = useState(false);
  const [isBoxofficePopupOpen, setIsBoxofficePopupOpen] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    fetchPredictionData();
  }, []);

  const fetchPredictionData = async () => {
    try {
      const response = await axios.post(
        "http://43.200.200.147/api/v1/success-rate/first_predict",
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
        <TitleSection>
          <Titleposter />
          <Plot>
            <TitleContent>Title:그냥 타이틀</TitleContent>
            <TextContent content={longText} />
          </Plot>
        </TitleSection>
        <ResultContainer>
          <PenaltySection>
            <Sectiontitle>최종 흥행 분석표</Sectiontitle>
            <PenaltyContainer>
              <Div1>
                <Divtitle>예상 흥행 등급</Divtitle>
                <DivContent content="rating">A</DivContent>
              </Div1>
              <Div2>
                <Divtitle>예상 별점</Divtitle>
                <DivContent content="star">
                  <img
                    src="/별.svg"
                    alt="별"
                    style={{
                      width: "40px",
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                  />
                  {/*{predictionData && (
                  <p>{predictionData["최종 흥행도"].average_score.toFixed(1)}</p>
                )}*/}
                  3.0 / 4.5
                </DivContent>
              </Div2>
              <Div3>
                <Divtitle>1차 흥행도 예측</Divtitle>
                <DivContent content="first">A</DivContent>
              </Div3>
              <Div4>
                <Divtitle>시나리오 완성도</Divtitle>
                <DivContent content="second">70%</DivContent>
              </Div4>
            </PenaltyContainer>
          </PenaltySection>
          <AnalysisSection>
            <Sectiontitlewrap>
              <Sectiontitle>시나리오 완성도 분석표</Sectiontitle>
              <MoreButton onClick={toggleAnalysisPopup}>분석 더보기</MoreButton>
            </Sectiontitlewrap>
            <Graph data={graphData} />
          </AnalysisSection>
          <BoxofficeSection
            genreScore={genreScore}
            runtimeScore={runtimeScore}
            ratingScore={ratingScore}
            countryScore={countryScore}
            onMoreClick={toggleBoxofficePopup}
          />
        </ResultContainer>
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
