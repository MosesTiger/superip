import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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

function ExampleNav() {
  const location = useLocation();
  const { id } = useParams();

  return (
    <Nav>
      <NavLinkWrap>
        <NavLink
          to={`/example/${id}/select`}
          isActive={location.pathname === `/example/${id}/select`}
        >
          영화 정보
        </NavLink>
        <NavLink
          to={`/example/${id}/synopsis`}
          isActive={location.pathname === `/example/${id}/synopsis`}
        >
          시놉시스
        </NavLink>
        <NavLink
          to={`/example/${id}/script`}
          isActive={location.pathname === `/example/${id}/script`}
        >
          시나리오
        </NavLink>
      </NavLinkWrap>
    </Nav>
  );
}

export default ExampleNav;