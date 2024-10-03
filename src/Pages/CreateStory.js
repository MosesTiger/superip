import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import StoryNav from "../Components/CreateStory/StoryNav";
import "../stylefile/Main.css";

const Main = styled.main`
  width: 95%;
  height: 100%;
  border-radius: 10px;
  border-top-left-radius: 0px;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding: 0 24px;
  box-sizing: border-box;
  color: black;
`;

const MainWrapper = styled.div`
  padding: 10px;
  padding-top: 0px;
  margin-top: 20px;
`;

function CreateStory() {
  const location = useLocation();
  const hideStoryNav =
    location.pathname === "/create/show" ||
    location.pathname === "/create/predict";
  return (
    <div className="page">
      <Header />
      <MainWrapper>
        {!hideStoryNav && <StoryNav />}
        <Main>
          <Outlet />
        </Main>
      </MainWrapper>
    </div>
  );
}

export default CreateStory;
