import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 4px;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: white;
`;

const Title = styled.h3`
  margin: 10px 0 5px;
  font-size: 18px;
  text-align: flex-start;
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Director = styled.p`
  font-size: 14px;
  color: white;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ selected }) => (selected ? "#0056b3" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const IconRe = ({ movies, filterType, currentPage, setCurrentPage }) => {
  const itemsPerPage = 16;
  const navigate = useNavigate();

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`); // 상세 페이지로 이동
  };

  return (
    <>
      <IconGrid>
        {selectedMovies.map((movie, index) => (
          <IconItem key={index} onClick={() => handleMovieClick(movie.id)}>
            <Poster src={movie.poster} alt={`${movie.title} poster`} />
            <Section>
              <Title>{movie.title}</Title>
              <Director>감독: {movie.director}</Director>
            </Section>
          </IconItem>
        ))}
      </IconGrid>

      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </PageButton>
        <span>
          {currentPage} / {totalPages}
        </span>
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </PageButton>
      </PaginationContainer>
    </>
  );
};

export default IconRe;
