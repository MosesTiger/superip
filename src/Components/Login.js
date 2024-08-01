import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일드 컴포넌트 정의
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #edf6f6;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 70px 100px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 400px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const OAuthButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: white;

  &.kakao {
    background-color: #fee500;
    color: #181600;
  }

  &.naver {
    background-color: #03c75a;
  }

  &:hover {
    opacity: 0.9;
  }
`;

// 로그인 컴포넌트 정의
function Login() {
  return (
    <LoginContainer>
      <LoginBox>
        <Link to="/">
          <Logo src="로고 제목.png" alt="Logo" />
        </Link>
        <Input type="text" placeholder="ID" />
        <Input type="password" placeholder="Password" />
        <LoginButton>Login</LoginButton>
        <OAuthButton className="kakao">카카오톡으로 로그인</OAuthButton>
        <OAuthButton className="naver">네이버로 로그인</OAuthButton>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
