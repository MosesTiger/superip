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

function ExampleScript() {
  return (
    <PageContainer>
      <ScenarioContainer>
        <ChapterTitle>Chapter {currentChapter} / 9</ChapterTitle>
        <Spinner isGenerating={isGenerating} />
        <ScenarioText isGenerating={isGenerating}></ScenarioText>
        <Input value={userInput} />
      </ScenarioContainer>
    </PageContainer>
  );
}

export default ExampleScript;
