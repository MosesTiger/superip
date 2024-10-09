import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AutoProvider";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  position: relative;
`;

const ScenarioContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 14px;
  color: #666;
`;

const ChapterNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const ChapterTitle = styled.h2`
  font-size: 20px;
  color: #333;
`;

const ScenarioText = styled.pre`
  flex-grow: 1;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 16px;
  line-height: 1.6;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #218838;
  }
`;

const SaveButton = styled(Button)`
  background-color: #17a2b8;

  &:hover:not(:disabled) {
    background-color: #138496;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function Script() {
  const [scenarioContent, setScenarioContent] = useState("");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [scenarioId, setScenarioId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [scenarioData, setScenarioData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (location.state?.scenarioId) {
      setScenarioId(location.state.scenarioId);
      fetchScenarioData(location.state.scenarioId);
    }
  }, [isAuthenticated, location.state, navigate]);

  const fetchScenarioData = async (id) => {
    try {
      const response = await axios.get(`http://43.200.200.147/api/v1/scenario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScenarioData(response.data);
      fetchChapters(id);
    } catch (error) {
      console.error("Error fetching scenario data:", error);
    }
  };

  const fetchChapters = async (id) => {
    try {
      const response = await axios.get(`http://43.200.200.147/api/v1/scenario/${id}/chapters`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChapters(response.data);
      if (response.data.length > 0) {
        setScenarioContent(response.data[0].content);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const totalChapters = scenarioData ? scenarioData.chapter_count : 0;

  const generateChapter = async () => {
    setIsGenerating(true);
    setScenarioContent("");

    try {
      const response = await axios.post(
        `http://43.200.200.147/api/v1/scenario/${scenarioId}/chapters`,
        {
          number: currentChapter,
          title: `Chapter ${currentChapter}`,
          content: ""
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(5));
            if (data.type === "content") {
              setScenarioContent(prev => prev + data.content);
            }
          }
        }
      }

      setCurrentChapter(prev => prev + 1);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
      alert("챕터 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://43.200.200.147/api/v1/scenario/${scenarioId}/chapters/${currentChapter}`,
        {
          content: scenarioContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("챕터가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("Error:", error);
      alert("챕터 저장 중 오류가 발생했습니다.");
    }
  };

  const handleFeedback = async () => {
    try {
      await axios.post(
        `http://43.200.200.147/api/v1/scenario/${scenarioId}/chapters/${currentChapter}/feedback`,
        {
          content: userInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("피드백이 성공적으로 저장되었습니다.");
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
      alert("피드백 저장 중 오류가 발생했습니다.");
    }
  };

  const handlePredictionClick = () => {
    navigate("/create/show", { state: { scenarioId } });
  };

  const changeChapter = (newChapter) => {
    if (newChapter > 0 && newChapter <= totalChapters) {
      setCurrentChapter(newChapter);
      if (chapters[newChapter - 1]) {
        setScenarioContent(chapters[newChapter - 1].content);
      } else {
        setScenarioContent("");
      }
    }
  };

  if (!scenarioData) {
    return <div>Loading scenario data...</div>;
  }

  return (
    <PageContainer>
      <ScenarioContainer>
        <Header>
          <Title>{scenarioData.title || 'Untitled Scenario'}</Title>
          <Info>
            {scenarioData.genre} | {scenarioData.runtime}분 | {scenarioData.rating} | {scenarioData.gender}
          </Info>
        </Header>
        <ChapterNavigation>
          <NavButton
            onClick={() => changeChapter(currentChapter - 1)}
            disabled={currentChapter === 1}
          >
            <ChevronLeft />
          </NavButton>
          <ChapterTitle>Chapter {currentChapter} / {totalChapters}</ChapterTitle>
          <NavButton
            onClick={() => changeChapter(currentChapter + 1)}
            disabled={currentChapter === totalChapters}
          >
            <ChevronRight />
          </NavButton>
        </ChapterNavigation>
        <ScenarioText>{scenarioContent || "이 챕터의 내용이 아직 생성되지 않았습니다."}</ScenarioText>
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="다음 챕터에 대한 의견이나 조언을 입력하세요"
        />
        <ButtonContainer>
          {currentChapter <= totalChapters ? (
            <>
              <Button onClick={generateChapter} disabled={isGenerating}>
                {isGenerating ? "생성 중..." : "챕터 생성/수정"}
              </Button>
              <Button onClick={handleFeedback} disabled={isGenerating || !userInput}>
                피드백 제출
              </Button>
            </>
          ) : (
            <Button onClick={handlePredictionClick}>최종 흥행도 예측</Button>
          )}
          <SaveButton onClick={handleSave} disabled={isGenerating || !scenarioContent}>
            저장
          </SaveButton>
        </ButtonContainer>
      </ScenarioContainer>
      {isGenerating && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
    </PageContainer>
  );
}

export default Script;