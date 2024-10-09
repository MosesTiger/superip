import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../context/TestAuthProvider';  // 경로는 실제 위치에 맞게 조정하세요
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
  height: ${(props) => props.height || "120px"};
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
  display: block;
  width: 80%;
  font-size: 18px;
  color: #000;
  text-align: left;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const ExpectButton = styled(Button)`
  background-color: #75c96e;
  color: #000;
`;

const CombinedButton = styled(Button)`
  background-color: #e23a3a;
  color: #000;
`;

function Synopsis() {
  const [characters, setCharacters] = useState("");
  const [plot, setPlot] = useState("");
  const [keyword, setKeyword] = useState("");
  const [gptRequest, setGptRequest] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSynopsisComplete, setIsSynopsisComplete] = useState(false);
  const [successRate, setSuccessRate] = useState(null);
  const [scenarioId, setScenarioId] = useState(null);
  const [title, setTitle] = useState("시나리오 제목");

  const navigate = useNavigate();
  const location = useLocation();
  const movieData = location.state;
  const { token } = useAuth();

  useEffect(() => {
    if (movieData && movieData.scenarioId) {
      setScenarioId(movieData.scenarioId);
      fetchScenarioTitle(movieData.scenarioId);
    }
  }, [movieData]);

  const fetchScenarioTitle = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/scenarios/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data && response.data.title) {
        setTitle(response.data.title);
      }
    } catch (error) {
      console.error("시나리오 제목 가져오기 실패:", error);
    }
  };

  const updateUserRequest = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/v1/scenarios/${scenarioId}/user-request`,
        { user_request: gptRequest },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log("사용자 요청사항이 업데이트되었습니다.");
    } catch (error) {
      console.error("사용자 요청사항 업데이트 중 오류:", error);
      alert("사용자 요청사항 업데이트 중 오류가 발생했습니다.");
    }
  };

  const generateSynopsis = async () => {
    setIsGenerating(true);
    try {
      await updateUserRequest();
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/synopsis/generate',
        {
          scenario_id: scenarioId,
          keyword: keyword,
          genre: movieData.selectedGenres.join(", "),
          theme: movieData.country,
          characters: characters.split(",").map(char => char.trim())
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setPlot(response.data.storyline);
      setIsSynopsisComplete(true);

      // 1차 흥행률 예측 API 호출
      const predictionResponse = await axios.post(
        'http://127.0.0.1:8000/api/v1/success-rate/first_predict',
        {
          scenario_id: scenarioId,
          keyword: keyword,
          genre: movieData.selectedGenres.join(", "),
          runtime: movieData.duration,
          gender: movieData.mainCharacterGender,
          rating: movieData.rating,
          theme: movieData.country
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setSuccessRate(predictionResponse.data["1차 흥행도"]);
    } catch (error) {
      console.error("시놉시스 생성 중 오류:", error);
      alert("시놉시스 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePredictionClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/success-rate/predict', {
        scenario_id: scenarioId,
        title: movieData.title,
        genres: movieData.selectedGenres,
        duration: movieData.duration,
        rating: movieData.rating,
        country: movieData.country,
        isSeries: movieData.isSeries,
        mainCharacterGender: movieData.mainCharacterGender,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccessRate(response.data.success_rate);
      alert(`예상 흥행률: ${response.data.success_rate}%`);
    } catch (error) {
      console.error("Error:", error);
      alert("흥행률 예측 중 오류가 발생했습니다.");
    }
  };

  const handleCreateScenario = async () => {
    if (!plot) {
      alert("시놉시스를 먼저 생성해주세요.");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/scenarios/${scenarioId}`,
        {
          synopsis: plot,
          characters: characters.split(",").map(char => char.trim()),
          keyword: keyword
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      navigate("/create/script", {
        state: { scenarioId, autoStart: true },
        replace: true,
      });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <Section>
      <TitleDisplay>{title}</TitleDisplay>
      <Label>등장인물 (콤마로 구분)</Label>
      <TextArea
        placeholder="예: 홍길동, 김철수, 이영희"
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
      />
      <Label>키워드 태그 (콤마로 구분)</Label>
      <TextArea
        placeholder="예: 모험, 우정, 성장"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Label>시놉시스</Label>
      <TextArea
        placeholder="시놉시스를 생성하려면 '시놉시스 생성' 버튼을 클릭하세요."
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
        height="300px"
        readOnly={isGenerating}
      />
      <Label>수정 요청사항</Label>
      <TextArea
        placeholder="GPT에게 수정을 요청할 사항을 적어주세요."
        value={gptRequest}
        onChange={(e) => setGptRequest(e.target.value)}
        height="300px"
      />
      {successRate && (
        <SuccessRateDisplay>예상 흥행률: {successRate}%</SuccessRateDisplay>
      )}
      <ButtonContainer>
        <ExpectButton onclick={handlePredictionClick}>
          흥행도 예측
        </ExpectButton>
        <CombinedButton onClick={isSynopsisComplete ? handleCreateScenario : generateSynopsis} disabled={isGenerating}>
          {isGenerating
            ? "생성 중..."
            : isSynopsisComplete
              ? "시나리오 생성"
              : "시놉시스 생성"}
        </CombinedButton>
      </ButtonContainer>
    </Section>
  );
}

export default Synopsis;