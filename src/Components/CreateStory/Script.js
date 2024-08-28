import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';

const Input = styled.textarea`
  width: 100%;
  border: 0;
  background-color: #EDF6F6;
  height: 70vh;
  border-radius: 8px;
  padding: 8px 16px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  min-width: 250px;
  z-index: 3;
  margin-bottom: 20px;
  resize: none;
  overflow-Y: scroll;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #EDF6F6;
  margin-top: 15px;
  border-radius: 8px;
  position: relative;
`;

const PageInfo = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 0 10px;
`;

const SaveButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 100px;
  padding: 10px 20px;
  background-color: #859aa5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;

  &:hover {
    background-color: #697A82;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #75c96e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #5faa59;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

function Script() {
  const [scenarioContent, setScenarioContent] = useState("");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [scenarioId, setScenarioId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scenarioData } = location.state || {};

  useEffect(() => {
    if (scenarioData) {
      generateScenario(scenarioData);
    }
  }, [scenarioData]);

  const generateScenario = async (data) => {
    setIsGenerating(true);
    const eventSource = new EventSource(`http://localhost:8000/api/v1/scenario/generate?${new URLSearchParams({
      title: data.title,
      genre: data.genre,
      theme: data.theme,
      characters: data.characters,
      synopsis: data.synopsis,
      keywords: data.keywords
    })}`);

    let fullContent = "";

    eventSource.onmessage = (event) => {
      try {
        const jsonData = JSON.parse(event.data);
        if (jsonData.id) {
          setScenarioId(jsonData.id);
          eventSource.close();
          setIsGenerating(false);
        } else {
          fullContent += event.data;
          setScenarioContent(fullContent);
        }
      } catch (error) {
        fullContent += event.data;
        setScenarioContent(fullContent);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error:", error);
      eventSource.close();
      setIsGenerating(false);
      alert('시나리오 생성 중 오류가 발생했습니다.');
    };
  };

  const handleContinueChapter = async () => {
    setIsGenerating(true);
    const eventSource = new EventSource(`http://localhost:8000/api/v1/scenario/${scenarioId}/continue?user_input=${encodeURIComponent(scenarioContent)}`);

    let newContent = "";

    eventSource.onmessage = (event) => {
      newContent += event.data;
      setScenarioContent(prevContent => prevContent + event.data);
    };

    eventSource.onerror = (error) => {
      console.error("Error:", error);
      eventSource.close();
      setIsGenerating(false);
      alert('챕터 계속 작성 중 오류가 발생했습니다.');
    };

    eventSource.onclose = () => {
      setCurrentChapter(prevChapter => prevChapter + 1);
      setIsGenerating(false);
    };
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/scenario/${scenarioId}/revise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: "사용자 편집", user_input: scenarioContent }),
      });

      if (!response.ok) {
        throw new Error('시나리오 저장 실패');
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      alert('시나리오가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error("Error:", error);
      alert(`시나리오 저장 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <>
      <SaveButton onClick={handleSave} disabled={isGenerating || !scenarioId}>저장</SaveButton>
      <PaginationContainer>
        <PageInfo>Chapter {currentChapter}</PageInfo>
      </PaginationContainer>
      <Input 
        value={scenarioContent}
        onChange={(e) => setScenarioContent(e.target.value)}
        readOnly={isGenerating}
      />
      <ActionButton onClick={handleContinueChapter} disabled={isGenerating || !scenarioId}>
        {isGenerating ? "생성 중..." : "다음 챕터 작성"}
      </ActionButton>
    </>
  );
}

export default Script;