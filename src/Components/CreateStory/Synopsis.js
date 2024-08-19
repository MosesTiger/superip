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
  height: 80px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 20px 10px 10px;
  font-size: 16px;
  color: #000;
  background-color: #859aa5;
  display: block;
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
  const scenarioData = {
    characters,
    plot,
    keywords,
  };

  const handleAutoFill = () => {
    // GPT 자동 입력을 위한 데이터가 있다고 가정
    if (movieData) {
      // 아래 부분은 GPT와의 연동이 구현된 경우 사용할 로직입니다.
      /*
      const gptResponse = await fetchGPTSuggestion(movieData); 
      setCharacters(gptResponse.characters);
      setPlot(gptResponse.plot);
      setKeywords(gptResponse.keywords);
      */

      // 임시 데이터로 필드 채우기 (주석 처리된 부분을 사용하려면 백엔드/GPT가 구현되어야 합니다)
      setCharacters(`Example Character based on: ${movieData.title}`);
      setPlot(
        `Example Plot for a movie with genres: ${movieData.selectedGenres.join(
          ", "
        )}`
      );
      setKeywords(
        `#ExampleKeyword1 #ExampleKeyword2 based on: ${movieData.country}`
      );
    } else {
      alert("이전 페이지에서 데이터가 전달되지 않았습니다.");
    }
  };

  const handleCreateScenario = async () => {
    try {
      // 백엔드로 시나리오 데이터를 전송하는 부분
      /*
      const response = await fetch('http://localhost:8000/api/create-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scenarioData),
      });

      if (!response.ok) {
        throw new Error('시나리오 생성 실패');
      }

      const scriptData = await response.json();
      */

      // 시나리오 페이지로 이동하며 생성된 시나리오 데이터를 전달
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
      <Label>줄거리 (공백 포함 200자 이내로 작성)</Label>
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
        <AutoFillButton onClick={handleAutoFill}>GPT 자동입력</AutoFillButton>
        <CreateScenarioButton onClick={handleCreateScenario}>
          시나리오 제작
        </CreateScenarioButton>
      </ButtonContainer>
    </Section>
  );
}

export default Synopsis;
