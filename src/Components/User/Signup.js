import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const Passwordcheck = styled.p`
  font-size: 13px; /* 글씨 크기 조정 */
  display: flex;
  align-items: center;
  margin-top:-10px;
`

// Signup 컴포넌트 정의
function Signup() {
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅 사용
  const [showPassword, setShowPassword] = useState(false);
  const [open0, setOpen0] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [checkItems, setCheckItems] = useState([]);

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

   // 필수 항목만 필터링
   const requiredItems = data.filter(item => item.status === '(필수)');

   // 필수 항목이 모두 체크되었는지 확인
   const allRequiredChecked = requiredItems.every(item =>
     checkItems.includes(item.id)
   );

   // 모든 입력 필드가 비어있지 않은지 확인
  const allInputsFilled =
  email !== '' && password !== '' && confirmPassword !== '' && name !== '';

  const isPasswordMatch = password === confirmPassword;

  // Sign Up 버튼이 활성화되기 위한 조건
  const canSignUp = allInputsFilled && allRequiredChecked && isPasswordMatch;

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

  const handleSignUp = () => {
    if (!allInputsFilled) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (!allRequiredChecked) {
      alert('필수 약관에 동의해 주세요.');
      return;
    }

    if (!isPasswordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 모든 조건이 충족되면 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <>
      <SignupText>회원가입</SignupText>
      <InputContainer>
        <Input
          type="email"
          placeholder="예) abc@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="영문, 숫자 조합 8-16자"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <EyeButton onClick={togglePasswordVisibility}>
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </EyeButton>
      </InputContainer>
      <InputContainer>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <EyeButton onClick={togglePasswordVisibility}>
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </EyeButton>
      </InputContainer>
      <div style={{minHeight: '15px'}}>
      {confirmPassword && (
        <Passwordcheck style={{ color: isPasswordMatch ? 'green' : 'red' }}>
          {isPasswordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
        </Passwordcheck>
        )}
      </div>
      <InputContainer>
        <Input
          type="text"
          placeholder="이름 입력"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
            <label>
              <input
                type='checkbox'
                name='select-checked'
                onChange={(e) => selectChecked(e.target.checked, data[0].id)}
                checked={checkItems.includes(data[0].id) ? true : false}
                />
              <span style={{ marginRight: '5px', color: data[0].status === '(필수)' ? 'red' : 'gray' }}>{data[0].status}</span> {data[0].title}
            </label>
            {open0 ?
              <MdOutlineKeyboardArrowUp size={30} color='gray' onClick={() => {
                setOpen0(!open0)
              }} />
              :
              <MdOutlineKeyboardArrowDown size={30} color='gray' onClick={() => {
                setOpen0(!open0)
              }} />
            }
          </CheckboxLabel>
          {open0 &&
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
            <p>{data[3].contents}</p>
          </ContentsWrap>
          }
        </CheckboxContainer>
      <LoginButton onClick={handleSignUp} disabled={!canSignUp}>
        Sign Up
      </LoginButton>
    </>
  );
}

export default Signup;
