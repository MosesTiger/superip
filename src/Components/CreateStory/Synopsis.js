import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;

    &:hover {
      background-color: #cccccc;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessRateDisplay = styled.div`
  font-size: 20px;
  margin-top: 10px;
  color: #4a4a4a;
  font-weight: bold;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const RefreshButton = styled.button`
  background-color: #f5f5f5;
  color: black;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  width: 120px;
`;

const ExpectButton = styled(Button)`
  background-color: #e0a800;
  color: #000;

  &:hover {
    background-color: #cc9a04;
  }
`;

const CombinedButton = styled(Button)`
  background-color: ${(props) =>
    props.isSynopsisComplete ? "#28a745" : "#E23A3A"};

  &:hover {
    background-color: ${(props) =>
    props.isSynopsisComplete ? "#218838" : "#C53838"};
  }
`;

const LabelWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Synopsis() {
  const [plot, setPlot] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSynopsisComplete, setIsSynopsisComplete] = useState(false);
  const [successRate, setSuccessRate] = useState(null);
  const [selectedScenarioTitle, setSelectedScenarioTitle] = useState("");
  const [title, setTitle] = useState("");
  const [userScenarios, setUserScenarios] = useState([]);
  const [error, setError] = useState(null);
  const [gptRequest, setGptRequest] = useState("");
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchUserScenarios();
    // Cleanup function to close EventSource when component unmounts
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const eventSourceRef = React.useRef(null);

  const fetchUserScenarios = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/scenario/user-scenarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserScenarios(response.data);
    } catch (error) {
      handleApiError(error, "시나리오 목록을 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleScenarioChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedScenarioTitle(selectedTitle);
    if (selectedTitle) {
      fetchScenarioDetails(selectedTitle);
    } else {
      // 선택 취소 시 상태 초기화
      setTitle("");
      setPlot("");
      setIsSynopsisComplete(false);
      setSuccessRate(null);
    }
  };

  const fetchScenarioDetails = async (title) => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const url = `http://127.0.0.1:8000/api/v1/synopsis/by-title/${encodedTitle}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setTitle(data.title);
      setPlot(data.synopsis || "");
      setIsSynopsisComplete(!!data.synopsis);
      setError(null);

      if (data.synopsis) {
        // 시놉시스가 이미 존재하는 경우, 예측 결과 가져오기
        await fetchPrediction(data.id);
      }
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
    setPlot(""); // 기존 시놉시스 초기화
    setSuccessRate(null); // 기존 예측 결과 초기화
    setIsSynopsisComplete(false); // 시놉시스 완료 상태 초기화
    setError(null);

    try {
      const scenarioId = userScenarios.find(s => s.title === selectedScenarioTitle)?.id;
      if (!scenarioId) {
        setError("선택된 시나리오의 ID를 찾을 수 없습니다.");
        setIsGenerating(false);
        return;
      }

      // EventSource를 사용하여 서버로부터 시놉시스 스트리밍 수신
      const tokenParam = encodeURIComponent(token);
      const url = `http://127.0.0.1:8000/api/v1/synopsis/generate-synopsis-stream/${scenarioId}?token=${tokenParam}`;
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (e) => {
        setPlot(prev => prev + e.data);
      };

      eventSource.addEventListener('prediction', (e) => {
        const data = JSON.parse(e.data);
        setSuccessRate(data.first_predicted_rate);
        setIsSynopsisComplete(true);
        setIsGenerating(false);
        eventSource.close();
        eventSourceRef.current = null;
      });

      eventSource.addEventListener('error', (e) => {
        console.error("EventSource failed:", e);
        setError("시놉시스 생성 중 오류가 발생했습니다.");
        setIsGenerating(false);
        eventSource.close();
        eventSourceRef.current = null;
      });

    } catch (error) {
      handleApiError(error, "시놉시스 생성 중 오류가 발생했습니다.");
      setIsGenerating(false);
    }
  };

  const fetchPrediction = async (scenarioId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/synopsis/prediction/${scenarioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessRate(response.data.first_predicted_rate);
    } catch (error) {
      handleApiError(error, "예측 결과를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleCreateScenario = async () => {
    if (!selectedScenarioTitle) {
      setError("시나리오를 선택해주세요.");
      return;
    }
    if (!plot) {
      setError("시놉시스를 먼저 생성해주세요.");
      return;
    }

    try {
      const scenarioId = userScenarios.find(s => s.title === selectedScenarioTitle)?.id;
      if (!scenarioId) {
        setError("선택된 시나리오의 ID를 찾을 수 없습니다.");
        return;
      }

      await axios.put(
        `http://127.0.0.1:8000/api/v1/scenario/${scenarioId}/user-request`,
        { user_request: gptRequest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/create/script", {
        state: { scenarioId: scenarioId, autoStart: true },
        replace: true,
      });
    } catch (error) {
      handleApiError(error, "시나리오 생성 페이지로 이동 중 오류가 발생했습니다.");
    }
  };

  const handleApiError = (error, defaultMessage) => {
    let errorMessage = defaultMessage;
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "인증 토큰이 만료되었습니다. 다시 로그인해주세요.";
        logout();
        navigate("/login");
      } else if (error.response.status === 422) {
        errorMessage = `데이터 형식이 올바르지 않습니다. 오류 메시지: ${JSON.stringify(error.response.data)}`;
      } else if (error.response.data && error.response.data.detail) {
        errorMessage = error.response.data.detail;
      }
    }
    setError(errorMessage);
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
            onChange={(e) => setPlot(e.target.value)}
            readOnly={true}
          />
          {isSynopsisComplete && (
            <>
              {successRate && (
                <SuccessRateDisplay>예상 흥행률: {successRate}</SuccessRateDisplay>
              )}
              <Label>수정 요청사항</Label>
              <TextArea
                placeholder="GPT에게 수정을 요청할 사항을 적어주세요."
                value={gptRequest}
                onChange={(e) => setGptRequest(e.target.value)}
                height="150px"
              />
            </>
          )}
          <ButtonContainer>
            <CombinedButton
              onClick={isSynopsisComplete ? handleCreateScenario : generateSynopsis}
              disabled={isGenerating}
              isSynopsisComplete={isSynopsisComplete}
            >
              {isGenerating
                ? "생성 중..."
                : isSynopsisComplete
                  ? "시나리오 생성"
                  : successRate
                    ? `예상 흥행률: ${successRate}`
                    : "시놉시스 생성"}
            </CombinedButton>
          </ButtonContainer>
        </>
      )}
    </Section>
  );
}

export default Synopsis;
