import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';
// Container for the whole graph section
const GraphContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 그래프 */
  gap: 20px;
  width: 95%;
  height: 300px; /* 전체 그래프 높이 */
  background-color: #f5f5f5;
  padding: 20px;
  overflow:hidden;
`;

// Individual container for each graph bar
const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 10px;
`;

// Label for each graph
const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

// The bar itself representing the percentage value
const Bar = styled.div`
  width: 40px;
  height: ${(props) => props.height}%; /* 퍼센트 값에 따른 높이 */
  background-color: ${(props) =>
    props.height > 70 ? "#28a745" : props.height > 40 ? "#ffc107" : "#dc3545"};
  transition: height 0.3s ease; /* 애니메이션 효과 */
`;

const Percentage = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

export default function Graph({ scenarioId }) {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchCompleteness = async () => {
      try {
        const response = await axios.get(`/api/scenario/${scenarioId}/evaluate-completeness`);
        const { Coherence, Structure, Flow, Overall } = response.data;
        setGraphData([
          { label: "개연성", value: Coherence },
          { label: "구조", value: Structure },
          { label: "흐름", value: Flow },
          { label: "전체", value: Overall }
        ]);
      } catch (error) {
        console.error("Error fetching completeness data:", error);
      }
    };

    fetchCompleteness();
  }, [scenarioId]);

  return (
    <GraphContainer>
      {graphData.map((item, index) => (
        <BarContainer key={index}>
          <Percentage>{item.value}%</Percentage>
          <Bar height={item.value} />
          <Label>{item.label}</Label>
        </BarContainer>
      ))}
    </GraphContainer>
  );
}