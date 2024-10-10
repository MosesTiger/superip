import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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
    console.log("Synopsis 컴포넌트가 마운트되었습니다.");
    fetchUserScenarios();
    return () => {
      console.log("Synopsis 컴포넌트가 언마운트되었습니다.");
    };
  }, [token]);

  const fetchUserScenarios = async () => {
    console.log("fetchUserScenarios 함수 시작");
    try {
      console.log("사용자 시나리오 목록 API 호출 중...");
      const response = await axios.get(
        "http://43.200.111.65/api/v1/scenario/user-scenarios",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API 응답 받음:", response.data);
      setUserScenarios(response.data);
      setError(null);
    } catch (error) {
      console.error("사용자 시나리오 목록 가져오기 실패:", error);
      handleApiError(error, "시나리오 목록을 가져오는 중 오류가 발생했습니다.");
    }
    console.log("fetchUserScenarios 함수 종료");
  };

  const handleScenarioChange = (e) => {
    const selectedTitle = e.target.value;
    console.log("선택된 시나리오:", selectedTitle);
    setSelectedScenarioTitle(selectedTitle);
    if (selectedTitle) {
      fetchScenarioDetails(selectedTitle);
    }
  };

  const fetchScenarioDetails = async (title) => {
    console.log(`fetchScenarioDetails 함수 시작. 제목: ${title}`);
    try {
      console.log("시나리오 상세 정보 API 호출 중...");
      const encodedTitle = encodeURIComponent(title);
      const url = `http://43.200.111.65/api/v1/synopsis/by-title/${encodedTitle}`;
      console.log(`API URL: ${url}`);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API 응답 받음:", response.data);
      const data = response.data;
      setTitle(data.title);
      setPlot(data.synopsis || "");
      setIsSynopsisComplete(!!data.synopsis);
      setError(null);
    } catch (error) {
      console.error("시나리오 정보 가져오기 실패:", error);
      handleApiError(error, "시나리오 정보를 가져오는 중 오류가 발생했습니다.");
    }
    console.log("fetchScenarioDetails 함수 종료");
  };

  const generateSynopsis = async () => {
    console.log("generateSynopsis 함수 시작");
    if (!selectedScenarioTitle) {
      console.log("시나리오가 선택되지 않았습니다.");
      setError("시나리오를 선택해주세요.");
      return;
    }
    setIsGenerating(true);
    try {
      console.log("시놉시스 생성 API 호출 중...");
      const response = await axios.post(
        "http://43.200.111.65/api/synopsis/generate-synopsis",
        { scenario_id: selectedScenarioTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API 응답 받음:", response.data);

      // 시놉시스 생성 상태 확인
      await checkSynopsisStatus(selectedScenarioTitle);
    } catch (error) {
      console.error("시놉시스 생성 중 오류:", error);
      handleApiError(error, "시놉시스 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
      console.log("generateSynopsis 함수 종료");
    }
  };

  const checkSynopsisStatus = async (scenarioId) => {
    console.log(`checkSynopsisStatus 함수 시작. 시나리오 ID: ${scenarioId}`);
    try {
      while (true) {
        const response = await axios.get(
          `http://43.200.111.65/api/synopsis/synopsis-status/${scenarioId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("상태 확인 응답:", response.data);
        if (response.data.status === "complete") {
          setPlot(response.data.synopsis);
          setIsSynopsisComplete(true);
          await fetchPrediction(scenarioId);
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5초 대기
      }
    } catch (error) {
      console.error("시놉시스 상태 확인 중 오류:", error);
      handleApiError(error, "시놉시스 상태 확인 중 오류가 발생했습니다.");
    }
    console.log("checkSynopsisStatus 함수 종료");
  };

  const fetchPrediction = async (scenarioId) => {
    console.log(`fetchPrediction 함수 시작. 시나리오 ID: ${scenarioId}`);
    try {
      const response = await axios.get(
        `http://43.200.111.65/api/synopsis/prediction/${scenarioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("예측 결과:", response.data);
      setSuccessRate(response.data["1차 흥행도"]);
    } catch (error) {
      console.error("예측 결과 가져오기 실패:", error);
      handleApiError(error, "예측 결과를 가져오는 중 오류가 발생했습니다.");
    }
    console.log("fetchPrediction 함수 종료");
  };

  const handlePredictionClick = async () => {
    console.log("handlePredictionClick 함수 시작");
    if (!successRate) {
      console.log("흥행도가 아직 예측되지 않았습니다.");
      setError("먼저 시놉시스를 생성해주세요.");
    } else {
      console.log("현재 예측된 흥행도:", successRate);
    }
    console.log("handlePredictionClick 함수 종료");
  };

  const handleCreateScenario = async () => {
    console.log("handleCreateScenario 함수 시작");
    if (!selectedScenarioTitle) {
      console.log("시나리오가 선택되지 않았습니다.");
      setError("시나리오를 선택해주세요.");
      return;
    }
    if (!plot) {
      console.log("시놉시스가 생성되지 않았습니다.");
      setError("시놉시스를 먼저 생성해주세요.");
      return;
    }

    try {
      console.log("수정 요청사항 업데이트 중...");
      console.log("요청 데이터:", { user_request: gptRequest });
      await axios.put(
        `http://43.200.111.65/api/v1/scenarios/by-title/${selectedScenarioTitle}/user-request`,
        { user_request: gptRequest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("수정 요청사항 업데이트 완료");

      console.log("스크립트 생성 페이지로 이동 중...");
      navigate("/create/script", {
        state: { scenarioTitle: selectedScenarioTitle, autoStart: true },
        replace: true,
      });
    } catch (error) {
      console.error("시나리오 생성 중 오류:", error);
      handleApiError(
        error,
        "시나리오 생성 페이지로 이동 중 오류가 발생했습니다."
      );
    }
    console.log("handleCreateScenario 함수 종료");
  };

  const handleApiError = (error, defaultMessage) => {
    console.log("에러 상세 정보:", error.response || error.message);
    let errorMessage = defaultMessage;
    if (error.response) {
      console.log("서버 응답:", error.response);
      if (error.response.status === 401) {
        errorMessage = "인증 토큰이 만료되었습니다. 다시 로그인해주세요.";
        logout();
        navigate("/login");
      } else if (error.response.status === 422) {
        errorMessage = `데이터 형식이 올바르지 않습니다. 오류 메시지: ${JSON.stringify(
          error.response.data
        )}`;
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
            height="300px"
            readOnly={isGenerating}
          />
          {isSynopsisComplete && (
            <>
              <Label>수정 요청사항</Label>
              <TextArea
                placeholder="GPT에게 수정을 요청할 사항을 적어주세요."
                value={gptRequest}
                onChange={(e) => setGptRequest(e.target.value)}
                height="300px"
              />
            </>
          )}
          {successRate && (
            <SuccessRateDisplay>예상 흥행률: {successRate}%</SuccessRateDisplay>
          )}
          <ButtonContainer>
            <ExpectButton
              onClick={handlePredictionClick}
              disabled={!isSynopsisComplete}
            >
              흥행도 예측
            </ExpectButton>
            <CombinedButton
              onClick={
                isSynopsisComplete ? handleCreateScenario : generateSynopsis
              }
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
