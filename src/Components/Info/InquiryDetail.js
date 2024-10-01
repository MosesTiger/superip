import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
`;

const Type = styled.h4`
  font-size: 16px;
  color: blue;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #182e3f;
  margin-bottom: 20px;
`;

const StatusWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Date = styled.div`
  color: #999;
`;

const Status = styled.div`
  background-color: #f0ad4e;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 70px; /* 박스 크기 조정 */
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: 2px solid #000;
`;

const Content = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: black;
  padding: 10px 0px;
`;

const AnswerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  padding: 20px;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
`;

const AnswerTitle = styled.h2`
  font-size: 24px;
  color: #ccc;
  margin-right: 20px;
`;

const AnswerContent = styled.p`
  font-size: 16px;
  color: #ccc;
`;

export default function InquiryDetail() {
  const location = useLocation();
  const { inquiry } = location.state; // ListItem에서 전달된 데이터를 받아옴

  return (
    <Container>
      {/* 문의 유형 */}
      <Type>{inquiry.type}</Type>

      {/* 제목 */}
      <Title>{inquiry.title}</Title>

      {/* 처리 상태 */}
      <StatusWrap>
        <Date>{inquiry.date}</Date>
        <Status>{inquiry.status}</Status>
      </StatusWrap>

      <Divider />

      {/* 문의 내용 */}
      <Content>{inquiry.content}</Content>

      {/* 답변 */}
      <AnswerWrapper>
        <AnswerTitle>A</AnswerTitle>
        <AnswerContent>답변이 등록되지 않았습니다.</AnswerContent>
      </AnswerWrapper>
    </Container>
  );
}
