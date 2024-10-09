import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
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

function Synopsis() {
  const [synopsis, setSynopsis] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [successRate, setSuccessRate] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const location = useLocation();
  const scenarioId = location.state?.scenarioId;

  useEffect(() => {
    if (!scenarioId) {
      setError("시나리오 ID가 없습니다. 이전 단계로 돌아가 주세요.");
    }
  }, [scenarioId]);

  const generateSynopsis = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/synopsis/generate-synopsis`,
        { scenario_id: scenarioId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setSynopsis(response.data.synopsis);
    } catch (error) {
      console.error("시놉시스 생성 중 오류:", error);
      setError("시놉시스 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const predictSuccessRate = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/synopsis/prediction/${scenarioId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setSuccessRate(response.data.success_rate);
    } catch (error) {
      console.error("흥행률 예측 중 오류:", error);
      setError("흥행률 예측 중 오류가 발생했습니다.");
    }
  };

  const handleNext = () => {
    navigate("/create/script", { state: { scenarioId, synopsis } });
  };

  return (
    <Section>
      <TitleDisplay>시놉시스 생성</TitleDisplay>
      <TextArea
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
        placeholder="시놉시스를 생성하려면 '시놉시스 생성' 버튼을 클릭하세요."
        readOnly={isGenerating}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successRate && (
        <SuccessRateDisplay>예상 흥행률: {successRate}%</SuccessRateDisplay>
      )}
      <ButtonContainer>
        <Button onClick={generateSynopsis} disabled={isGenerating}>
          {isGenerating ? "생성 중..." : "시놉시스 생성"}
        </Button>
        <Button onClick={predictSuccessRate} disabled={!synopsis}>
          흥행률 예측
        </Button>
        <Button onClick={handleNext} disabled={!synopsis}>
          다음 단계
        </Button>
      </ButtonContainer>
    </Section>
  );
}

export default Synopsis;