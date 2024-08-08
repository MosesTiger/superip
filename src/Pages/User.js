import React from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

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

// 로그인 컴포넌트 정의
function User() {
  return (
    <LoginContainer>
      <LoginBox>
        <Link to="/">
          <Logo src="/로고 제목.png" alt="Logo" />
        </Link>
        <Outlet/>
      </LoginBox>
    </LoginContainer>
  );
}

export default User;
