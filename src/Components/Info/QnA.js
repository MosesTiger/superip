import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 40px;
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  color: black;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6f0f0;
    cursor: pointer;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Type = styled.span`
  font-size: 13px;
  color: blue; /* 파란색 글씨 */
`;

const Title = styled.span`
  font-size: 18px;
  color: black;
`;

const StatusBox = styled.div`
  background-color: #f0ad4e;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 80px; /* 박스 크기 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const DateText = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  margin-bottom: 5px;
`;

const Divider = styled.hr`
  margin: 30px 0;
  border: none;
  border-top: 2px solid ${({ color }) => color || "#000"}; /* 기본값 #000 */
  width: 100%;
`;

const InquiryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 200px; /* 박스 크기 증가 */
  border: 2px solid #c9c9c9;
`;

const InquiryButton = styled.button`
  background-color: #182e3f;
  border: none;
  color: white;
  font-size: 16px;
  padding: 10px 20px; /* 버튼 크기 조절 */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3f617b;
  }
`;

const InquiryText = styled.p`
  font-size: 18px;
  color: black;
  display: flex;
  align-items: center; /* 아이콘과 텍스트를 수직으로 중앙 정렬 */
  gap: 10px; /* 아이콘과 텍스트 사이에 간격 */
`;

const Icon = styled.img`
  width: 24px; /* 아이콘 너비 */
  height: 24px; /* 아이콘 높이 */
`;

const NoInquiryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NoInquiryIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const NoInquiryText = styled.p`
  font-size: 18px;
  color: #666;
`;

export default function QnA() {
  const [inquiries, setInquiries] = useState([]); // 문의사항 리스트
  const navigate = useNavigate();

  // localStorage에서 문의사항을 불러옴
  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
    setInquiries(storedInquiries);
  }, []);

  const handleItemClick = (inquiry) => {
    if (inquiry.id) {
      // inquiry.id가 존재할 때만 navigate 실행
      navigate(`/Info/Inquiry/${inquiry.id}`, { state: { inquiry } });
    } else {
      console.error("Inquiry ID is undefined");
    }
  };

  return (
    <Container>
      {inquiries.length > 0 ? (
        <List>
          {inquiries.map((inquiry, index) => (
            <ListItem key={index} onClick={() => handleItemClick(inquiry)}>
              <LeftContainer>
                <LeftSection>
                  <Type>{inquiry.type}</Type>
                  <Title>{inquiry.title}</Title>
                </LeftSection>
                <DateText>{inquiry.date}</DateText>
              </LeftContainer>
              <StatusBox>{inquiry.status}</StatusBox> {/* 처리중 상태 표시 */}
            </ListItem>
          ))}
        </List>
      ) : (
        <NoInquiryContainer>
          <NoInquiryIcon src="/문의사항없음.svg" alt="문의사항 없음" />
          <NoInquiryText>
            내역이 없습니다. <br />
            문의사항이 있으시면 언제든 글을 남겨주세요.
          </NoInquiryText>
        </NoInquiryContainer>
      )}
      <Divider color="#c9c9c9" />
      <InquiryBox>
        <InquiryText>
          <Icon src="/문의사항아이콘.svg" alt="문의사항 아이콘" />
          다른 문의 사항이 있으신가요?
        </InquiryText>
        <InquiryButton onClick={() => navigate("/Info/Inquiry")}>
          1:1 문의하기
        </InquiryButton>
      </InquiryBox>
    </Container>
  );
}
