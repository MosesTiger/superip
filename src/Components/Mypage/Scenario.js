import React from 'react';
import styled from 'styled-components';
import SceneCard from './SceneCard';

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export default function Scenario() {
  return (
    <div>
      <ScenarioGrid>
        <SceneCard/>
        <SceneCard/>
        <SceneCard/>
        <SceneCard/>
        <SceneCard/>
        <SceneCard/>
      </ScenarioGrid>
    </div>
  );
}
