import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Components/Header';
import StoryNav from '../Components/CreateStory/StoryNav';
import "../stylefile/Main.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #182e3f;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
  gap: 20px;
  line-height: normal;
  text-align: center;
  font-size: 16px;
  color: #000;
  font-family: 'Poppins', sans-serif;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 12px 12px;
  }
`;

const Main = styled.main`
  width: calc(100% - 48px);
  height: calc(100% - 80px);
  border-radius: 4px;
  background-color: #EDF6F6;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding: 0 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(100% - 24px);
    height: calc(100% - 60px);
    margin: 15px auto;
    padding: 0 12px;
  }
`;


const HeaderButton = styled(Link)`
  text-align: center;
  text-decoration: none;
  color: #000;
  padding: 10px;
  cursor: pointer;
  margin: 0 15px;

  &:hover {
    background-color: #ddd;
  }
`;

const SaveButton = styled.button`
  background-color: #859AA5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #6f8a9e;
  }
`;

const MainWrapper = styled.div`
  padding:10px;
  padding-top:0px;
  margin:0;
`

function CreateStory() {
  return (
    <div className="page">
      <Header/>
      <MainWrapper>
        <StoryNav/>
        <Main> 
            <div>
            <HeaderButton to="select">영화 정보</HeaderButton>
            <HeaderButton to="synopsis">시놉시스</HeaderButton>
            <HeaderButton to="script">시나리오</HeaderButton>
            </div>
            <SaveButton>저장</SaveButton>
            <Outlet />
        </Main>
      </MainWrapper>
    </div>
  );
}

export default CreateStory;
