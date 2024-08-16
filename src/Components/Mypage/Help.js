import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
  background-color: #C6D0D6;
  border: none;
  border-radius: 5px;
  color: black;
  font-size:15px;
  padding: 15px 20px;
  margin: 10px 0;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #AAB9BF;
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

export default function Help() {
  return (
    <div>
      <ButtonContainer>
        <Button>
          <ButtonImage src="/center1.png" alt="개인정보처리방침" />
          개인정보처리방침
        </Button>
        <Button>
          <ButtonImage src="/center1.png" alt="오픈소스 라이선스" />
          오픈소스 라이선스
        </Button>
        <Button>
          <ButtonImage src="/center2.png" alt="1:1 문의" />
          1:1 문의
        </Button>
      </ButtonContainer>
    </div>
  );
}
