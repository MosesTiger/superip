import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #666;

  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
`;

const PageTitle = styled.h2`
  color: #333;
  font-size: 28px;
  margin: 0;
  font-weight: 600;
  position: relative;
  display: inline-block;
  padding-bottom: 15px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #E50914;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px;
  color: #666;
  font-size: 18px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  padding: 15px;
  background: #f8d7da;
  border-radius: 4px;
  margin-top: 20px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 50px;
  color: #666;
  font-size: 18px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: ${props => props.disabled ? '#e9ecef' : '#E50914'};
  color: white;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${props => props.disabled ? '#e9ecef' : '#c4151e'};
  }
`;

const PageInfo = styled.span`
  color: #333;
  font-size: 16px;
`;

function Scenario() {
  const [scenarios, setScenarios] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `43.200.111.65/api/v1/scenario/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (Array.isArray(response.data)) {
          setScenarios(response.data);
        } else {
          setScenarios([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("시나리오를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user && token) {
      fetchScenarios();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user, token]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScenarios = scenarios.slice(startIndex, endIndex);
  const totalPages = Math.ceil(scenarios.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleCardClick = (scenarioId) => {
    navigate(`/create/script`, {
      state: {
        scenarioId: scenarioId,
        fromMyPage: true //마이페이지에서 왔다는 것을 표시 
      }
    });
  };

  if (!isAuthenticated) return null;
  if (loading) return <Container><LoadingSpinner>시나리오를 불러오는 중...</LoadingSpinner></Container>;

  return (
    <Container>
      <Header>
        <PageTitle>{user.full_name || user.username}의 시나리오</PageTitle>
      </Header>

      {scenarios.length === 0 ? (
        <EmptyState>
          아직 작성한 시나리오가 없습니다.
          <br />
          새로운 시나리오를 작성해보세요!
        </EmptyState>
      ) : (
        <>
          <ScenarioGrid>
            {currentScenarios.map((scenario) => (
              <Card key={scenario.id} onClick={() => handleCardClick(scenario.id)}>
                <CardTitle>{scenario.title}</CardTitle>
                <Info>
                  <div>장르: {Array.isArray(scenario.genre) ? 
                    scenario.genre.slice(0, 2).join(', ') + (scenario.genre.length > 2 ? '...' : '') : 
                    scenario.genre || '미정'}
                  </div>
                  <div>테마: {scenario.theme || '미정'}</div>
                  <div>러닝타임: {scenario.runtime || 0}분</div>
                </Info>
              </Card>
            ))}
          </ScenarioGrid>

          {totalPages > 1 && (
            <Pagination>
              <PageButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                <GoChevronLeft />
              </PageButton>
              <PageInfo>
                {currentPage} / {totalPages}
              </PageInfo>
              <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                <GoChevronRight />
              </PageButton>
            </Pagination>
          )}
        </>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

export default Scenario;