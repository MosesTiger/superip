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
  const [isPolling, setIsPolling] = useState(false);
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
  const pollingTimeoutRef = React.useRef(null);

  const fetchUserScenarios = async () => {
    try {
      const response = await axios.get('http://43.200.111.65/api/v1/scenario/user-scenarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserScenarios(response.data);
    } catch (error) {
      handleApiError(error, "시나리오 목록을 가져오는 중 오류가 발생했습니다.");
    }
  };

  const startPollingSuccessRate = (scenarioId) => {
    setIsPolling(true);
    let attempts = 0;
    const maxAttempts = 10; // 최대 10번 시도
    const pollInterval = 1000; // 1초마다 시도

    const pollSuccessRate = async () => {
      if (attempts >= maxAttempts) {
        setIsPolling(false);
        return;
      }

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
          setIsPolling(false);
        } else {
          attempts++;
          pollingTimeoutRef.current = setTimeout(pollSuccessRate, pollInterval);
        }
      } catch (error) {
        attempts++;
        pollingTimeoutRef.current = setTimeout(pollSuccessRate, pollInterval);
      }
    };

    pollSuccessRate();
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
      }
    } catch (error) {
      console.error("Error fetching success rate:", error);
    }
  };

  const handleScenarioChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedScenarioTitle(selectedTitle);
    if (selectedTitle) {
      const scenario = userScenarios.find(s => s.title === selectedTitle);
      if (scenario) {
        fetchScenarioDetails(selectedTitle);
        fetchSuccessRate(scenario.id); // 기존 시나리오의 경우 바로 흥행률 조회
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
      setError(null);
    } catch (error) {
      handleApiError(error, "시나리오 정보를 가져오는 중 오류가 발생했습니다.");
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
        setError("선택된 시나리오의 ID를 찾을 수 없습니다.");
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
        setError("시놉시스 생성 중 오류가 발생했습니다.");
        setIsGenerating(false);
        eventSource.close();
        eventSourceRef.current = null;
      });

      eventSource.addEventListener('complete', async () => {
        setIsGenerating(false);
        eventSource.close();
        eventSourceRef.current = null;
        // 시놉시스 생성이 완료되면 폴링 시작
        startPollingSuccessRate(scenarioId);
      });

    } catch (error) {
      handleApiError(error, "시놉시스 생성 중 오류가 발생했습니다.");
      setIsGenerating(false);
    }
  };

  const handleApiError = (error, defaultMessage) => {
    let errorMessage = defaultMessage;
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "인증 토큰이 만료되었습니다. 다시 로그인해주세요.";
        logout();
      } else if (error.response.status === 422) {
        errorMessage = `데이터 형식이 올바르지 않습니다. 오류 메시지: ${JSON.stringify(error.response.data)}`;
      } else if (error.response.data && error.response.data.detail) {
        errorMessage = error.response.data.detail;
      }
    }
    setError(errorMessage);
  };

  // 컴포넌트가 언마운트될 때 정리
  useEffect(() => {
    return () => {
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, []);

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
          {isPolling && (
            <SuccessRateDisplay>
              흥행률 분석 중...
            </SuccessRateDisplay>
          )}
          <ButtonContainer>
            <Button
              onClick={generateSynopsis}
              disabled={isGenerating}
            >
              {isGenerating ? "생성 중..." : "시놉시스 생성"}
            </Button>
          </ButtonContainer>
        </>
      )}
    </Section>
  );
}

export default Synopsis;