import React, { useState } from "react";
import styled from "styled-components";

const ScenarioItem = styled.div`
  background-color: #c6d0d6;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  color: black;
  font-size: 16px;
  height: 200px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScenarioImage = styled.img`
  width: 100%; /* 이미지가 칸의 전체 너비를 차지하도록 설정 */
  height: 70%; /* 비율을 유지하면서 높이를 자동으로 조정 */
  border-radius: 10px; /* 이미지의 모서리를 둥글게 설정 */
  margin-bottom: 10px; /* 이미지와 텍스트 사이의 간격 설정 */
  object-fit: cover; /* 이미지가 칸을 완전히 채우도록 설정 */
`;

const Section = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function SceneCard({ imageSrc, title, chapter }) {
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
      <Section>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        <div style={{ fontSize: "13px" }}>Chapter : {chapter}</div>
      </Section>
    </ScenarioItem>
  );
}
