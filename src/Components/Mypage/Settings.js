import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #cdcdcd;
  border: none;
  border-radius: 5px;
  color: black;
  font-size: 15px;
  padding: 15px 20px;
  margin: 10px 0;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #999;
  }
`;

const ButtonImage = styled.img`
  width: 30px;
  height: auto;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Settings() {
  return (
    <div>
      <ButtonContainer>
        <Button>
          <ButtonImage src="/setting1.png" alt="설정1" />
          저장한 콘텐츠 모두 삭제
        </Button>
        <Button>
          <ButtonImage src="/setting2.png" alt="설정2" />
          회원 탈퇴
        </Button>
      </ButtonContainer>
    </div>
  );
}
