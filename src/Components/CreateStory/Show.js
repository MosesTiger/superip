import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from '../../context/AuthProvider'; // 적절한 경로로 수정해주세요
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer
} from 'recharts';

// 스타일 컴포넌트 정의
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

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
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

const TextContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: black;
`;

const Select = styled.select`
  margin-top: 10px;
  padding: 5px;
  font-size: 16px;
  width: 100%;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 67%;
`;

const PenaltySection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
  justify-content: flex-start;
  gap: 10px;
  color: white;
  width: 90%;
  height: 130px;
`;

const PenaltyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
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
    props.content === "star" || props.content === "first" || props.content === "second"
      ? "30px"
      : "40px"};
  font-weight: bold;
  text-align: right;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
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

const AnalysisSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

// 그래프 컴포넌트 구현
const Graph = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>데이터가 없습니다.</p>;
  }

  const graphData = Object.entries(data)
    .filter(([key]) => key.endsWith("_점수"))
    .map(([key, value]) => ({
      subject: key.replace("_점수", ""),
      A: parseFloat(value),
      fullMark: 100,
    }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={graphData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="점수"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const BoxofficeSection = ({
  genreScore,
  runtimeScore,
  ratingScore,
  countryScore,
  onMoreClick,
}) => (
  <div style={{ width: '100%' }}>
    <Sectiontitlewrap>
      <Sectiontitle>1차 흥행도 분석표</Sectiontitle>
      <MoreButton onClick={onMoreClick}>분석 더보기</MoreButton>
    </Sectiontitlewrap>
    {/* 박스오피스 분석표 */}
    <div>
      <p>장르 점수: {genreScore}</p>
      <p>러닝타임 점수: {runtimeScore}</p>
      <p>등급 점수: {ratingScore}</p>
      <p>국가 점수: {countryScore}</p>
    </div>
  </div>
);

function Show() {
  const { token } = useAuth(); // 토큰 가져오기

  const [isAnalysisPopupOpen, setIsAnalysisPopupOpen] = useState(false);
  const [isBoxofficePopupOpen, setIsBoxofficePopupOpen] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  const [userScenarios, setUserScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState("");
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserScenarios();
  }, []);

  // 사용자 시나리오 가져오기
  const fetchUserScenarios = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/scenario/user-scenarios",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserScenarios(response.data);
    } catch (error) {
      console.error("Error fetching user scenarios:", error);
      setError("시나리오를 가져오는 데 실패했습니다.");
    }
  };

  // 시나리오 선택 처리
  const handleScenarioSelect = async (e) => {
    const scenarioId = e.target.value;
    setSelectedScenarioId(scenarioId);
    setSelectedScenario(null);
    setError(null);

    if (scenarioId) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/scenario/${scenarioId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSelectedScenario(response.data);
        // 선택된 시나리오 기반으로 예측 데이터 가져오기
        fetchPredictionData(scenarioId);
      } catch (error) {
        console.error("Error fetching scenario details:", error);
        setError("시나리오 정보를 가져오는 데 실패했습니다.");
      }
    }
  };

  // 예측 데이터 가져오기
  const fetchPredictionData = async (scenarioId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/success_rate/final_predict",
        {
          scenario_id: scenarioId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setPredictionData(response.data);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
      // 에러 상태를 설정할 수 있습니다.
    }
  };

  // 팝업 토글 함수
  const toggleAnalysisPopup = () =>
    setIsAnalysisPopupOpen(!isAnalysisPopupOpen);
  const toggleBoxofficePopup = () =>
    setIsBoxofficePopupOpen(!isBoxofficePopupOpen);

  const isPopupOpen = isAnalysisPopupOpen || isBoxofficePopupOpen;

  // 예측 데이터에서 필요한 점수 추출
  const genreScore = predictionData?.detailed_scores?.genre_score || 85;
  const runtimeScore = predictionData?.detailed_scores?.runtime_score || 70;
  const ratingScore = predictionData?.detailed_scores?.rating_score || 50;
  const countryScore = predictionData?.detailed_scores?.country_score || 90;

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
          <Titleposter src="/영화 포스터 예제 1.svg" alt="영화 포스터" />
          <Plot>
            <TitleContent>
              Title: {selectedScenario ? selectedScenario.title : "시나리오 제목"}
            </TitleContent>
            <TextContent>
              {selectedScenario
                ? selectedScenario.synopsis || "시놉시스 내용이 여기에 표시됩니다."
                : "시놉시스 내용이 여기에 표시됩니다."}
            </TextContent>
            <Select
              onChange={handleScenarioSelect}
              value={selectedScenarioId || ""}
            >
              <option value="">시나리오를 선택하세요</option>
              {userScenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </option>
              ))}
            </Select>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Plot>
        </TitleSection>
        <ResultContainer>
          <PenaltySection>
            <Sectiontitle>최종 흥행 분석표</Sectiontitle>
            <PenaltyContainer>
              <Div1>
                <Divtitle>예상 흥행 등급</Divtitle>
                <DivContent content="rating">
                  {predictionData ? predictionData["최종 흥행도"] : "-"}
                </DivContent>
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
                  {predictionData
                    ? `${predictionData.predicted_rating} / 5`
                    : "- / 5"}
                </DivContent>
              </Div2>
              <Div3>
                <Divtitle>1차 흥행도 예측</Divtitle>
                <DivContent content="first">
                  {predictionData ? predictionData.first_success_rate : "-"}
                </DivContent>
              </Div3>
              <Div4>
                <Divtitle>시나리오 완성도</Divtitle>
                <DivContent content="second">
                  {predictionData
                    ? `${predictionData.completion_score}%`
                    : "-%"}
                </DivContent>
              </Div4>
            </PenaltyContainer>
          </PenaltySection>
          <AnalysisSection>
            <Sectiontitlewrap>
              <Sectiontitle>시나리오 완성도 분석표</Sectiontitle>
              <MoreButton onClick={toggleAnalysisPopup}>분석 더보기</MoreButton>
            </Sectiontitlewrap>
            <Graph data={predictionData?.["완성도 점수"]} />
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
          {/* 완성도 점수 상세 내용 표시 */}
          <div>
            {predictionData && predictionData["완성도 점수"] && (
              <ul>
                {Object.entries(predictionData["완성도 점수"]).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Popup>
      )}

      {isBoxofficePopupOpen && (
        <Popup>
          <CloseButton onClick={toggleBoxofficePopup}>닫기</CloseButton>
          <h2>1차 흥행도 분석표 자세히 보기</h2>
          {/* 상세 흥행 분석 내용 표시 */}
          <div>
            {predictionData && predictionData.detailed_scores && (
              <ul>
                {Object.entries(predictionData.detailed_scores).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Popup>
      )}
    </>
  );
}

export default Show;
