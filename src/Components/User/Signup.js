import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// 스타일드 컴포넌트 정의
const SignupText = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 80%;
  transform: translateX(-8%); 
`;

const Input = styled.input`
  width: 100%; /* 가로 길이를 100%로 조정 */
  padding: 10px;
  padding-left: 40px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: #f4f5f5;
`;

const EyeButton = styled.button`
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #757678;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin: 15px 0; /* 마진 조정 */
  border-radius: 5px;
  border: none;
  background-color: #182e3f;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 90%;
  text-align: left;
`;

const CheckboxLabel = styled.label`
  font-size: 16px; /* 글씨 크기 조정 */
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    margin-right: 10px;
  }

  a {
    color: #0056b3;
    text-decoration: none;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CheckboxLabelBold = styled(CheckboxLabel)`
  font-size: 18px; /* 글씨 크기 더 크게 */
  font-weight: bold; /* 글씨 진하게 */
  margin: 15px 0 15px 0
`;

// Signup 컴포넌트 정의
function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
        <SignupText>회원가입</SignupText>
        <InputContainer>
          <Input type="email" placeholder="예) abc@gmail.com" />
        </InputContainer>
        <InputContainer>
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="영문, 숫자 조합 8-16자" 
            />
          <EyeButton onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </EyeButton>
        </InputContainer>
        <InputContainer>
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="비밀번호를 한 번 더 입력해주세요." 
            />
          <EyeButton onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </EyeButton>
        </InputContainer>
        <InputContainer>
          <Input type="text" placeholder="이름 입력" />
        </InputContainer>
        {/* 체크박스와 약관 */}
        <CheckboxContainer>
          <CheckboxLabelBold>
            <input type="checkbox" />
            <span>약관에 모두 동의합니다.</span>
          </CheckboxLabelBold>
          <CheckboxLabel>
            <input type="checkbox" />
            <span>이용약관 필수 동의 <a href="/terms">자세히 보기</a></span>
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" />
            <span>개인정보 처리방침 필수 동의 <a href="/privacy">자세히 보기</a></span>
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" />
            <span>마케팅 정보 수신 선택 동의 <a href="/marketing">자세히 보기</a></span>
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" />
            <span>만 14세 이상임에 필수 동의</span>
          </CheckboxLabel>
        </CheckboxContainer>
        <Link to="/">
        <LoginButton>Sign Up</LoginButton>
        </Link>
        </>
  );
}

export default Signup;
