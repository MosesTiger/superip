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
  margin-bottom:10px;  
`
const ResultRed = styled.div`
  display:float;
  font-size: 15px;
  font-weight: 600;
  color:#FF0000;
`
const ResultGroup = styled.div`
    margin: 60px;
    margin-right: 200px;
`
const LoginButton = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  margin-top: 25px;
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
function FindPW_End() {
  return (
    <>
        <LoginText>회원님의 임시 비밀번호입니다.</LoginText>
        <ResultGroup>    
        <Result>
          iSP2ulKMFN 
        </Result>
        <ResultRed>
          ※안전을 위해 비밀번호를 변경해 주세요.
        </ResultRed>
        </ResultGroup>
        <ButtonGroup>
        <Link to="/user/login">
            <LoginButton>Login</LoginButton>
        </Link>
        </ButtonGroup>
    </>
  );
}

export default FindPW_End;
