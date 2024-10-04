import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import Profile from "../Components/Mypage/Profile";
import Scenario from "../Components/Mypage/Scenario";
import Settings from "../Components/Mypage/Settings";
import Help from "../Components/Mypage/Help";
import "../stylefile/Main.css";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
`;

const Sidebar = styled.div`
  width: 220px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: black;
  border-radius: 15px;
  margin: 50px;
`;

const MenuItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#1e1e1e" : "transparent")};
  color: ${(props) => (props.active ? "white" : "black")};
  padding: 20px;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #cdcdcd;
    color: white;

    & img {
      content: url(${(props) =>
        `/mypage${props.menu}_select.png`}); /* hover 이미지 변경 */
    }
  }

  & img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    content: url(${(props) =>
      props.active
        ? `/mypage${props.menu}_select.png` /* 클릭 시 활성화 이미지 */
        : `/mypage${props.menu}.png`}); /* 기본 이미지 */
  }
`;

const Item = styled.div`
  flex: 1;
  padding: 20px 50px;
  margin: 50px;
  margin-left: -10px;
  border-radius: 15px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: black;
`;

export default function MyPage() {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("profile");

  useEffect(() => {
    if (location.state && location.state.selectedMenu) {
      setSelectedMenu(location.state.selectedMenu);
    }
  }, [location.state]);

  const getTitle = () => {
    switch (selectedMenu) {
      case "profile":
        return "나의 정보";
      case "scenario":
        return "시나리오 보관함";
      case "settings":
        return "설정";
      case "help":
        return "고객센터";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "profile":
        return <Profile />;
      case "scenario":
        return <Scenario />;
      case "settings":
        return <Settings />;
      case "help":
        return <Help />;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Header />
      <Container>
        <Sidebar>
          <MenuItem
            active={selectedMenu === "profile"}
            onClick={() => setSelectedMenu("profile")}
            menu="profile"
          >
            <img alt="Profile" />
            프로필
          </MenuItem>
          <MenuItem
            active={selectedMenu === "scenario"}
            onClick={() => setSelectedMenu("scenario")}
            menu="scenario"
          >
            <img alt="Scenario" />
            시나리오 보관함
          </MenuItem>
          <MenuItem
            active={selectedMenu === "settings"}
            onClick={() => setSelectedMenu("settings")}
            menu="settings"
          >
            <img alt="Settings" />
            설정
          </MenuItem>
          <MenuItem
            active={selectedMenu === "help"}
            onClick={() => setSelectedMenu("help")}
            menu="help"
          >
            <img alt="Help" />
            고객센터
          </MenuItem>
        </Sidebar>
        <Item>
          <Title>{getTitle()}</Title>
          {renderContent()}
        </Item>
      </Container>
    </div>
  );
}
