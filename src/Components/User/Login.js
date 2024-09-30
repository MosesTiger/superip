import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import axios from 'axios'

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

const InputImage = styled.img`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 23px;
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
  background-color: #182e3f;
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
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login attempt:", username, password); // 디버깅을 위한 로그
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert(error.message || '로그인 중 오류가 발생했습니다.');
    }
  };
  const Rest_api_key = 'f93329802bc8360700626106ac09c655'; 
  const redirect_uri = 'https: //createstory.co.kr'; 
  
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <LoginText>LOGIN</LoginText>
      <InputContainer>
        <InputImage src="/아이디.svg" alt="ID Icon" />
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <InputImage src="/비밀번호.svg" alt="pass Icon" />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
      <OAuthButton className="kakao" onClick={handleKakaoLogin}>
        <img src="/카카오.png" alt="Ka Logo" />
        카카오톡 로그인
      </OAuthButton>
      <OAuthButton className="naver">
        <img src="/네이버.png" alt="Naver Logo" />
        네이버 로그인
      </OAuthButton>
      <LinkContainer>
        <LinkButton to="/login/findid">아이디 찾기</LinkButton>
        <LinkButton to="/login/findpw">비밀번호 찾기</LinkButton>
        <LinkButton to="/login/Signup">회원가입</LinkButton>
      </LinkContainer>
    </>
  );
}

export default Login;