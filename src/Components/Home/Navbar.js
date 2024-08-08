import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkButton = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 25px;
  margin-right: 80px;
  &:hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  return (
    <nav className="nav-bar">
      <LinkButton to="/How">How</LinkButton>
      <LinkButton to="/QnA">QnA</LinkButton>
      <LinkButton to="/ToS">ToS</LinkButton>
      <LinkButton to="/Setting">Setting</LinkButton>
    </nav>
  );
}

export default Navbar;
