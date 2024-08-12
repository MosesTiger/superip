import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일드 컴포넌트 정의
const LoginText = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  padding-left: 40px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: #f4f5f5;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  margin-top: 25px;
  border: none;
  background-color: #182e3f;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
  margin-top: 10px;
  gap: 10px;
`;

const LinkButton = styled(Link)`
  color: #757678;
  text-decoration: none;
  font-size: 14px;
  margin-right: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

// 로그인 컴포넌트 정의
function FindPW() {
  return (
    <>
      <LoginText>비밀번호 찾기</LoginText>
      <InputContainer>
        <Input type="text" placeholder="아이디" />
      </InputContainer>
      <InputContainer>
        <Input type="text" placeholder="이름" />
      </InputContainer>
      <InputContainer>
        <Input type="password" placeholder="E-mail" />
      </InputContainer>
      <Link to="/login/findpw/result">
        <LoginButton>비밀번호 찾기</LoginButton>
      </Link>
      <LinkContainer>
        <LinkButton to="/login/signup">회원가입</LinkButton>
        <LinkButton to="/login">로그인</LinkButton>
      </LinkContainer>
    </>
  );
}

export default FindPW;
