import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

// ... (스타일 컴포넌트는 그대로 유지)

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

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://3.36.168.204/api/v1/auth/${provider}`;
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
      <OAuthButton className="kakao" onClick={() => handleOAuthLogin('kakao')}>
        <img src="/카카오.png" alt="Ka Logo" />
        카카오톡 로그인
      </OAuthButton>
      <OAuthButton className="naver" onClick={() => handleOAuthLogin('naver')}>
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