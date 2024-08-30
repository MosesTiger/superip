import React, { useState } from 'react';
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScenarioImage = styled.img`
  width: 100%;  /* 이미지가 칸의 전체 너비를 차지하도록 설정 */
  height: auto;  /* 비율을 유지하면서 높이를 자동으로 조정 */
  max-height: 150px;  /* 너무 크지 않도록 최대 높이를 설정 */
  border-radius: 10px; /* 이미지의 모서리를 둥글게 설정 */
  margin-bottom: 10px; /* 이미지와 텍스트 사이의 간격 설정 */
  object-fit: cover;  /* 이미지가 칸을 완전히 채우도록 설정 */
`;

export default function SceneCard({ imageSrc, title }) {
  const [imgError, setImgError] = useState(false);

  return (
    <ScenarioItem>
      {imageSrc && !imgError && (
        <ScenarioImage 
          src={imageSrc} 
          alt={title} 
          onError={() => setImgError(true)} // 이미지 로드 실패 시 에러 상태를 true로 설정
        />
      )}
      <div>{title}</div>
    </ScenarioItem>
  );
}

