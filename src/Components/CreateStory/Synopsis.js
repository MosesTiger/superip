import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 100%;
  margin: 0;
  font-size: 16px;
  color: #000;
  font-family: "Poppins", sans-serif;
  position: relative;
  padding-right: 35px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: ${props => props.height || "120px"};
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  font-size: 16px;
  color: #000;
  background-color: #859aa5;
  display: block;
  resize: vertical;
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

const AutoFillButton = styled(Button)`
  background-color: #75c96e;
  color: #000;
`;

const CreateScenarioButton = styled(Button)`
  background-color: #e23a3a;
  color: #000;
`;

function Synopsis() {
  const [characters, setCharacters] = useState("");
  const [plot, setPlot] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const movieData = location.state;

  const handleAutoFill = async () => {
    if (movieData && characters && keywords) {
      setIsGenerating(true);
      setPlot(""); // Reset plot before generating new one

      const eventSource = new EventSource(`http://localhost:8000/api/v1/synopsis/generate?${new URLSearchParams({
        keyword: movieData.title,
        genre: movieData.selectedGenres.join(", "),
        theme: movieData.country,
        characters: characters,
        keywords: keywords
      })}`);
      
      eventSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          eventSource.close();
          setIsGenerating(true);
        } else {
          try {
            const data = JSON.parse(event.data);
            if (data.storyline) {
              setPlot(data.storyline);
            }
          } catch (error) {
            // If it's not a JSON, it's a part of the storyline
            setPlot(prevPlot => prevPlot + event.data);
          }
        }
      };
      
      eventSource.onerror = (error) => {
        console.error("Error:", error);
        eventSource.close();
        setIsGenerating(false);
        alert('시놉시스 생성 중 오류가 발생했습니다.');
      };
    } else {
      alert("영화 정보, 등장인물, 키워드를 모두 입력해주세요.");
    }
  };

  const handleCreateScenario = async () => {
    try {
      const scenarioData = {
        keyword: movieData.title,
        genre: movieData.selectedGenres.join(", "),
        theme: movieData.counrtry,
        characters: characters,
        keywords: keywords, 
        synopsis: plot
      };
      navigate("/create/script", { state: { scenarioData } });
    } catch (error) {
      console.error("시나리오 생성 중 오류 발생:", error);
      alert("시나리오 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Section>
      <Label>등장인물 (콤마로 구분)</Label>
      <TextArea
        placeholder="예: 홍길동, 김철수, 이영희"
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
      />
      <Label>키워드 태그 (콤마로 구분)</Label>
      <TextArea
        placeholder="예: 모험, 우정, 성장"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <Label>시놉시스</Label>
      <TextArea
        placeholder="시놉시스를 생성하려면 '시놉시스 생성' 버튼을 클릭하세요."
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
        height="300px"
        readOnly={isGenerating}
      />
      <ButtonContainer>
        <AutoFillButton onClick={handleAutoFill} disabled={isGenerating}>
          {isGenerating ? "생성 중..." : "시놉시스 생성"}
        </AutoFillButton>
        <CreateScenarioButton onClick={handleCreateScenario} disabled={isGenerating || !plot}>
          시나리오 제작
        </CreateScenarioButton>
      </ButtonContainer>
    </Section>
  );
}

export default Synopsis;