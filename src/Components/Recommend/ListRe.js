import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 중앙 정렬 */
  padding: 10px 60px;
  border-bottom: 2px solid #ccc;
  font-weight: bold;
  background-color: #f0f0f0;
  color: black;
`;

const HeaderItem = styled.div`
  flex: ${(props) => props.flex || 1};
  text-align: center; /* 중앙 정렬 */
  font-size: 20px;
  padding: 5px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 60px;
  border-bottom: 1px solid #ccc;
  cursor: pointer; /* 클릭 가능하게 설정 */
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* hover 시 배경색 변경 */
    transform: scale(1.02); /* hover 시 살짝 확대 */
  }
`;

const Number = styled.div`
  flex: 0.5;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 60px;
`;

const Title = styled.div`
  flex: 2;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 기본적으로 제목이 잘림 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */

  ${ListItem}:hover & {
    overflow: visible; /* hover 시 제목을 모두 보이게 */
    white-space: normal; /* 제목이 줄바꿈될 수 있게 함 */
    text-overflow: unset; /* ellipsis 해제 */
  }
`;

const Director = styled.div`
  flex: 1;
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
`;

const Year = styled.div`
  flex: 1;
  font-size: 16px;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
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

const ListRe = ({ movies, filterType, currentPage, setCurrentPage }) => {
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ListItem 클릭 시 영화 세부 정보로 이동하는 함수
  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`); // 해당 영화의 정보 페이지로 이동
  };

  return (
    <>
      <ListContainer>
        <ListHeader>
          {filterType === "rank" && <HeaderItem flex="0.5">No.</HeaderItem>}
          <HeaderItem flex="2">Title</HeaderItem>
          <HeaderItem flex="1">Director</HeaderItem>
          <HeaderItem flex="1">Year of release</HeaderItem>
        </ListHeader>
        {selectedMovies.map((movie, index) => (
          <ListItem key={index} onClick={() => handleMovieClick(movie.id)}>
            {filterType === "rank" && <Number>{startIndex + index + 1}</Number>}
            <Title>{movie.title}</Title>
            <Director>{movie.director}</Director>
            <Year>{movie.year}</Year>
          </ListItem>
        ))}
      </ListContainer>

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

export default ListRe;
