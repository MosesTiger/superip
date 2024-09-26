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

const ApplyContainer = styled.div`
  display: flex;
`;

const ApplyButton = styled.button`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin-top: 30px;
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
  {
    poster: "poster1.jpg",
    title:
      "졸라게 긴 영화 제목인데 그냥 한번 졸라 길게 해봣음 길면 어떻게 되나 볼려고",
    director: "감독 1",
    year: 2020,
  },
  { poster: "poster2.jpg", title: "영화 2", director: "감독 2", year: 2021 },
  {
    poster: "poster3.jpg",
    title: "모험의 시작",
    director: "감독 3",
    year: 2019,
  },
  {
    poster: "poster4.jpg",
    title: "사랑과 전쟁",
    director: "감독 4",
    year: 2018,
  },
  {
    poster: "poster5.jpg",
    title: "스릴러 나이트",
    director: "감독 5",
    year: 2022,
  },
  {
    poster: "poster6.jpg",
    title: "판타지 월드",
    director: "감독 6",
    year: 2017,
  },
  {
    poster: "poster7.jpg",
    title: "미스터리 저택",
    director: "감독 7",
    year: 2023,
  },
  {
    poster: "poster8.jpg",
    title: "범죄의 추격자",
    director: "감독 8",
    year: 2016,
  },
  {
    poster: "poster9.jpg",
    title: "우정의 약속",
    director: "감독 9",
    year: 2020,
  },
  {
    poster: "poster10.jpg",
    title: "시간 여행자",
    director: "감독 10",
    year: 2021,
  },
  {
    poster: "poster11.jpg",
    title: "끝없는 사랑",
    director: "감독 11",
    year: 2019,
  },
  {
    poster: "poster12.jpg",
    title: "영웅의 귀환",
    director: "감독 12",
    year: 2018,
  },
  {
    poster: "poster13.jpg",
    title: "어드벤처 타임",
    director: "감독 13",
    year: 2022,
  },
  {
    poster: "poster14.jpg",
    title: "어둠의 그림자",
    director: "감독 14",
    year: 2017,
  },
  {
    poster: "poster15.jpg",
    title: "꿈의 도시",
    director: "감독 15",
    year: 2023,
  },
  { poster: "poster16.jpg", title: "추격자", director: "감독 16", year: 2016 },
  {
    poster: "poster17.jpg",
    title: "비밀의 정원",
    director: "감독 17",
    year: 2020,
  },
  {
    poster: "poster18.jpg",
    title: "우주의 전쟁",
    director: "감독 18",
    year: 2021,
  },
  {
    poster: "poster19.jpg",
    title: "절벽 끝에서",
    director: "감독 19",
    year: 2019,
  },
  {
    poster: "poster20.jpg",
    title: "미래의 선택",
    director: "감독 20",
    year: 2018,
  },
  {
    poster: "poster21.jpg",
    title: "시공간 여행자",
    director: "감독 21",
    year: 2022,
  },
  {
    poster: "poster22.jpg",
    title: "하늘을 걷는 자",
    director: "감독 22",
    year: 2017,
  },
  {
    poster: "poster23.jpg",
    title: "심연의 발견",
    director: "감독 23",
    year: 2023,
  },
  {
    poster: "poster24.jpg",
    title: "빛과 그림자",
    director: "감독 24",
    year: 2016,
  },
  {
    poster: "poster25.jpg",
    title: "전쟁의 서막",
    director: "감독 25",
    year: 2020,
  },
  {
    poster: "poster26.jpg",
    title: "폭풍의 눈",
    director: "감독 26",
    year: 2021,
  },
  {
    poster: "poster27.jpg",
    title: "시간의 주인",
    director: "감독 27",
    year: 2019,
  },
  {
    poster: "poster28.jpg",
    title: "불멸의 전사",
    director: "감독 28",
    year: 2018,
  },
  {
    poster: "poster29.jpg",
    title: "사막의 모래바람",
    director: "감독 29",
    year: 2022,
  },
  {
    poster: "poster30.jpg",
    title: "바다의 속삭임",
    director: "감독 30",
    year: 2017,
  },
  {
    poster: "poster31.jpg",
    title: "얼음의 왕국",
    director: "감독 31",
    year: 2023,
  },
  { poster: "poster32.jpg", title: "불의 검", director: "감독 32", year: 2016 },
  {
    poster: "poster33.jpg",
    title: "영웅의 전설",
    director: "감독 33",
    year: 2020,
  },
  {
    poster: "poster34.jpg",
    title: "별의 전쟁",
    director: "감독 34",
    year: 2021,
  },
  {
    poster: "poster35.jpg",
    title: "심판의 날",
    director: "감독 35",
    year: 2019,
  },
  {
    poster: "poster36.jpg",
    title: "희망의 끝에서",
    director: "감독 36",
    year: 2018,
  },
  {
    poster: "poster37.jpg",
    title: "바람과 함께",
    director: "감독 37",
    year: 2022,
  },
  {
    poster: "poster38.jpg",
    title: "대지의 소리",
    director: "감독 38",
    year: 2017,
  },
  {
    poster: "poster39.jpg",
    title: "심해의 비밀",
    director: "감독 39",
    year: 2023,
  },
  {
    poster: "poster40.jpg",
    title: "용사의 길",
    director: "감독 40",
    year: 2016,
  },
  // 더 많은 영화 데이터 추가 가능
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
            <ApplyContainer>
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
              <ApplyButton>적용</ApplyButton>
            </ApplyContainer>
          </CheckboxContainer>

          <CheckboxContainer isOpen={openFilter === "rating"}>
            <ApplyContainer>
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
              <ApplyButton>적용</ApplyButton>
            </ApplyContainer>
          </CheckboxContainer>
        </SelectContainer>
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
