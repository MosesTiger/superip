import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

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
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
`;

const ChapterTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const ScenarioText = styled.pre`
  flex-grow: 1;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 16px;
  line-height: 1.6;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: auto;
  margin-bottom: 20px;
  display: ${(props) => (props.isGenerating ? "none" : "block")};
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

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff4136;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:disabled {
    background-color: #ffcccb;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PredictionButton = styled(Button)`
  background-color: #75c96e;
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  display: ${(props) => (props.isGenerating ? "block" : "none")};
  margin: auto;
`;

const LoadingMessage = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #333;
  display: ${(props) => (props.isGenerating ? "block" : "none")};
`;

function Script() {
  const [scenarioContent, setScenarioContent] = useState("");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [scenarioId, setScenarioId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInput, setUserInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  const totalChapters = Math.ceil(location.state?.scenarioData.duration / 10); // 10분당 1챕터

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (location.state?.scenarioData) {
      generateScenario(location.state.scenarioData);
    }
  }, [isAuthenticated, location.state, navigate]);

  const generateScenario = async (data) => {
    setIsGenerating(true);
    setScenarioContent("");

    const charactersArray = Array.isArray(data.characters)
      ? data.characters
      : data.characters
      ? data.characters.split(",").map((char) => char.trim())
      : [];

    const requestData = {
      title: data.title,
      keyword: data.keyword,
      genre: data.genre,
      theme: data.theme,
      characters: charactersArray,
      scenario_content: data.scenario_content || "",
    };

    try {
      const response = await fetch(
        "http://43.200.200.147/api/v1/scenario/generate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let content = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const rawContent = line.slice(5).trim();
            if (rawContent === "[DONE]") {
              setIsGenerating(false);
              break;
            }
            try {
              const jsonData = JSON.parse(rawContent);
              if (jsonData.type === "content") {
                content += jsonData.content;
                setScenarioContent(content);
              } else if (jsonData.type === "id") {
                setScenarioId(jsonData.id);
              }
            } catch (e) {
              console.error("Failed to parse JSON:", rawContent);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setIsGenerating(false);
    }
  };

  const handleContinueChapter = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(
        `http://43.200.200.147/api/v1/scenario/${scenarioId}/continue`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_input: userInput }),
        }
      );

      const result = await response.json();
      setScenarioContent((prev) => prev + "\n\n" + result.content);
      setCurrentChapter((prev) => prev + 1);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://43.200.200.147/api/v1/scenario/api/v1/scenario/${scenarioId}/revise`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feedback: "User edited",
            user_input: scenarioContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save the scenario");
      }

      alert("Scenario saved successfully.");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the scenario");
    }
  };

  const handlePredictionClick = () => {
    navigate("/create/show");
  };

  return (
    <PageContainer>
      <ScenarioContainer>
        <ChapterTitle>Chapter {currentChapter} / 9</ChapterTitle>
        <Spinner isGenerating={isGenerating} />
        <ScenarioText isGenerating={isGenerating}>
          {scenarioContent}
        </ScenarioText>
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="다음 챕터에 대한 의견이나 조언을 주세요"
        />
        <ButtonContainer>
          {currentChapter < totalChapters ? (
            <Button
              onClick={handleContinueChapter}
              disabled={isGenerating || !scenarioId}
            >
              {isGenerating ? "생성 중..." : "다음 챕터 작성"}
            </Button>
          ) : (
            <PredictionButton onClick={handlePredictionClick}>
              최종 흥행도 예측
            </PredictionButton>
          )}
          <Button onClick={handleSave} disabled={isGenerating || !scenarioId}>
            Save
          </Button>
        </ButtonContainer>
        <LoadingMessage isGenerating={isGenerating}>
          시나리오 생성 중입니다!
        </LoadingMessage>
      </ScenarioContainer>
    </PageContainer>
  );
}

export default Script;
