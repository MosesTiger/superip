import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TextContent from "./TextContent";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-template-rows: repeat(11, 1fr);
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
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1); /* 오른쪽과 아래쪽에 섀도우 추가 */
`;

const TitleSection = styled(DashboardSection)`
  grid-column: 1 / 2;
  grid-row: 1 / 8;
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
  grid-column: 1 / 2;
  grid-row: 8 / 12;
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 2x2 그리드로 나눔 */
  grid-template-rows: 1.2fr 1fr;
  gap: 10px; /* 각 div 간격 */
  align-items: center;
  color: white;
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
  grid-column: 1 / 5;
  background-color: #4e6371;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Div2 = styled.div`
  grid-column: 5 / 9;
  background-color: #4e6371;
  border-radius: 8px;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Div3 = styled.div`
  grid-column: 1 / 4;
  background-color: #4e6371;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Div4 = styled.div`
  grid-column: 4 / 7;
  background-color: #4e6371;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Sectiontitlewrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Sectiontitle = styled.div`
  font-size: 17px;
  font-weight: bold;
`;

const AnalysisSection = styled(DashboardSection)`
  grid-column: 2 / 3;
  grid-row: 1 / 6;
`;

const BoxofficeSection = styled(DashboardSection)`
  grid-column: 2 / 3;
  grid-row: 6 / 12;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1.2fr 1fr;
  gap: 10px; /* 각 div 간격 */
  box-sizing: border-box;
  align-items: center;
  color: white;
  height: 95%;
  padding: 10px 0px;
`;

const Boxtitle = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: bold;
  padding: 10px 20px;
`;

const Boxcontent = styled.div`
  width: 100%;
  font-size: 15px;
  padding: 5px 20px;
`;

const Box1 = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;
  background-color: #4e6371;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Box1content = styled.div`
  width: 100%;
  font-size: 13px;
  padding: 0px 10px;
  white-space: pre-wrap;
`;

const Box2 = styled.div`
  grid-column: 2;
  grid-row: 1;
  background-color: #4e6371;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Box2content = styled.div`
  width: 100%;
  font-size: 13px;
  padding: 0px 10px;
  white-space: pre-wrap;
`;

const Box3 = styled.div`
  grid-column: 2;
  grid-row: 2;
  background-color: #4e6371;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Box4 = styled.div`
  grid-column: 3;
  grid-row: 1 / 3;
  background-color: #4e6371;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MoreButton = styled.button`
  padding: 3px 10px;
  font-size: 14px;
  background: none;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
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
  const longText = `
    이것은 매우 긴 텍스트입니다. 128자를 넘어가는 텍스트는 자동으로 자르고 '더보기' 버튼을 생성하게 됩니다. 예를 들어 이 텍스트는 128자를 넘어가도록 작성하고 있습니다. 사용자가 더보기를 클릭하면 전체 텍스트를 팝업 창에서 확인할 수 있습니다. 자주 사용될 수 있는 패턴입니다.
  `;
  const [isAnalysisPopupOpen, setIsAnalysisPopupOpen] = useState(false);
  const [isBoxofficePopupOpen, setIsBoxofficePopupOpen] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  const genreRank = `
    장르 추천 순위

    1위 : 액션
    2위 : 멜로
    3위 : 드라마
    4위 : 범죄
    5위 : 판타지
  `;
  const screenTime = `
    추천 상영 시간
    100 ~ 120분
  `;
  const countryRank = `
    배경국가 추천 순위

    1위 : 한국
    2위 : 미국
    3위 : 일본
    4위 : 중국
    5위 : 베트남
  `;

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
        <TitleSection>
          <Titleposter />
          <Plot>
            <TitleContent>Title:그냥 타이틀</TitleContent>
            <TextContent content={longText} />
          </Plot>
        </TitleSection>
        <AnalysisSection>
          <Sectiontitle>시나리오 완성도 분석표</Sectiontitle>
          <MoreButton onClick={toggleAnalysisPopup}>분석 더보기</MoreButton>
        </AnalysisSection>
        <PenaltySection>
          <Div1>
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
          </Div1>
          <Div2>
            <Divtitle>예상 흥행 등급</Divtitle>
            <DivContent content="rating">A</DivContent>
          </Div2>
          <Div3>
            <Divtitle>1차 흥행도 예측</Divtitle>
            <DivContent content="first">80%</DivContent>
          </Div3>
          <Div4>
            <Divtitle>시나리오 완성도</Divtitle>
            <DivContent content="second">70%</DivContent>
          </Div4>
        </PenaltySection>
        <BoxofficeSection>
          <Sectiontitlewrap>
            <Sectiontitle>1차 흥행도 분석표</Sectiontitle>
            <MoreButton onClick={toggleBoxofficePopup}>분석 더보기</MoreButton>
          </Sectiontitlewrap>
          <BoxContainer>
            <Box1>
              <Boxtitle>장르</Boxtitle>
              <Boxcontent>장르 내용내용내용</Boxcontent>
              <Box1content>{genreRank}</Box1content>
            </Box1>
            <Box2>
              <Boxtitle>상영 시간</Boxtitle>
              <Boxcontent>상영시간 내용내용내용</Boxcontent>
              <Box2content>{screenTime}</Box2content>
            </Box2>
            <Box3>
              <Boxtitle>관람 등급</Boxtitle>
              <Boxcontent>관람등급 내용내용내용</Boxcontent>
            </Box3>
            <Box4>
              <Boxtitle>배경 국가</Boxtitle>
              <Boxcontent>배경국가 내용내용내용</Boxcontent>
              <Box1content>{countryRank}</Box1content>
            </Box4>
          </BoxContainer>
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
