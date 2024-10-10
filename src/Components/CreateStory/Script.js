import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
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
  transition: background-color 0.3s;
  margin-bottom: 15px;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-weight: bold;
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
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterContent, setChapterContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserScenarios();
  }, [token]);

  useEffect(() => {
    if (selectedScenarioId) {
      fetchChapterContent(currentChapter);
    }
  }, [selectedScenarioId, currentChapter]);

  const fetchUserScenarios = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/scenario/user-scenarios', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUserScenarios(response.data);
    } catch (error) {
      console.error("시나리오 목록을 가져오는 중 오류 발생:", error);
      setError("시나리오 목록을 가져오는데 실패했습니다.");
    }
  };

  const handleScenarioSelect = (event) => {
    setSelectedScenarioId(event.target.value);
    setCurrentChapter(1);
    setChapterContent("");
    setFeedback("");
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  const handleNextChapter = () => {
    const selectedScenario = userScenarios.find(s => s.id === parseInt(selectedScenarioId));
    if (currentChapter < selectedScenario.chapter_count) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const fetchChapterContent = async (chapterNumber) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/scenario/${selectedScenarioId}/chapters/${chapterNumber}/content`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setChapterContent(response.data.content);
      fetchFeedback(chapterNumber);
    } catch (error) {
      console.error("챕터 내용을 가져오는 중 오류 발생:", error);
      setError("챕터 내용을 가져오는데 실패했습니다.");
    }
  };

  const fetchFeedback = async (chapterNumber) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/scenario/${selectedScenarioId}/feedbacks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          chapter_id: chapterNumber
        }
      });
      if (response.data.length > 0) {
        setFeedback(response.data[0].content);
      } else {
        setFeedback("");
      }
    } catch (error) {
      console.error("피드백을 가져오는 중 오류 발생:", error);
      setError("피드백을 가져오는데 실패했습니다.");
    }
  };

  const generateChapter = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/scenario/${selectedScenarioId}/chapters/${currentChapter}/generate`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          responseType: 'stream'
        }
      );
      
      const reader = response.data.getReader();
      let result = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += new TextDecoder().decode(value);
        const lines = result.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'content') {
              setChapterContent(prev => prev + data.content);
            } else if (data === '[DONE]') {
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error("챕터 생성 중 오류 발생:", error);
      setError("챕터 생성에 실패했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveFeedback = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/scenario/${selectedScenarioId}/chapters/${currentChapter}/feedback`,
        { content: feedback },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert("피드백이 저장되었습니다.");
    } catch (error) {
      console.error("피드백 저장 중 오류:", error);
      setError("피드백 저장에 실패했습니다.");
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
              disabled={currentChapter === 1}
            />
            <ChapterInfo>
              챕터 {currentChapter} /{" "}
              {
                userScenarios.find((s) => s.id === parseInt(selectedScenarioId))
                  ?.chapter_count
              }
            </ChapterInfo>
            <NavRightButton
              onClick={handleNextChapter}
              disabled={
                currentChapter ===
                userScenarios.find((s) => s.id === parseInt(selectedScenarioId))
                  ?.chapter_count
              }
            />
          </ChapterNavigation>

          <TextArea
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            placeholder="챕터 내용"
            readOnly={isGenerating}
          />

          <ButtonWrap>
            <Button onClick={generateChapter} disabled={isGenerating}>
              {isGenerating ? "생성 중..." : "챕터 생성"}
            </Button>
          </ButtonWrap>
          <TextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="피드백을 입력하세요"
          />
          <ButtonWrap>
            <Button onClick={saveFeedback}>피드백 저장</Button>
          </ButtonWrap>

          {currentChapter ===
            userScenarios.find((s) => s.id === parseInt(selectedScenarioId))
              ?.chapter_count && (
            <ButtonWrap>
              <PredictButton onClick={() => alert("흥행도 예측 실행")}>
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