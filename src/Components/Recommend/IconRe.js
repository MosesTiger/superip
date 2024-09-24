import React, { useState } from "react";
import styled from "styled-components";

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 가로로 최대 4개 */
  gap: 20px;
  padding: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 화면 크기가 줄어들면 3개 */
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr); /* 더 줄어들면 2개 */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 더 줄어들면 1개 */
  }
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  max-width: 150px;
  border-radius: 4px;
`;

const Title = styled.h3`
  margin: 10px 0 5px;
  font-size: 18px;
  text-align: center;
`;

const Director = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${({ selected }) => (selected ? "#0056b3" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const IconRe = ({ movies, filterType, sortOption }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <IconGrid>
        {selectedMovies.map((movie, index) => (
          <IconItem key={index}>
            <Poster src={movie.poster} alt={`${movie.title} poster`} />
            <Title>{movie.title}</Title>
            <Director>감독: {movie.director}</Director>
          </IconItem>
        ))}
      </IconGrid>
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            selected={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </>
  );
};

export default IconRe;
