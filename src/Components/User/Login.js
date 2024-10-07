// src/components/Login.js
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";

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
  background-color: black;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #cdcdcd;
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert(error.response?.data?.detail || "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <LoginText>LOGIN</LoginText>
      <form onSubmit={handleLogin}>
        <InputContainer>
          <InputImage src="/아이디.svg" alt="ID Icon" />
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputImage src="/비밀번호.svg" alt="pass Icon" />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>
        <LoginButton type="submit">Login</LoginButton>
      </form>
      {/* 소셜 로그인 버튼과 회원가입 링크를 제외합니다 */}
      <LinkContainer>
        <LinkButton to="/login/findid">아이디 찾기</LinkButton>
        <LinkButton to="/login/findpw">비밀번호 찾기</LinkButton>
      </LinkContainer>
    </>
  );
}

export default Login;