import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TitleInput = styled.textarea`
  width: 100%;
  border: 0;
  background-color: #EDF6F6;
  height: 1000px;
  border-radius: 8px;
  padding: 8px 16px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  min-width: 250px;
  z-index: 3;
  margin-bottom: 20px;
  resize: none;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #EDF6F6;
  margin-top: 15px;
  border-radius: 8px;
  position: relative;
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
  font-weight:bold;
  color: #000;
  margin: 0 10px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 100px;
  padding: 10px 20px;
  background-color: #859aa5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;  // 버튼이 항상 맨 위에 위치하도록 설정

  &:hover {
    background-color: #697A82;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: -50%;
  right: 50%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: scroll;
  width: 80px;
  padding: 10px;
  list-style: none;
  z-index: 1001;
`;

const DropdownItem = styled.li`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function Script() {
  // 예시로 씬 데이터 배열
  const [scenes, setScenes] = useState(() => {
    const savedScenes = localStorage.getItem('scenes');
    return savedScenes ? JSON.parse(savedScenes) : [
      "씬 1 내용 /br",
      "씬 2 내용",
      "씬 4 내용",
      // ...
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",

    ];
  });
  // 데이터 초기화 함수
  const resetScenes = () => {
    localStorage.removeItem('scenes');
    setScenes([
      "씬 1 내용 /br",
      "씬 2 내용",
      "씬 4 내용",
      // ...
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
      "씬 120 내용",
    ]);
  };

  useEffect(() => {
    localStorage.setItem('scenes', JSON.stringify(scenes));
  }, [scenes]);

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  const handleSceneChange = (e) => {
    const updatedScenes = [...scenes];
    updatedScenes[currentPage] = e.target.value;
    setScenes(updatedScenes);
    localStorage.setItem('scenes', JSON.stringify(updatedScenes)); // 로컬 스토리지에 저장
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/save-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scenes), // 현재 모든 씬 데이터를 전송
      });

      if (!response.ok) {
        throw new Error('저장 실패');
      }

      alert('시나리오가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('시나리오 저장 중 오류가 발생했습니다.');
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    setDropdownVisible(false);
  };

  

  return (
    <>
    {/*
    <SaveButton onClick={handleSave}>저장</SaveButton>
    */}
    <SaveButton onClick={resetScenes}>리셋</SaveButton>
      <PaginationContainer>
        <PageButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowIcon src="/씬페이지왼쪽화살표.svg" alt="Previous Page" />
        </PageButton>
        <PageInfo onClick={toggleDropdown}>
          {currentPage + 1} / {scenes.length}
          {dropdownVisible && (
            <DropdownMenu>
              {scenes.map((_, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => selectPage(index)}
                >
                  {index + 1}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </PageInfo>
        <PageButton
          onClick={handleNextPage}
          disabled={currentPage === scenes.length - 1}
        >
          <ArrowIcon src="/씬페이지오른쪽화살표.svg" alt="Next Page" />
        </PageButton>
      </PaginationContainer>
      <TitleInput value={scenes[currentPage]} onChange={handleSceneChange} />
    </>
  );
}

export default Script;
