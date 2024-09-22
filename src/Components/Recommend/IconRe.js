import React from "react";
import styled from "styled-components";

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const IconItem = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

function IconRe() {
  const items = ["아이콘1", "아이콘2", "아이콘3", "아이콘4"];

  return (
    <IconContainer>
      {items.map((item, index) => (
        <IconItem key={index}>{item}</IconItem>
      ))}
    </IconContainer>
  );
}

export default IconRe;
