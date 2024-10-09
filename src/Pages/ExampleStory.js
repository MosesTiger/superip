import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import ExampleNav from "../Components/ExampleStory/ExampleNav";
import { exampleData } from "../Components/ExampleStory/exampleData";
import "../stylefile/Main.css";

const Main = styled.main`
  width: 95%;
  height: 100%;
  border-radius: 10px;
  border-top-left-radius: 0px;
  background-color: #f5f5f5;
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

function ExampleStory() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    // 해당 id의 데이터를 찾아 설정합니다.
    const story = exampleData.find((item) => item.id === parseInt(id));
    if (story) {
      setMovieData(story);
    }
  }, [id]);

  return (
    <div className="page">
      <Header />
      <MainWrapper>
        <ExampleNav />
        <Main>
          <Outlet context={{ movieData, setMovieData }} />
        </Main>
      </MainWrapper>
    </div>
  );
}

export default ExampleStory;
