import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useAuth } from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";

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

const NavButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  color: black;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    color: #ccc;
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
  white-space: pre-wrap;
  line-height: 1.5;
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
  margin: 10px 0;
`;

const PreviousFeedback = styled.div`
  margin: 10px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  border-left: 3px solid #28a745;
  width: 100%;
`;

const ChapterProgress = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  color: #666;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  margin-top: 5px;
  overflow: hidden;

  div {
    height: 100%;
    background-color: #28a745;
    width: ${(props) => props.progress}%;
    transition: width 0.3s ease;
  }
`;

function Script() {
  const { token } = useAuth();
  const [userScenarios, setUserScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState("");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterContent, setChapterContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [previousFeedback, setPreviousFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [chapterCount, setChapterCount] = useState(0);
  const location = useLocation();
  const { scenarioId: initialScenarioId, fromMyPage } = location.state || {};

  const axiosInstance = axios.create({
    baseURL: "http://43.200.111.65/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    fetchUserScenarios();
    if (fromMyPage && initialScenarioId) {
      setSelectedScenarioId(initialScenarioId.toString());
    }
  }, []);

  useEffect(() => {
    if (selectedScenarioId) {
      const scenario = userScenarios.find(
        (s) => s.id === parseInt(selectedScenarioId)
      );
      if (scenario) {
        setChapterCount(scenario.chapter_count);
        fetchChapterContent(selectedScenarioId, 1);
        fetchFeedback(selectedScenarioId, 1);
      }
    }
  }, [selectedScenarioId]);

  const fetchUserScenarios = async () => {
    try {
      const response = await axiosInstance.get("/scenario/user-scenarios");
      setUserScenarios(response.data);
    } catch (err) {
      console.error("시나리오 목록 조회 중 오류:", err);
      setError("시나리오 목록을 불러오는데 실패했습니다.");
    }
  };

  const fetchChapterContent = async (scenarioId, chapter) => {
    try {
      const response = await axiosInstance.get(
        `/scenario/${scenarioId}/chapters/${chapter}`
      );
      setChapterContent(response.data.content || "");
    } catch (err) {
      console.error("챕터 내용 조회 중 오류:", err);
      setChapterContent("");
    }
  };

  const fetchFeedback = async (scenarioId, chapter) => {
    try {
      const response = await axiosInstance.get(
        `/scenario/${scenarioId}/chapters/${chapter}/feedback`
      );
      setFeedback(response.data.content || "");
    } catch (err) {
      console.error("피드백 조회 중 오류:", err);
      setFeedback("");
    }
  };

  const fetchPreviousFeedback = async (scenarioId, chapter) => {
    if (chapter > 1) {
      try {
        const response = await axiosInstance.get(
          `/scenario/${scenarioId}/chapters/${chapter - 1}/feedback`
        );
        setPreviousFeedback(response.data.content || "");
      } catch (err) {
        console.error("이전 챕터 피드백 조회 중 오류:", err);
        setPreviousFeedback("");
      }
    } else {
      setPreviousFeedback("");
    }
  };

  const handleScenarioSelect = (event) => {
    const newScenarioId = event.target.value;
    setSelectedScenarioId(newScenarioId);
    setCurrentChapter(1);
    setChapterContent("");
    setFeedback("");
    setPreviousFeedback("");
  };

  const handleChapterChange = async (newChapter) => {
    setCurrentChapter(newChapter);
    await fetchChapterContent(selectedScenarioId, newChapter);
    await fetchFeedback(selectedScenarioId, newChapter);
    await fetchPreviousFeedback(selectedScenarioId, newChapter);
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      handleChapterChange(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < chapterCount) {
      handleChapterChange(currentChapter + 1);
    }
  };

  const generateChapter = async () => {
    setIsGenerating(true);
    setError(null);
    setChapterContent("");

    const controller = new AbortController();
    let contentBuffer = "";

    try {
      const response = await fetch(
        `http://43.200.111.65/api/v1/scenario/${selectedScenarioId}/chapters/${currentChapter}/generate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/event-stream",
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(5).trim();

            if (data === "[DONE]") {
              console.log("Stream completed");
              continue;
            }

            try {
              const parsedData = JSON.parse(data);
              if (parsedData.type === "content" && parsedData.content) {
                contentBuffer += parsedData.content;
                setChapterContent(contentBuffer);
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }
      }
    } catch (err) {
      console.error("챕터 생성 중 오류 발생:", err);
      if (err.name === "AbortError") {
        setError("요청이 취소되었습니다.");
      } else if (err.response?.status === 404) {
        setError("시나리오 또는 챕터를 찾을 수 없습니다.");
      } else if (err.response?.status === 401) {
        setError("인증이 필요합니다.");
      } else {
        setError("챕터 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const saveFeedback = async () => {
    try {
      await axiosInstance.post(
        `/scenario/${selectedScenarioId}/chapters/${currentChapter}/feedback`,
        { content: feedback }
      );
      alert("피드백이 저장되었습니다.");
    } catch (err) {
      console.error("피드백 저장 중 오류:", err);
      setError("피드백 저장에 실패했습니다.");
    }
  };

  const progress = (currentChapter / chapterCount) * 100;

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
          <ChapterProgress>
            진행률: {progress.toFixed(1)}%
            <ProgressBar progress={progress}>
              <div />
            </ProgressBar>
          </ChapterProgress>

          <ChapterNavigation>
            <NavButton
              onClick={handlePreviousChapter}
              disabled={currentChapter === 1 || isGenerating}
            >
              <GoChevronLeft />
            </NavButton>
            <ChapterInfo>
              챕터 {currentChapter} / {chapterCount}
            </ChapterInfo>
            <NavButton
              onClick={handleNextChapter}
              disabled={currentChapter === chapterCount || isGenerating}
            >
              <GoChevronRight />
            </NavButton>
          </ChapterNavigation>

          {currentChapter > 1 && previousFeedback && (
            <PreviousFeedback>
              <strong>이전 챕터 피드백:</strong>
              <p>{previousFeedback}</p>
            </PreviousFeedback>
          )}

          <TextArea
            value={chapterContent}
            readOnly
            placeholder="챕터 내용이 여기에 표시됩니다."
          />

          <ButtonWrap>
            <Button onClick={generateChapter} disabled={isGenerating}>
              {isGenerating
                ? "생성 중..."
                : chapterContent
                ? "재생성"
                : "챕터 생성"}
            </Button>
          </ButtonWrap>

          <TextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="이 챕터에 대한 피드백을 입력하세요"
          />

          <ButtonWrap>
            <Button onClick={saveFeedback} disabled={isGenerating}>
              피드백 저장
            </Button>
          </ButtonWrap>
        </>
      )}
    </Section>
  );
}

export default Script;
