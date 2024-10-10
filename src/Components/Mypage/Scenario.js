import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SceneCard from "./SceneCard";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

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

const NameTitle = styled.h2`
  color: black;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  color: black;
`;

const PageLeftButton = styled(GoChevronLeft)`
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  color: black;
  font-size: 24px;

  &:hover {
    color: #e23a3a;
  }

  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
`;

const PageRightButton = styled(GoChevronRight)`
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  color: black;
  font-size: 24px;

  &:hover {
    color: #e23a3a;
  }

  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
`;

export default function Scenario() {
  const [scenarios, setScenarios] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 한 페이지에 보여줄 시나리오 수

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchScenarios = async () => {
      try {
        const response = await axios.get(
          `http://3.36.168.204/api/v1/scenario/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setScenarios(response.data);
      } catch (error) {
        console.error("시나리오를 불러오는 데 실패했습니다:", error);
        setError("시나리오를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      }
    };

    fetchScenarios();
  }, [isAuthenticated, user, token, navigate]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScenarios = scenarios.slice(startIndex, endIndex);

  const totalPages = Math.ceil(scenarios.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (!isAuthenticated) {
    return null; // 로그인 페이지로 리다이렉트되므로 아무것도 렌더링하지 않음
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div>
      <NameTitle>{user.full_name || user.username}의 시나리오</NameTitle>
      <ScenarioGrid>
        {currentScenarios.map((scenario) => (
          <SceneCard
            key={scenario.id}
            imageSrc={scenario.cover_image || "./default_cover.jpg"}
            title={scenario.title}
            chapter={scenario.chapters ? scenario.chapters.length : 0}
          />
        ))}
      </ScenarioGrid>

      {/* 페이지네이션 */}
      <Pagination>
        <PageLeftButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        />
        <span>
          {currentPage} / {totalPages}
        </span>
        <PageRightButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
}
