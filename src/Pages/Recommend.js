import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import "../stylefile/Main.css";
import IconRe from "../Components/Recommend/IconRe";
import ListRe from "../Components/Recommend/ListRe";
import axios from "axios";

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
  flex-wrap: wrap; /* 줄바꿈을 위한 flex-wrap */
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

const SortContainer = styled.div`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  justify-content: flex-end;
  margin-right: 40px;
  margin-bottom: 10px;
`;

const SortSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-right: 10px;
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #004080;
  }
`;

const movies = [
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  { poster: "poster1.jpg", title: "영화 1", director: "감독 1" },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2" },
  // 더 많은 영화 데이터
];

export default function Recommend() {
  const [viewMode, setViewMode] = useState("icon");
  const [openFilter, setOpenFilter] = useState("rank");
  const [sortOption, setSortOption] = useState("titleAsc");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // "장르별" 또는 "관람등급"일 때만 정렬 옵션이 보이게 함
  const isSortVisible = openFilter === "genre" || openFilter === "rating";

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
            <Top100>영화 Top100</Top100>
          </CheckboxContainer>

          <CheckboxContainer isOpen={openFilter === "genre"}>
            <CheckboxWrapper>
              <CheckboxLabel>
                <input type="checkbox" />
                드라마
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                액션
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 코메디
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 범죄
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 스릴러
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 미스터리
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 시대극/사극
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 전쟁
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 가족
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 멜로/로맨스
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 어드벤쳐
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 판타지
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 공포
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 스포츠
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> SF
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 느와르
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 반공/분단
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 첩보
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 인물
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 재난
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 전기
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 하이틴
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 역사
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 갱스터
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 사회물(경향)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 뮤직
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 청춘
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 활극
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 동성애
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 뮤지컬
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 신파
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 무협
              </CheckboxLabel>
            </CheckboxWrapper>
          </CheckboxContainer>

          <CheckboxContainer isOpen={openFilter === "rating"}>
            <CheckboxWrapper>
              <CheckboxLabel>
                <input type="checkbox" />
                전체 이용가
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 12세 이용가
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 15세 이용가
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" /> 19세 이용가(청소년관람불가)
              </CheckboxLabel>
            </CheckboxWrapper>
          </CheckboxContainer>
        </SelectContainer>
        <ApplyButton>적용</ApplyButton>
        <SortContainer isVisible={isSortVisible}>
          <Label>정렬:</Label>
          <SortSelect value={sortOption} onChange={handleSortChange}>
            <option value="titleAsc">제목순 (오름차순)</option>
            <option value="titleDesc">제목순 (내림차순)</option>
            <option value="yearAsc">제작년도순 (오름차순)</option>
            <option value="yearDesc">제작년도순 (내림차순)</option>
          </SortSelect>
        </SortContainer>

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
      <Divider /> {/* 가로줄 추가 */}
      {viewMode === "icon" ? (
        <IconRe
          movies={movies}
          filterType={openFilter}
          sortOption={sortOption}
        />
      ) : (
        <ListRe
          movies={movies}
          filterType={openFilter}
          sortOption={sortOption}
        />
      )}
    </div>
  );
}
