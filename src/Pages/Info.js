import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // useLocation 가져오기
import Header from "../Components/Header";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  min-height: 100vh; /* 페이지 전체 높이를 차지 */
  padding: 50px 40px;
  border-top: 1px solid #000;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  width: 80%;
  margin-bottom: 20px;
  font-size: 40px;
  border-bottom: 2px solid #000; /* h1 아래에 줄 추가 */
  padding-bottom: 20px; /* 제목 아래 공간 */
`;

const Section = styled.div`
  width: 80%;
`;

export default function Info() {
  const location = useLocation(); // 현재 URL 경로 가져오기

  // URL 경로에 따라 동적으로 제목을 설정
  const getTitle = () => {
    if (location.pathname.includes("/FAQ")) {
      return "FAQ";
    } else if (location.pathname.includes("/QnA")) {
      return "QnA";
    } else if (location.pathname.includes("/How")) {
      return "How";
    } else if (location.pathname.includes("/Inquiry")) {
      return "1:1 문의하기";
    } else {
      return "Info"; // 기본 제목
    }
  };

  return (
    <div className="page">
      <Header />
      <Container>
        <Title>{getTitle()}</Title> {/* 동적으로 제목 표시 */}
        <Section>
          <Outlet /> {/* 여기서 하위 컴포넌트를 렌더링 */}
        </Section>
      </Container>
    </div>
  );
}
