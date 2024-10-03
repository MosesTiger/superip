import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  color: black;
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})`
  text-decoration: none;
  width: 100px;
  text-align: center;
  color: black;
  margin-right: 10px;
  padding: 10px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: background-color 0.3s ease;
  background-color: ${({ isActive }) => (isActive ? "#f5f5f5" : "#5D5D5D")};

  &:hover {
    background-color: #999;
  }
`;

const NavLinkWrap = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
`;

function StoryNav() {
  const location = useLocation();

  return (
    <Nav>
      <NavLinkWrap>
        <NavLink
          to="/create/select"
          isActive={location.pathname === "/create/select"}
        >
          영화 정보
        </NavLink>
        <NavLink
          to="/create/synopsis"
          isActive={location.pathname === "/create/synopsis"}
        >
          시놉시스
        </NavLink>
        <NavLink
          to="/create/script"
          isActive={location.pathname === "/create/script"}
        >
          시나리오
        </NavLink>
      </NavLinkWrap>
    </Nav>
  );
}

export default StoryNav;
