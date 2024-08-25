import React, { useState } from "react";
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
  height: 120px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  font-size: 16px;
  color: #000;
  background-color: #859aa5;
  display: block;
  resize: vertical;
  line-height: 1.5;
  font-family: 'Arial', sans-serif;

  &:focus {
    outline: none;
    border-color: #75c96e;
    box-shadow: 0 0 5px rgba(117, 201, 110, 0.5);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
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

  const navigate = useNavigate();
  const location = useLocation();
  const movieData = location.state;

  const handleAutoFill = async () => {
    if (movieData) {
      try {
        const response = await fetch("http://localhost:8000/api/v1/synopsis/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keyword: movieData.title,
            genre: movieData.selectedGenres.join(", "),
            theme: movieData.country
          }),
        });

        if (!response.ok) {
          throw new Error('시놉시스 생성 실패');
        }

        const data = await response.json();
        setCharacters(data.main_characters.join(", "));
        setPlot(data.storyline);
        setKeywords(data.keyword);
      } catch (error) {
        console.error("Error:", error);
        alert('시놉시스 생성 중 오류가 발생했습니다.');
      }
    } else {
      alert("이전 페이지에서 데이터가 전달되지 않았습니다.");
    }
  };

  const handleCreateScenario = async () => {
    try {
      const scenarioData = {
        ...movieData,
        characters,
        plot,
        keywords
      };

      navigate("/create/script", { state: { scenarioData } });
    } catch (error) {
      console.error("시나리오 생성 중 오류 발생:", error);
      alert("시나리오 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Section>
      <Label>등장인물</Label>
      <TextArea
        placeholder="등장인물"
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
      />
      <Label>시놉시스 (공백 포함 200자 이내로 작성 혹은 gpt 자동생성)</Label>
      <TextArea
        placeholder="줄거리 (공백 포함 200자 이내로 작성)"
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
      />
      <Label>키워드 태그</Label>
      <TextArea
        placeholder="키워드 태그"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <ButtonContainer>
        <AutoFillButton onClick={handleAutoFill}>시놉시스 생성</AutoFillButton>
        <CreateScenarioButton onClick={handleCreateScenario}>
          시나리오 제작
        </CreateScenarioButton>
      </ButtonContainer>
    </Section>
  );
}

export default Synopsis;