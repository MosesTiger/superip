import React, { useState } from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Number = styled.div`
  width: 50px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const Title = styled.div`
  flex: 2;
  font-size: 18px;
`;

const Director = styled.div`
  flex: 1;
  font-size: 16px;
  color: #666;
`;

const Year = styled.div`
  flex: 1;
  font-size: 16px;
  color: #999;
  text-align: right;
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

const ListRe = ({ movies, filterType, sortOption }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ListContainer>
        {selectedMovies.map((movie, index) => (
          <ListItem key={index}>
            {/* 흥행순위일 때만 넘버 표시 */}
            {filterType === "rank" && <Number>{startIndex + index + 1}</Number>}
            <Title>{movie.title}</Title>
            <Director>감독: {movie.director}</Director>
            <Year>제작년도: {movie.year}</Year>
          </ListItem>
        ))}
      </ListContainer>

      {/* 페이지네이션 */}
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

export default ListRe;
