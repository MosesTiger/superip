import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LinkButton = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 25px;
  cursor: pointer; /* 커서가 포인터로 변경 */
  font-family: "조선굴림체";

  &:hover {
    text-decoration: underline;
    cursor: pointer; /* hover 시에도 커서가 포인터로 유지 */
  }
`;

const NavbarContainer = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 0;
  gap: 130px;
  padding-right: 30px;
`;

function Navbar() {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    // MyPage로 이동하면서 settings 메뉴를 선택하도록 상태 전달
    navigate("/mypage", { state: { selectedMenu: "settings" } });
  };

  return (
    <NavbarContainer>
      <LinkButton to="/info/How">HOW</LinkButton>
      <LinkButton to="/info/QnA">Q&A</LinkButton>
      <LinkButton to="/info/FAQ">FAQ</LinkButton>
      <LinkButton as="div" onClick={handleSettingsClick}>
        SETTING
      </LinkButton>
    </NavbarContainer>
  );
}

export default Navbar;
