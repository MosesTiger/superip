import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

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
  right: -40px;s
  top: %;
  transform: translateY(-160%);
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

const ContentsWrap = styled.div`
  font-size: 13px; /* 글씨 크기 조정 */
  display: flex;
  align-items: center;
  margin-top:-10px;
`

// Signup 컴포넌트 정의
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)

  const data = [
    {
      id: 0,
      title: '만 14세 이상임에 필수 동의',
      contents: '만 14세 이상임에 필수 동의합니다.',
      status: '(필수)',
    },
    {
      id: 1,
      title: '개인정보 수집 및 이용 동의',
      contents: '반갑습니다',
      status: '(필수)',
    },
    {
      id: 2,
      title: '이용약관 필수 동의',
      contents: '필수입니다',
      status: '(필수)',
    },
    {
      id: 3,
      title: '마케팅 정보 수신 선택 동의',
      contents: '선택입니다',
      status: '(선택)',
    }
  ]

  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 개별 선택하기
  const selectChecked = (checked, id) => {
    if (checked) {
      setCheckItems(item => [...item, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택하기
  const allChecked = (checked) => {
    if (checked) {
      const itemList = [];
      data.forEach((el) => itemList.push(el.id));
      setCheckItems(itemList);
    } else {
      setCheckItems([]);
    }
  }

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
            <input type='checkbox'
            name='all-checked'
            onChange={(e) => allChecked(e.target.checked)}
            checked={checkItems.length === data.length ? true : false}
              />
            <span>약관에 모두 동의합니다.</span>
          </CheckboxLabelBold>
          <CheckboxLabel>
          </CheckboxLabel>
          <CheckboxLabel>
            <label>
              <input
                type='checkbox'
                name='select-checked'
                onChange={(e) => selectChecked(e.target.checked, data[0].id)}
                checked={checkItems.includes(data[0].id) ? true : false}
                />
              <span style={{ marginRight: '5px', color: data[0].status === '(필수)' ? 'red' : 'gray' }}>{data[0].status}</span> {data[0].title}
            </label>
            {open1 ?
              <MdOutlineKeyboardArrowUp size={30} color='gray' onClick={() => {
                setOpen1(!open1)
              }} />
              :
              <MdOutlineKeyboardArrowDown size={30} color='gray' onClick={() => {
                setOpen1(!open1)
              }} />
            }
          </CheckboxLabel>
          {open1 &&
          <ContentsWrap>
            <p>{data[0].contents}</p>
          </ContentsWrap>
          }
          <CheckboxLabel>
            <label>
              <input
                type='checkbox'
                name='select-checked'
                onChange={(e) => selectChecked(e.target.checked, data[1].id)}
                checked={checkItems.includes(data[1].id) ? true : false}
                />
              <span style={{ marginRight: '5px', color: data[1].status === '(필수)' ? 'red' : 'gray' }}>{data[1].status}</span> {data[1].title}
            </label>
            {open2 ?
              <MdOutlineKeyboardArrowUp size={30} color='gray' onClick={() => {
                setOpen2(!open2)
              }} />
              :
              <MdOutlineKeyboardArrowDown size={30} color='gray' onClick={() => {
                setOpen2(!open2)
              }} />
            }
          </CheckboxLabel>
          {open2 &&
          <ContentsWrap>
            <p>{data[1].contents}</p>
          </ContentsWrap>
          }
          <CheckboxLabel>
            <label>
              <input
                type='checkbox'
                name='select-checked'
                onChange={(e) => selectChecked(e.target.checked, data[2].id)}
                checked={checkItems.includes(data[2].id) ? true : false}
                />
              <span style={{ marginRight: '5px', color: data[2].status === '(필수)' ? 'red' : 'gray' }}>{data[2].status}</span> {data[2].title}
            </label>
            {open3 ?
              <MdOutlineKeyboardArrowUp size={30} color='gray' onClick={() => {
                setOpen3(!open3)
              }} />
              :
              <MdOutlineKeyboardArrowDown size={30} color='gray' onClick={() => {
                setOpen3(!open3)
              }} />
            }
          </CheckboxLabel>
          {open3 &&
          <ContentsWrap>
            <p>{data[2].contents}</p>
          </ContentsWrap>
          }
          <CheckboxLabel>
            <label>
              <input
                type='checkbox'
                name='select-checked'
                onChange={(e) => selectChecked(e.target.checked, data[3].id)}
                checked={checkItems.includes(data[3].id) ? true : false}
                />
              <span style={{ marginRight: '5px', color: data[3].status === '(필수)' ? 'red' : 'gray' }}>{data[3].status}</span> {data[3].title}
            </label>
            {open4 ?
              <MdOutlineKeyboardArrowUp size={30} color='gray' onClick={() => {
                setOpen4(!open4)
              }} />
              :
              <MdOutlineKeyboardArrowDown size={30} color='gray' onClick={() => {
                setOpen4(!open4)
              }} />
            }
          </CheckboxLabel>
          {open4 &&
          <ContentsWrap>
            <p>{data[3].contents}</p>
          </ContentsWrap>
          }
        </CheckboxContainer>
        <Link to="/">
        <LoginButton>Sign Up</LoginButton>
        </Link>
        </>
  );
}

export default Signup;
