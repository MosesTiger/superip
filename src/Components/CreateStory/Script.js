import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = styled.textarea`
  width: 100%;
  border: 0;
  background-color: #EDF6F6;
  height: 70vh;
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
  overflow-Y: scroll;
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

  return (
    <>
      <SaveButton>저장</SaveButton>
      <PaginationContainer>
      </PaginationContainer>
      <Input>{`여기에 시나리오 넣어.\n\n\n요로케 넣어도됌`}</Input>
    </>
  );
}

export default Script;
