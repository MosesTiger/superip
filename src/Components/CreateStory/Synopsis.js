import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

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
  height: ${(props) => props.height || "300px"};
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
  background-color: ${(props) => props.bgColor || "#007bff"};
  color: ${(props) => props.color || "white"};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: ${(props) => props.hoverBgColor || "#0056b3"};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessRateDisplay = styled.div`
  font-size: 18px;
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

const RefreshButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const CombinedButton = styled(Button)`
  background-color: ${(props) => (props.isSynopsisComplete ? '#28a745' : '#007bff')};

  &:hover {
    background-color: ${(props) => (props.isSynopsisComplete ? '#218838' : '#0056b3')};
  }
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
  }, [token]);

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
    }
  };

  const fetchScenarioDetails = async (title) => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const url = `http://127.0.0.1:8000/api/v1/synopsis/by-title/${encodedTitle}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
    try {
      const scenarioId = userScenarios.find(s => s.title === selectedScenarioTitle)?.id;
      if (!scenarioId) {
        setError("선택된 시나리오의 ID를 찾을 수 없습니다.");
        return;
      }

      await axios.post(
        `http://127.0.0.1:8000/api/v1/synopsis/generate-synopsis`,
        { scenario_id: scenarioId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // 시놉시스 생성 상태 확인
      await checkSynopsisStatus(scenarioId);
    } catch (error) {
      handleApiError(error, "시놉시스 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const checkSynopsisStatus = async (scenarioId) => {
    try {
      while (true) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/synopsis/synopsis-status/${scenarioId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        if (response.data.status === 'complete') {
          setPlot(response.data.synopsis);
          setIsSynopsisComplete(true);
          await fetchPrediction(scenarioId);
          break;
        } else if (response.data.status === 'error') {
          setError("시놉시스 생성 중 오류가 발생했습니다.");
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5초 대기
      }
    } catch (error) {
      handleApiError(error, "시놉시스 상태 확인 중 오류가 발생했습니다.");
    }
  };

  const fetchPrediction = async (scenarioId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/synopsis/prediction/${scenarioId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
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
            'Authorization': `Bearer ${token}`
          }
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
        navigate('/login');
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
      <Label>시나리오 선택</Label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select value={selectedScenarioTitle} onChange={handleScenarioChange}>
          <option value="">시나리오를 선택하세요</option>
          {userScenarios.map((scenario, index) => (
            <option key={index} value={scenario.title}>
              {scenario.title}
            </option>
          ))}
        </Select>
        <RefreshButton onClick={fetchUserScenarios}>새로고침</RefreshButton>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {selectedScenarioTitle && (
        <>
          <TitleDisplay>{title}</TitleDisplay>
          <Label>시놉시스</Label>
          <TextArea
            placeholder="시놉시스를 생성하려면 '시놉시스 생성' 버튼을 클릭하세요."
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            height="300px"
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
                : "시놉시스 생성"}
            </CombinedButton>
          </ButtonContainer>
        </>
      )}
    </Section>
  );
}

export default Synopsis;