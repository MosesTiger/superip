import React, { useState } from "react";
import styled from "styled-components";

const TitleInput = styled.textarea`
  width: 100%;
  border: 0;
  background-color: #859aa5;
  height: 1000px;
  border-radius: 4px;
  padding: 8px 16px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  min-width: 250px;
  z-index: 3;
  margin: 15px 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ArrowIcon = styled.img`
  width: 40px; /* 화살표 크기 조정 */
  height: 40px;

  &:hover:enabled {
    opacity: 0.8;
  }
`;

const PageInfo = styled.span`
  font-size: 16px;
  color: #000;
`;

function Script() {
  // 예시로 씬 데이터 배열
  const scenes = [
    "씬 1 내용",
    "씬 2 내용",
    "씬 3 내용",
    // ...
    "씬 120 내용",
  ];

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

  const handleNextPage = () => {
    if (currentPage < scenes.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <TitleInput value={scenes[currentPage]} readOnly />
      <PaginationContainer>
        <PageButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowIcon src="/씬페이지왼쪽화살표.svg" alt="Previous Page" />
        </PageButton>
        <PageInfo>
          {currentPage + 1} / {scenes.length}
        </PageInfo>
        <PageButton
          onClick={handleNextPage}
          disabled={currentPage === scenes.length - 1}
        >
          <ArrowIcon src="/씬페이지오른쪽화살표.svg" alt="Next Page" />
        </PageButton>
      </PaginationContainer>
    </>
  );
}

export default Script;
