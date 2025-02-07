import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import axios from "axios";

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
  width: 100%;
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
  right: -40px;
  top: 50%;
  transform: translateY(-65%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #757678;
`;

const SignUpButton = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin: 15px 0;
  border-radius: 5px;
  border: none;
  background-color: #182e3f;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const CheckboxLabelBold = styled(CheckboxLabel)`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
`;

const ContentsWrap = styled.div`
  font-size: 13px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const Passwordcheck = styled.p`
  font-size: 13px;
  margin-top: -5px;
  text-align: left;
  margin-left: 45px;
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  color: #0056b3;
  text-decoration: none;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const data = [
    {
      id: 0,
      title: "서비스 이용약관 동의",
      contents: "서비스 이용약관 내용...",
      status: "(필수)",
    },
    {
      id: 1,
      title: "개인정보 수집 및 이용 동의",
      contents: "개인정보 수집 및 이용 내용...",
      status: "(필수)",
    },
    {
      id: 2,
      title: "마케팅 정보 수신 동의",
      contents: "마케팅 정보 수신 내용...",
      status: "(선택)",
    },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordMatch = password === confirmPassword && password !== "";

  const allChecked = (checked) => {
    if (checked) {
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const selectChecked = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const isPasswordValid = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);
  };

  const allInputsFilled = email && password && confirmPassword && name;
  const allRequiredChecked = checkItems.includes(0) && checkItems.includes(1);
  const isPasswordValidFormat = isPasswordValid(password);
  const canSignUp = allInputsFilled && allRequiredChecked && isPasswordMatch && isPasswordValidFormat;

  const handleSignUp = async () => {
    if (!allInputsFilled) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    if (!allRequiredChecked) {
      alert("필수 약관에 동의해 주세요.");
      return;
    }

    if (!isPasswordValidFormat) {
      alert("비밀번호는 영문, 숫자 조합 8-16자로 입력해 주세요.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://43.200.111.65/api/v1/auth/register",
        {
          email: email,
          password: password,
          full_name: name,
          username: email,
          social_provider: "LOCAL",
          social_id: null,
        }
      );

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      if (error.response) {
        if (error.response.status === 400) {
          alert(`회원가입 실패: ${error.response.data.detail}`);
        } else if (error.response.status === 500) {
          alert("서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          alert(
            `회원가입 실패: ${
              error.response.data.detail || "알 수 없는 오류가 발생했습니다."
            }`
          );
        }
      } else if (error.request) {
        alert("서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.");
      } else {
        alert("회원가입 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <SignupText>회원가입</SignupText>
      <InputContainer>
        <Input
          type="email"
          placeholder="예) abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="영문, 숫자 조합 8-16자"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <EyeButton onClick={togglePasswordVisibility}>
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </EyeButton>
      </InputContainer>
      {password && !isPasswordValidFormat && (
        <Passwordcheck style={{ color: "red" }}>
          비밀번호는 영문, 숫자 조합 8-16자로 입력해 주세요.
        </Passwordcheck>
      )}
      <InputContainer>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <EyeButton onClick={togglePasswordVisibility}>
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </EyeButton>
      </InputContainer>
      <div style={{ minHeight: "15px" }}>
        {confirmPassword && (
          <Passwordcheck style={{ color: isPasswordMatch ? "green" : "red" }}>
            {isPasswordMatch
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </Passwordcheck>
        )}
      </div>
      <InputContainer>
        <Input
          type="text"
          placeholder="이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>
      <CheckboxContainer>
        <CheckboxLabelBold>
          <input
            type="checkbox"
            onChange={(e) => allChecked(e.target.checked)}
            checked={checkItems.length === data.length}
          />
          약관에 모두 동의합니다.
        </CheckboxLabelBold>
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <CheckboxLabel>
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => selectChecked(e.target.checked, item.id)}
                  checked={checkItems.includes(item.id)}
                />
                <span
                  style={{
                    marginLeft: "5px",
                    color: item.status === "(필수)" ? "red" : "gray",
                  }}
                >
                  {item.status}
                </span>
                {item.title}
              </div>
              {index === 0 ? (
                open0 ? (
                  <MdOutlineKeyboardArrowUp
                    size={30}
                    color="gray"
                    onClick={() => setOpen0(!open0)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    size={30}
                    color="gray"
                    onClick={() => setOpen0(!open0)}
                  />
                )
              ) : index === 1 ? (
                open1 ? (
                  <MdOutlineKeyboardArrowUp
                    size={30}
                    color="gray"
                    onClick={() => setOpen1(!open1)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    size={30}
                    color="gray"
                    onClick={() => setOpen1(!open1)}
                  />
                )
              ) : open2 ? (
                <MdOutlineKeyboardArrowUp
                  size={30}
                  color="gray"
                  onClick={() => setOpen2(!open2)}
                />
              ) : (
                <MdOutlineKeyboardArrowDown
                  size={30}
                  color="gray"
                  onClick={() => setOpen2(!open2)}
                />
              )}
            </CheckboxLabel>
            {(index === 0 && open0) ||
            (index === 1 && open1) ||
            (index === 2 && open2) ? (
              <ContentsWrap>{item.contents}</ContentsWrap>
            ) : null}
          </React.Fragment>
        ))}
      </CheckboxContainer>
      <SignUpButton onClick={handleSignUp} disabled={!canSignUp}>
        회원가입
      </SignUpButton>
      <LoginLink to="/login">이미 계정이 있으신가요? 로그인</LoginLink>
    </>
  );
}

export default Signup;