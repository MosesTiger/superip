// Script.js
import React from 'react';
import styled from 'styled-components'; // styled-components 라이브러리 import

const TitleInput = styled.input`
  width: 100%;
  border: 0;
  background-color: #859AA5;
  height: 1000px; /* 높이 업데이트 */
  border-radius: 4px;
  padding: 8px 16px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  min-width: 250px;
  z-index: 3;
  margin: 15px 0; /* 마진 업데이트 */
`;

function Script() {
  return (
    <TitleInput placeholder="시나리오 작성" type="text" />
  );
}

export default Script;
