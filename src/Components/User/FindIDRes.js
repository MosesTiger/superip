import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일드 컴포넌트 정의
const LoginText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Result = styled.div`
    display:float;
    font-size: 20px;
    font-weight: 500;
    padding:10px;
    
`
const ResultGroup = styled.div`
    margin: 60px;
    margin-right:250px;
`
const LoginButton = styled.button`
  width: 100px;
  height: 45px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
  background-color: #B3B3B3;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #858585;
  }
`;

const PWButton = styled.button`
  width: 180px;
  height: 45px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
  background-color: #182E3F;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonGroup= styled.div`
    display: flex;
    align-items:center;
    justify-content:space-between;
    width:300px;
    padding: 0 10px;
`

// 로그인 컴포넌트 정의
function FindID_End() {
  return (
    <>
        <LoginText>회원님의 아이디를 확인해주세요.</LoginText>
        <ResultGroup>    
        <Result>
            이름 :
        </Result>
        <Result>
            아이디 : 
        </Result>
        </ResultGroup>
        <ButtonGroup>
        <Link to="/user/login">
            <LoginButton>로그인</LoginButton>
        </Link>
        <Link to="/user/findpw">
            <PWButton>비밀번호 찾기</PWButton>
        </Link>
        </ButtonGroup>
    </>
  );
}

export default FindID_End;
