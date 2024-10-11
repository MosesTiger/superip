// Script.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 95%;
  margin: 0 auto;
  font-size: 16px;
  color: #000;
  align-items: center;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ChapterNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 20%;
`;

const NavRightButton = styled(GoChevronRight)`
  padding: 10px 20px;
  font-size: 20px;
  color: black;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const NavLeftButton = styled(GoChevronLeft)`
  padding: 10px 20px;
  font-size: 20px;
  color: black;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ChapterInfo = styled.span`
  font-size: 16px;
  font-weight: bold;
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
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #218838;
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const PredictButton = styled(Button)`
  background-color: #e23a3a;
  color: black;
  font-weight: bold;

  &:hover {
    background-color: #cb3737;
  }
`;

function Script() {
  const { token } = useAuth();
  const [userScenarios, setUserScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState("");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterContent, setChapterContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [chapterCount, setChapterCount] = useState(0);

  useEffect(() => {
    fetchUserScenarios();
  }, []);

  const fetchUserScenarios = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/scenario/user-scenarios", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user scenarios");
      }
      const data = await response.json();
      setUserScenarios(data);
    } catch (error) {
      console.error("시나리오를 가져오는 중 오류 발생:", error);
      setError("시나리오를 가져오는 데 실패했습니다.");
    }
  };

  const handleScenarioSelect = async (e) => {
    const scenarioId = e.target.value;
    setSelectedScenarioId(scenarioId);
    setCurrentChapter(1);
    setChapterContent("");
    setFeedback("");
    setError(null);
    if (scenarioId) {
      const scenario = userScenarios.find((s) => s.id === parseInt(scenarioId));
      setChapterCount(scenario.chapter_count);
      await fetchChapterContent(scenarioId, 1);
      await fetchFeedback(scenarioId, 1);
    }
  };

  const handlePreviousChapter = async () => {
    if (currentChapter > 1) {
      const newChapter = currentChapter - 1;
      setCurrentChapter(newChapter);
      await fetchChapterContent(selectedScenarioId, newChapter);
      await fetchFeedback(selectedScenarioId, newChapter);
    }
  };

  const handleNextChapter = async () => {
    if (currentChapter < chapterCount) {
      const newChapter = currentChapter + 1;
      setCurrentChapter(newChapter);
      await fetchChapterContent(selectedScenarioId, newChapter);
      await fetchFeedback(selectedScenarioId, newChapter);
    }
  };

  const fetchChapterContent = async (scenarioId, chapterNumber) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/scenario/${scenarioId}/chapters/${chapterNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chapter content");
      }
      const data = await response.json();
      setChapterContent(data.content || "");
    } catch (error) {
      console.error("챕터 내용을 가져오는 중 오류 발생:", error);
      setError("챕터 내용을 가져오는 데 실패했습니다.");
      setChapterContent("");
    }
  };

  const fetchFeedback = async (scenarioId, chapterNumber) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/scenario/${scenarioId}/chapters/${chapterNumber}/feedback`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
      const data = await response.json();
      setFeedback(data.content || "");
    } catch (error) {
      console.error("피드백을 가져오는 중 오류 발생:", error);
      setError("피드백을 가져오는 데 실패했습니다.");
      setFeedback("");
    }
  };

  const generateChapter = async () => {
    setIsGenerating(true);
    setError(null);
    setChapterContent(""); // 새로운 생성 시작 시 기존 내용 초기화
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/scenario/${selectedScenarioId}/chapters/${currentChapter}/generate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') {
                done = true;
                break;
              } else {
                const data = JSON.parse(dataStr);
                if (data.type === 'content') {
                  setChapterContent(prev => prev + data.content);
                }
              }
            }
          }
        }
      }

      // 챕터 생성 후 업데이트된 내용 가져오기
      await fetchChapterContent(selectedScenarioId, currentChapter);
    } catch (error) {
      console.error("챕터 생성 중 오류 발생:", error);
      setError("챕터 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveFeedback = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/scenario/${selectedScenarioId}/chapters/${currentChapter}/feedback`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: feedback }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save feedback");
      }
      alert("피드백이 저장되었습니다.");
    } catch (error) {
      console.error("피드백 저장 중 오류:", error);
      setError("피드백 저장에 실패했습니다.");
    }
  };

  const handlePrediction = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/scenario/prediction/${selectedScenarioId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to predict success rate");
      }
      alert("흥행도 예측이 완료되었습니다.");
    } catch (error) {
      console.error("흥행도 예측 중 오류 발생:", error);
      setError("흥행도 예측에 실패했습니다.");
    }
  };

  return (
    <Section>
      <Select onChange={handleScenarioSelect} value={selectedScenarioId || ""}>
        <option value="">시나리오를 선택하세요</option>
        {userScenarios.map((scenario) => (
          <option key={scenario.id} value={scenario.id}>
            {scenario.title}
          </option>
        ))}
      </Select>

      {selectedScenarioId && (
        <>
          <ChapterNavigation>
            <NavLeftButton
              onClick={handlePreviousChapter}
              disabled={currentChapter === 1 || isGenerating}
            />
            <ChapterInfo>
              챕터 {currentChapter} / {chapterCount}
            </ChapterInfo>
            <NavRightButton
              onClick={handleNextChapter}
              disabled={currentChapter === chapterCount || isGenerating}
            />
          </ChapterNavigation>

          <TextArea
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            placeholder="챕터 내용"
            readOnly={true}
          />

          <ButtonWrap>
            <Button onClick={generateChapter} disabled={isGenerating || chapterContent}>
              {isGenerating ? "생성 중..." : chapterContent ? "재생성" : "챕터 생성"}
            </Button>
          </ButtonWrap>
          <TextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="피드백을 입력하세요"
          />
          <ButtonWrap>
            <Button onClick={saveFeedback} disabled={isGenerating}>
              피드백 저장
            </Button>
          </ButtonWrap>

          {currentChapter === chapterCount && (
            <ButtonWrap>
              <PredictButton onClick={handlePrediction} disabled={isGenerating}>
                흥행도 예측
              </PredictButton>
            </ButtonWrap>
          )}
        </>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Section>
  );
}

export default Script;
