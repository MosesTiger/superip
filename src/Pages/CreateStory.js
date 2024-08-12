import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

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
  margin: 30px auto;
  padding: 0 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(100% - 24px);
    height: calc(100% - 60px);
    margin: 15px auto;
    padding: 0 12px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid #ccc;
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

function CreateStory() {
  return (
    <Container>
      <Main>
        <Header>
          <div>
            <HeaderButton to="movie">영화 정보</HeaderButton>
            <HeaderButton to="synopsis">시놉시스</HeaderButton>
            <HeaderButton to="script">시나리오</HeaderButton>
          </div>
          <SaveButton>저장</SaveButton>
        </Header>
        <Outlet />
      </Main>
    </Container>
  );
}

export default CreateStory;
