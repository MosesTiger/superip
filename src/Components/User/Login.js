import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // login 함수 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handleLogin = async () => {
    try {
      // 백엔드 요청 주석 처리
      /*
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.');
      }

      const data = await response.json();
      */
      //----------------------------------------------------
      // 주석 처리된 부분을 로컬 스토리지와 비교하는 부분으로 대체
      const savedUser = JSON.parse(localStorage.getItem('user'));

      console.log("Saved user:", savedUser);

      if (savedUser && savedUser.email === username && savedUser.password === password) {
        login(username, password); // 인증 상태 변경 및 사용자 정보 저장
        navigate("/"); // 로그인 후 홈 페이지로 이동
      } else {
        throw new Error('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.');
      }
      //----------------------------------------------------
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
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
        <InputImage src="/비밀번호.svg " alt="pass Icon" />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
      <OAuthButton className="kakao">
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
