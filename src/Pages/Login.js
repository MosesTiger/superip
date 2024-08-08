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
  background-color: #F4F5F5;
`;

const InputImage = styled.img`
  position: absolute; 
  left: 10px; 
  top: 50%;
  transform: translateY(-50%);
  width: 27px; 
  height: auto;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  margin-top: 15px; 
  border: none;
  background-color: #182E3F;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const OAuthButton = styled.button`
  width: 300px;
  height: 40px; 
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; 
  position: relative; 

  &.kakao {
    background-color: #fee500;
    color: #181600;
  }

  &.naver {
    background-color: #03c75a;
  }

  img {
    position: absolute; 
    left: 20px;
    width: 14px; 
    height: auto; 
  }

  &:hover {
    opacity: 0.9;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
  margin-top: 10px;
  gap 10px;
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
function Login() {
  return (
    <LoginContainer>
      <LoginBox>
        <Link to="/">
          <Logo src="로고 제목.png" alt="Logo" />
        </Link>
        <LoginText>LOGIN</LoginText>
        <InputContainer>
          <InputImage src="아이디.png" alt="ID Icon" />
          <Input type="text" placeholder="아이디" />
        </InputContainer>
        <InputContainer>
          <InputImage src="비밀번호.png" alt="pass Icon" />
          <Input type="password" placeholder="비밀번호" />
        </InputContainer>
        <LoginButton>Login</LoginButton>
        <OAuthButton className="kakao">
          <img src="카카오.png" alt="Ka Logo" />카카오톡 로그인
        </OAuthButton>
        <OAuthButton className="naver">
          <img src="네이버.png" alt="Naver Logo" />네이버 로그인
        </OAuthButton>
        <LinkContainer>
          <LinkButton to="/find-id">아이디 찾기</LinkButton>
          <LinkButton to="/find-password">비밀번호 찾기</LinkButton>
          <LinkButton to="/signup">회원가입</LinkButton>
        </LinkContainer>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
