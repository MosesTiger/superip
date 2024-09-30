import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import "../stylefile/Main.css";

const ResultsSection = styled.div`
  font-family: Arial, sans-serif;
  padding: 40px;
  margin: 0 auto;
  width: 80%;
`;

const ResultCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #929292;
  }
`;

const ResultImage = styled.img`
  width: 120px;
  height: 180px;
  margin-right: 20px;
  object-fit: cover;
  border-radius: 4px;
`;

const ResultDetails = styled.div`
  h2 {
    margin: 0;
    font-size: 20px;
    color: black;
    font-weight: bold;
    cursor: pointer;
  }

  p {
    margin: 5px 0;
    color: #555;
  }
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: 1px solid #ddd;
  width: 100%;
`;

const SelectContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
`;

const Select = styled.select`
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  background: transparent;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  option {
    color: black;
    background: transparent;
    font-size: 16px;

    &:hover {
      background-color: #929292;
    }
  }
`;

const Title = styled.h1`
  font-size: 40px;
`;

export default function Search() {
  const navigate = useNavigate();
  const results = [
    { id: 1, title: "괴물", year: 2006, director: "봉준호", rating: "12세 이용가", image: "https://example.com/monster.jpg" },
    { id: 2, title: "마더", year: 2009, director: "봉준호", rating: "청소년 관람불가", image: "https://example.com/mother.jpg" },
    { id: 3, title: "기생충", year: 2019, director: "봉준호", rating: "15세 이용가", image: "https://example.com/parasite.jpg" }
  ];

  const handleTitleClick = (id) => {
    navigate(`/detail/${id}`); 
  };

  return (
    <div className="page">
      <Header />
      <ResultsSection>
        <Title>검색결과</Title>
        <Divider />
        <SelectContainer>
          <Select defaultValue="newest">
            <option value="newest">제작년도순</option>
            <option value="ascending">오름차순</option>
            <option value="descending">내림차순</option>
          </Select>
        </SelectContainer>
        {results.map((result) => (
          <ResultCard key={result.id} onClick={() => handleTitleClick(result.id)}>
            <ResultImage src={result.image} alt={result.title} />
            <ResultDetails>
              <h2 onClick={() => handleTitleClick(result.id)}>{result.title}</h2>
              <p>{result.year}, {result.rating}</p>
              <p>감독: {result.director}</p>
            </ResultDetails>
          </ResultCard>
        ))}
      </ResultsSection>
    </div>
  );
}
