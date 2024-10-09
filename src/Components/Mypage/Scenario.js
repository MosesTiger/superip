import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SceneCard from "./SceneCard";
import axios from 'axios';
import { useAuth } from '../../context/AutoProvider';
import { useNavigate } from 'react-router-dom';

// 시나리오 그리드 스타일 정의
const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export default function Scenario() {
  const [scenarios, setScenarios] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchScenarios = async () => {
      try {
        const response = await axios.get(`http://3.36.168.204/api/v1/scenario/user/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setScenarios(response.data);
      } catch (error) {
        console.error("시나리오를 불러오는 데 실패했습니다:", error);
        setError("시나리오를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      }
    };

    fetchScenarios();
  }, [isAuthenticated, user, token, navigate]);

  if (!isAuthenticated) {
    return null; // 로그인 페이지로 리다이렉트되므로 아무것도 렌더링하지 않음
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div>
      <h2>{user.full_name || user.username}의 시나리오 보관함</h2>
      <ScenarioGrid>
        {scenarios.map((scenario) => (
          <SceneCard
            key={scenario.id}
            imageSrc={scenario.cover_image || "./default_cover.jpg"}
            title={scenario.title}
            chapter={scenario.chapters ? scenario.chapters.length : 0}
          />
        ))}
      </ScenarioGrid>
    </div>
  );
}