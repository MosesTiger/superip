import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import '../stylefile/Main.css';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #182E3F;
`;

const Sidebar = styled.div`
  width: 220px; /* 사이드바 너비를 늘려서 왼쪽 여백을 더 많이 확보 */
  background-color: #EDF6F6;
  display: flex;
  flex-direction: column;
  padding: 20px; /* 사이드바 내 여백 조정 */
  color: black;
  border-radius: 15px;
  margin: 50px;
`;

const MenuItem = styled.div`
  margin: 10px 0; /* 위아래 여백 조정 */
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#182E3F' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  padding: 20px; /* 패딩을 늘려서 세로 폭을 증가 */
  width: 100%; /* 사이드바 너비에 맞추기 */
  border-radius: 5px;
  box-sizing: border-box; /* 패딩을 너비에 포함시킴 */
  display: flex;
  align-items: center;

  &:hover {
    background-color: #95A4AD;
    color: white;
  }

  & img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState('profile');
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    navigate(`/mypage/${menu}`); // 클릭 시 해당 경로로 이동
  };

  return (
    <div className="page">
      <Header />
      <Container>
        <Sidebar>
          <MenuItem
            active={selectedMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            <img src="/mypage0.png" alt="Profile" />
            프로필
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'scenario'}
            onClick={() => handleMenuClick('scenario')}
          >
            <img src="/mypage2.png" alt="Scenario" />
            시나리오 보관함
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'settings'}
            onClick={() => handleMenuClick('settings')}
          >
            <img src="/mypage3.png" alt="Settings" />
            설정
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'help'}
            onClick={() => handleMenuClick('help')}
          >
            <img src="/mypage4.png" alt="Help" />
            고객센터
          </MenuItem>
        </Sidebar>
        <div style={{ flex: 1, padding: '20px', margin: '50px', marginLeft: '-10px', borderRadius: '15px', backgroundColor: '#ECF0F1' }}>
          <Outlet />
        </div>
      </Container>
    </div>
  );
}
