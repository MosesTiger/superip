import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from '../../context/AuthProvider';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer
} from 'recharts';

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

const AnalysisSection = styled(PenaltySection)`
  height: 300px;
  padding: 20px;
  margin-top: -10px;
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

const Div2 = styled(Div1)``;
const Div3 = styled(Div1)``;
const Div4 = styled(Div1)``;

const Sectiontitle = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: black;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

// 그래프 컴포넌트
const Graph = ({ data }) => {
  const graphData = [
    { subject: '일관성', A: data?.coherence || 0, fullMark: 100 },
    { subject: '구조', A: data?.structure || 0, fullMark: 100 },
    { subject: '흐름', A: data?.flow || 0, fullMark: 100 }
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={graphData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="점수"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

function Show() {
  const { token } = useAuth();
  const [predictionData, setPredictionData] = useState(null);
  const [userScenarios, setUserScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState("");
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserScenarios();
  }, []);

  const fetchUserScenarios = async () => {
    try {
      const response = await axios.get(
        "http://43.200.111.65/api/v1/scenario/user-scenarios",
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

  const handleScenarioSelect = async (e) => {
    const scenarioId = e.target.value;
    setSelectedScenarioId(scenarioId);
    setSelectedScenario(null);
    setError(null);

    if (scenarioId) {
      try {
        const response = await axios.get(
          `http://43.200.111.65/api/v1/scenario/${scenarioId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSelectedScenario(response.data);
        fetchPredictionData(scenarioId);
      } catch (error) {
        console.error("Error fetching scenario details:", error);
        setError("시나리오 정보를 가져오는 데 실패했습니다.");
      }
    }
  };

  const fetchPredictionData = async (scenarioId) => {
    try {
      const response = await axios.post(
        "http://43.200.111.65/api/v1/success_rate/final_predict",
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

      // 1차 예측 데이터 가져오기
      const firstPredictionResponse = await axios.get(
        `http://43.200.111.65/api/v1/success_rate/scenario/${scenarioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPredictionData({
        ...response.data,
        first_success_rate: firstPredictionResponse.data.first_predicted_rate
      });
    } catch (error) {
      console.error("Error fetching prediction data:", error);
      setError("예측 데이터를 가져오는 데 실패했습니다.");
    }
  };

  return (
    <DashboardContainer>
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
                {predictionData?.final_grade || "-"}
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
                {predictionData ? `${predictionData.star_rating} / 5` : "- / 5"}
              </DivContent>
            </Div2>
            <Div3>
              <Divtitle>1차 흥행도 예측</Divtitle>
              <DivContent content="first">
                {predictionData?.first_success_rate || "-"}
              </DivContent>
            </Div3>
            <Div4>
              <Divtitle>시나리오 완성도</Divtitle>
              <DivContent content="second">
                {predictionData ? `${predictionData.completion}%` : "-%"}
              </DivContent>
            </Div4>
          </PenaltyContainer>
        </PenaltySection>
        <AnalysisSection>
          <Sectiontitle>시나리오 완성도 분석표</Sectiontitle>
          <Graph
            data={{
              coherence: predictionData?.coherence || 0,
              structure: predictionData?.structure || 0,
              flow: predictionData?.flow || 0,
            }}
          />
        </AnalysisSection>
      </ResultContainer>
    </DashboardContainer>
  );
}

export default Show;