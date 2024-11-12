import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import "../stylefile/Main.css";
import IconRe from "../Components/Recommend/IconRe";
import ListRe from "../Components/Recommend/ListRe";
import { readXlsxFile } from "../context/xlsxReader";

const ViewToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
`;

const ToggleButton = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin: 0 10px;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 40px;
`;

const SelectContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: left;
  margin: 20px 0px;
  padding-left: 40px;
  gap: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ selected }) => (selected ? "#ffffff" : "#192F40")};
  color: ${({ selected }) => (selected ? "black" : "white")};
  border: 1px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: #7f94a0;
    color: black;
  }
`;

const CheckboxContainer = styled.div`
  margin-top: 10px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding-bottom: 10px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  width: 70%;
  height: 80px;
  padding: 0px 30px;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  margin: 5px 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

const Top100 = styled.div`
  width: 70%;
  height: 80px;
  font-size: 50px;
  font-weight: bold;
  padding-left: 40px;
  display: flex;
  align-items: flex-end;
`;

const ApplyContainer = styled.div`
  display: flex;
`;

export default function Recommend() {
  const [viewMode, setViewMode] = useState("icon");
  const [openFilter, setOpenFilter] = useState("rank");
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 상태 추가

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await readXlsxFile(); // xlsxReader.js에서 파일 읽기
      setMovies(data); // 읽은 데이터를 상태로 저장
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // 페이지 1로 리셋

    if (openFilter === "rank") {
      setSelectedGenres([]); // 필터 변경 시 선택된 장르 초기화
      setSelectedRatings([]); // 선택된 관람등급도 초기화 (필요한 경우)
    }

    if (openFilter === "genre") {
      setSelectedGenres([]); // 필터 변경 시 선택된 장르 초기화
      setSelectedRatings([]); // 선택된 관람등급도 초기화 (필요한 경우)
    }

    if (openFilter === "rating") {
      setSelectedGenres([]); // 필터 변경 시 선택된 장르 초기화
      setSelectedRatings([]); // 선택된 관람등급도 초기화 (필요한 경우)
    }
  }, [openFilter]);

  const handleGenreSelect = (genre) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre); // 이미 선택된 장르는 삭제
      } else {
        return [...prev, genre]; // 선택되지 않은 장르는 추가
      }
    });
  };

  const handleRatingSelect = (rating) => {
    setSelectedRatings((prev) => {
      if (prev.includes(rating)) {
        return prev.filter((r) => r !== rating); // 이미 선택된 등급은 삭제
      } else {
        return [...prev, rating]; // 선택되지 않은 등급은 추가
      }
    });
  };

  // 선택한 장르와 관람등급에 맞는 영화 필터링
  const filteredMovies = movies.filter((movie) => {
    const movieGenres = movie.genre.split(",").map((g) => g.trim());
    const matchesGenres =
      selectedGenres.length === 0 ||
      selectedGenres.every((genre) => movieGenres.includes(genre));

    const matchesRatings =
      selectedRatings.length === 0 || selectedRatings.includes(movie.rating);

    return matchesGenres && matchesRatings;
  });

  const toggleFilter = (filterType) => {
    setOpenFilter(filterType); // 항상 하나의 필터만 선택되도록 설정
  };

  const handleIconClick = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="page">
      <Header />
      <TopContainer>
        <SelectContainer>
          <FilterContainer>
            <FilterButton
              onClick={() => toggleFilter("rank")}
              selected={openFilter === "rank"}
            >
              흥행순위
            </FilterButton>
            <FilterButton
              onClick={() => toggleFilter("genre")}
              selected={openFilter === "genre"}
            >
              장르별
            </FilterButton>
            <FilterButton
              onClick={() => toggleFilter("rating")}
              selected={openFilter === "rating"}
            >
              관람등급
            </FilterButton>
          </FilterContainer>

          <CheckboxContainer isOpen={openFilter === "rank"}>
            <Top100>영화 Top500</Top100>
          </CheckboxContainer>

          <CheckboxContainer isOpen={openFilter === "genre"}>
            <ApplyContainer>
              <CheckboxWrapper>
                {[
                  "드라마",
                  "액션",
                  "코메디",
                  "범죄",
                  "스릴러",
                  "미스터리",
                  "시대극/사극",
                  "전쟁",
                  "가족",
                  "멜로/로맨스",
                  "어드벤쳐",
                  "판타지",
                  "공포",
                  "스포츠",
                  "SF",
                  "느와르",
                  "반공/분단",
                  "첩보",
                  "인물",
                  "재난",
                  "전기",
                  "하이틴",
                  "역사",
                  "갱스터",
                  "사회물(경향)",
                  "뮤직",
                  "청춘",
                  "활극",
                  "동성애",
                  "뮤지컬",
                  "신파",
                  "무협",
                ].map((genre) => (
                  <CheckboxLabel key={genre}>
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreSelect(genre)}
                    />
                    {genre}
                  </CheckboxLabel>
                ))}
              </CheckboxWrapper>
            </ApplyContainer>
          </CheckboxContainer>

          <CheckboxContainer isOpen={openFilter === "rating"}>
            <ApplyContainer>
              <CheckboxWrapper>
                {[
                  "전체관람가",
                  "12세관람가",
                  "15세관람가",
                  "18세관람가(청소년관람불가)",
                ].map((rating) => (
                  <CheckboxLabel key={rating}>
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingSelect(rating)}
                    />
                    {rating}
                  </CheckboxLabel>
                ))}
              </CheckboxWrapper>
            </ApplyContainer>
          </CheckboxContainer>
        </SelectContainer>

        <ViewToggleContainer>
          <ToggleButton
            src={viewMode === "icon" ? "/Icon정렬선택.svg" : "/Icon정렬.svg"}
            alt="Icon View"
            onClick={() => handleIconClick("icon")}
          />
          <ToggleButton
            src={viewMode === "list" ? "/List정렬선택.svg" : "/List정렬.svg"}
            alt="List View"
            onClick={() => handleIconClick("list")}
          />
        </ViewToggleContainer>
      </TopContainer>
      <Divider />
      {viewMode === "icon" ? (
        <IconRe
          movies={filteredMovies}
          filterType={openFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <ListRe
          movies={filteredMovies}
          filterType={openFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
