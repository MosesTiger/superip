import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from "../../context/AuthProvider";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 100%;
  margin: 0;
  font-size: 16px;
  color: #000;
  position: relative;
  padding-right: 35px;
`;

const TitleDisplay = styled.h2`
  font-size: 18px;
  color: #4a4a4a;
  margin-bottom: 20px;
  text-align: left;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  font-size: 16px;
  color: #000;
  background-color: #f5f5f5;
  display: block;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const RateButton = styled(Button)`
  background-color: #28a745;
  &:hover:not(:disabled) {
    background-color: #218838;
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: #4a4a4a;
  margin-bottom: 10px;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  text-align: center;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 5px;
  display: ${props => props.error ? 'block' : 'none'};
`;

const SuccessRateDisplay = styled.div`
  font-size: 18px;
  color: #28a745;
  margin: 15px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  text-align: center;
`;

const LabelWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RefreshButton = styled.button`
  padding: 5px 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #5a6268;
  }
`;

function Synopsis() {
  const [plot, setPlot] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedScenarioTitle, setSelectedScenarioTitle] = useState("");
  const [title, setTitle] = useState("");
  const [userScenarios, setUserScenarios] = useState([]);
  const [error, setError] = useState(null);
  const [successRate, setSuccessRate] = useState(null);
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchUserScenarios();
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [token]);

  const eventSourceRef = React.useRef(null);

  const fetchUserScenarios = async () => {
    try {
      const response = await axios.get('http://43.200.111.65/api/v1/scenario/user-scenarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserScenarios(response.data);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
    }
  };

  const fetchSuccessRate = async (scenarioId) => {
    try {
      const response = await axios.get(
        `http://43.200.111.65/api/v1/success_rate/scenario/${scenarioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.first_predicted_rate) {
        setSuccessRate(response.data.first_predicted_rate);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching success rate:", error);
      return false;
    }
  };

  const handleViewSuccessRate = async () => {
    const scenarioId = userScenarios.find(s => s.title === selectedScenarioTitle)?.id;
    if (!scenarioId) {
      setError("시나리오 ID를 찾을 수 없습니다.");
      return;
    }
    
    setIsLoadingRate(true);
    setError(null);
    
    try {
      const success = await fetchSuccessRate(scenarioId);
      if (!success) {
        setError("흥행률 데이터가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      setError("흥행률을 가져오는데 실패했습니다.");
    } finally {
      setIsLoadingRate(false);
    }
  };

  const handleScenarioChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedScenarioTitle(selectedTitle);
    setError(null);
    if (selectedTitle) {
      const scenario = userScenarios.find(s => s.title === selectedTitle);
      if (scenario) {
        fetchScenarioDetails(selectedTitle);
        fetchSuccessRate(scenario.id);
      }
    } else {
      setTitle("");
      setPlot("");
      setSuccessRate(null);
    }
  };

  const fetchScenarioDetails = async (title) => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const url = `http://43.200.111.65/api/v1/synopsis/by-title/${encodedTitle}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setTitle(data.title);
      setPlot(data.synopsis || "");
    } catch (error) {
      console.error("Error fetching scenario details:", error);
    }
  };

  const generateSynopsis = async () => {
    if (!selectedScenarioTitle) {
      setError("시나리오를 선택해주세요.");
      return;
    }
    setIsGenerating(true);
    setPlot("");
    setSuccessRate(null);
    setError(null);

    try {
      const scenarioId = userScenarios.find(s => s.title === selectedScenarioTitle)?.id;
      if (!scenarioId) {
        setIsGenerating(false);
        return;
      }

      const tokenParam = encodeURIComponent(token);
      const url = `http://43.200.111.65/api/v1/synopsis/generate-synopsis-stream/${scenarioId}?token=${tokenParam}`;
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      let synopsisText = "";

      eventSource.onmessage = (e) => {
        synopsisText += e.data;
        setPlot(synopsisText);
      };

      eventSource.addEventListener('error', (e) => {
        console.error("EventSource failed:", e);
        setIsGenerating(false);
        eventSource.close();
        eventSourceRef.current = null;
      });

      eventSource.addEventListener('complete', () => {
        setIsGenerating(false);
        eventSource.close();
        eventSourceRef.current = null;
      });

    } catch (error) {
      console.error("Synopsis generation error:", error);
      setIsGenerating(false);
    }
  };

  return (
    <Section>
      <LabelWrap>
        <Label>시나리오 선택</Label>
        <RefreshButton onClick={fetchUserScenarios}>새로고침</RefreshButton>
      </LabelWrap>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select value={selectedScenarioTitle} onChange={handleScenarioChange}>
          <option value="">시나리오를 선택하세요</option>
          {userScenarios.map((scenario, index) => (
            <option key={index} value={scenario.title}>
              {scenario.title}
            </option>
          ))}
        </Select>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {selectedScenarioTitle && (
        <>
          <TitleDisplay>제목 : {title}</TitleDisplay>
          <Label>시놉시스</Label>
          <TextArea
            placeholder="시놉시스를 생성하려면 '시놉시스 생성' 버튼을 클릭하세요."
            value={plot}
            readOnly={true}
          />
          {successRate && (
            <SuccessRateDisplay>
              예상 흥행률: {successRate}
            </SuccessRateDisplay>
          )}
          <ButtonContainer>
            <Button
              onClick={generateSynopsis}
              disabled={isGenerating}
            >
              {isGenerating ? "생성 중..." : "시놉시스 생성"}
            </Button>
            {plot && !successRate && (
              <RateButton
                onClick={handleViewSuccessRate}
                disabled={isLoadingRate}
              >
                {isLoadingRate ? "분석 중..." : "1차 흥행률 보기"}
              </RateButton>
            )}
          </ButtonContainer>
        </>
      )}
    </Section>
  );
}

export default Synopsis;