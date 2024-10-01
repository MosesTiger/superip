import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
`;

const Select = styled.select`
  width: 30%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 150px;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.primary ? "#182e3f" : "#ccc")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 47%;

  &:hover {
    background-color: ${(props) => (props.primary ? "#3f617b" : "#bbb")};
  }
`;

export default function Inquiry() {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleReset = () => {
    setType("");
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type && title && content) {
      // 기존 문의사항을 불러옴
      const storedInquiries =
        JSON.parse(localStorage.getItem("inquiries")) || [];

      // 현재 날짜 생성
      const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

      // 새로운 문의사항을 localStorage에 저장
      const newInquiry = {
        id: Date.now(), // 고유한 id 생성
        type,
        title,
        content,
        status: "처리중",
        date,
      };
      const updatedInquiries = [...storedInquiries, newInquiry];
      localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));

      // QnA로 이동
      navigate("/Info/QnA");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>문의유형</Label>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">-- 선택하세요 --</option>
          <option value="일반문의">일반문의</option>
          <option value="기술지원">기술지원</option>
          <option value="기타">기타</option>
        </Select>

        <Label>제목</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={30}
          placeholder="제목을 입력하세요"
        />

        <Label>문의내용</Label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          placeholder="문의 내용을 입력하세요 (1000자 이내)"
        />

        <ButtonContainer>
          <Button type="button" onClick={handleReset}>
            다시하기
          </Button>
          <Button primary type="submit">
            등록하기
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
