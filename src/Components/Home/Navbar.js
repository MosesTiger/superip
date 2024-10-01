import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LinkButton = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 25px;
  margin-right: 80px;
  cursor: pointer; /* 커서가 포인터로 변경 */

  &:hover {
    text-decoration: underline;
    cursor: pointer; /* hover 시에도 커서가 포인터로 유지 */
  }
`;

function Navbar() {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    // MyPage로 이동하면서 settings 메뉴를 선택하도록 상태 전달
    navigate("/mypage", { state: { selectedMenu: "settings" } });
  };

  return (
    <nav className="nav-bar">
      <LinkButton to="/info/How">How</LinkButton>
      <LinkButton to="/info/QnA">QnA</LinkButton>
      <LinkButton to="/info/FAQ">FAQ</LinkButton>
      <LinkButton as="div" onClick={handleSettingsClick}>
        Setting
      </LinkButton>
    </nav>
  );
}

export default Navbar;
