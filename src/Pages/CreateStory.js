import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Components/Header';
import StoryNav from '../Components/CreateStory/StoryNav';
import "../stylefile/Main.css";

const Main = styled.main`
  width: 95%;
  height: 100%;
  border-radius: 10px;
  border-top-left-radius: 0px;
  background-color: #EDF6F6;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding: 0 24px;
  box-sizing: border-box;
  color:black;
`;

const MainWrapper = styled.div`
  padding:10px;
  padding-top:0px;
  margin-top:20px;
`

function CreateStory() {
  return (
    <div className="page">
      <Header/>
      <MainWrapper>
        <StoryNav/>
        <Main> 
            <Outlet />
        </Main>
      </MainWrapper>
    </div>
  );
}

export default CreateStory;
