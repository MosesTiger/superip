import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
  background-color: #EDF6F6;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #182e3f;
    color: white;
  `}
  
  &:hover {
    background-color: #ddd;
  }
`;

function StoryNav() {
  const location = useLocation();

  return (
    <Nav>
      <NavLink
        to="/createstory/select"
        isActive={location.pathname === '/createstory/select'}
      >
        영화 정보
      </NavLink>
      <NavLink
        to="/createstory/synopsis"
        isActive={location.pathname === '/createstory/synopsis'}
      >
        시놉시스 입력
      </NavLink>
      <NavLink
        to="/createstory/script"
        isActive={location.pathname === '/createstory/script'}
      >
        시나리오 생성
      </NavLink>
    </Nav>
  );
}

export default StoryNav;
