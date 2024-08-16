import React from 'react';
import styled from 'styled-components';

const ScenarioItem = styled.div`
  background-color: #C6D0D6;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  color: black;
  font-size: 16px;
  height: 200px;
  margin: 10px;
`;

export default function SceneCard() {
  return (
    <div>
        <ScenarioItem>시나리오 1</ScenarioItem>
    </div>
  );
}
