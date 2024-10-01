import React from "react";
import styled from "styled-components";
import SceneCard from "./SceneCard";

// 시나리오 그리드 스타일 정의
const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export default function Scenario() {
  return (
    <div>
      <ScenarioGrid>
        <SceneCard
          imageSrc="./baseball.jpg"
          title="메이저 나의 꿈"
          chapter="10"
        />
        <SceneCard title="시나리오 2" />
        <SceneCard title="시나리오 3" />
        <SceneCard title="시나리오 4" />
        <SceneCard title="시나리오 5" />
        <SceneCard title="시나리오 6" />
      </ScenarioGrid>
    </div>
  );
}
