import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  background-color: none;
  border: 1px solid white;
  padding: 10px;
  cursor: pointer; /* 클릭 가능하도록 설정 */
  transition: background-color 0.3s, transform 0.3s; /* hover 효과 추가 */

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* hover 시 배경색 변경 */
    transform: scale(1.05); /* hover 시 살짝 확대 */
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
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
  white-space: nowrap; /* 한 줄로 고정 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분은 ...으로 표시 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */

  ${IconItem}:hover & {
    white-space: normal; /* hover 시 제목이 줄바꿈되게 함 */
    overflow: visible; /* hover 시 제목을 모두 보이게 */
    text-overflow: unset; /* ellipsis 해제 */
  }
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
  const navigate = useNavigate();

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // IconItem 클릭 시 영화 세부 정보로 이동하는 함수
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // 해당 영화의 정보 페이지로 이동
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
