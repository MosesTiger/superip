import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import { useNavigate, useLocation } from "react-router-dom";
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
  background-color: #1e1e1e;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  option {
    color: black;
    background: white;
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
  const location = useLocation();
  const { results = [] } = location.state || { results: [] };

  const [sortOption, setSortOption] = useState("newest");
  const [sortedResults, setSortedResults] = useState([...results]);

  useEffect(() => {
    let sortedArray = [...results];
    if (sortOption === "newest") {
      sortedArray.sort((a, b) => new Date(b.year) - new Date(a.year));
    } else if (sortOption === "ascending") {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "descending") {
      sortedArray.sort((a, b) => b.title.localeCompare(a.title));
    }
    setSortedResults(sortedArray);
  }, [sortOption, results]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleTitleClick = (movie, index) => {
    const movieId = movie.id || index; // 영화에 id가 없을 경우 index 사용
    navigate(`/detail/${movieId}`, { state: { movie } });
  };

  return (
    <div className="page">
      <Header />
      <ResultsSection>
        <Title>검색결과</Title>
        <Divider />
        <SelectContainer>
          <Select value={sortOption} onChange={handleSortChange}>
            <option value="newest">제작년도순</option>
            <option value="ascending">제목순 (오름차순)</option>
            <option value="descending">제목순 (내림차순)</option>
          </Select>
        </SelectContainer>
        {sortedResults.map((result, index) => (
          <ResultCard
            key={index}
            onClick={() => handleTitleClick(result, index)}
          >
            <ResultImage src={result.poster} alt={result.title} />
            <ResultDetails>
              <h2>{result.title}</h2>
              <p>
                {result.year}, {result.rating}
              </p>
              <p>감독: {result.director}</p>
            </ResultDetails>
          </ResultCard>
        ))}
      </ResultsSection>
    </div>
  );
}
