import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

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
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const NavButton = styled.button`
  background-color: #5d5d5d;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #999;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function ExampleScript() {
  const { movieData } = useOutletContext();
  const [currentChapter, setCurrentChapter] = useState(1);

  if (!movieData) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const totalChapters = Math.ceil(movieData.duration / 10);
  const chapterText = movieData.script[currentChapter - 1];

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < totalChapters) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  return (
    <PageContainer>
      <ScenarioContainer>
        <ChapterTitle>
          Chapter {currentChapter} / {totalChapters}
        </ChapterTitle>
        <ScenarioText>{chapterText}</ScenarioText>
      </ScenarioContainer>
      <NavigationContainer>
        <NavButton onClick={handlePreviousChapter} disabled={currentChapter === 1}>
          <IoIosArrowDropleft /> 이전 챕터
        </NavButton>
        <NavButton onClick={handleNextChapter} disabled={currentChapter === totalChapters}>
          다음 챕터 <IoIosArrowDropright />
        </NavButton>
      </NavigationContainer>
    </PageContainer>
  );
}

export default ExampleScript;