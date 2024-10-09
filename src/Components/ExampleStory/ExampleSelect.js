import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 100%;
  margin: 0;
  font-size: 16px;
  color: #000;
  position: relative;
  height: auto;
`;

const TitleInput = styled.div`
  width: 100%;
  border: 0;
  background-color: #f5f5f5;
  border: 1px solid #cdcdcd;
  height: 45px;
  border-radius: 4px;
  padding: 8px 16px;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 20px;
  min-width: 250px;
  z-index: 3;
  margin: 10px 0;

  &::placeholder {
    color: #53606a;
  }
`;

const GenreSelection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #000;
  margin-top: -5px;
`;

const GenreOption = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? "#e23a3a" : "#cdcdcd")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  cursor: pointer;

  &:hover {
    background-color: #e23a3a;
    color: #fff;
  }
  &:active {
    background-color: #be3232;
    color: #fff;
  }
`;

const GenreLabel = styled.div`
  font-weight: 500;
  text-align: center;
`;

const Label = styled.div`
  font-size: 16px;
  color: #000;
  margin: -5px 0;
`;

const DurationSelection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 268px;
  border-radius: 4px;
  background-color: #f5f5f5;
  border: 1px solid #cdcdcd;
  padding: 8px;
  gap: 5px;
  margin: 10px 0;
  margin-top: -5px;
`;

const DurationInput = styled.input`
  width: 100px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 5px;
  font-size: 20px;
  text-align: center;
`;

const Select1 = styled.select`
  width: 268px;
  height: 45px;
  border-radius: 4px;
  background-color: #f5f5f5;
  border: 1px solid #cdcdcd;
  padding: 8px;
  font-size: 16px;
  color: #000;
  margin: 10px 0;
  margin-top: -5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin: 10px 0;
  padding-bottom: 10px;
  margin-bottom: 20px;
  margin-top: -5px;
`;

const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  margin: 0;
  accent-color: ${(props) => (props.checked ? "#E23A3A" : "#859AA5")};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 22px;
  bottom: 20px;
  margin: 15px 0;
`;

const PredictionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  padding: 20px;
  border: none;
  border-radius: 10px;
  background-color: #e23a3a;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #be3232;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid #ccc;
`;

const PlusMinusButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #f5f5f5;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ExampleSelect() {
  return (
    <Section>
      <MovieDetails>
        <Label>
          영화 제목
          <TitleInput></TitleInput>
        </Label>
        <Label>장르</Label>
        <GenreSelection>
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
            <GenreOption key={genre} selected={selectedGenres.includes(genre)}>
              <GenreLabel>{genre}</GenreLabel>
            </GenreOption>
          ))}
        </GenreSelection>
        <Label>상영 시간</Label>
        <DurationSelection>
          <PlusMinusButton onClick={decreaseDuration}>-</PlusMinusButton>
          <DurationInput
            type="number"
            value={duration}
            readOnly // 읽기 전용으로 설정하여 사용자가 직접 수정할 수 없게 함
          />
          <PlusMinusButton onClick={increaseDuration}>+</PlusMinusButton>
        </DurationSelection>
        <Label>관람 등급</Label>
        <Select1 value={rating}>
          <option value="all">전체 관람가</option>
          <option value="12">12세 관람가</option>
          <option value="15">15세 관람가</option>
          <option value="19">19세 관람가</option>
        </Select1>
        <Label>영화의 배경 국가</Label>
        <Select1 value={country}>
          <option value="korea">한국</option>
          <option value="china">중국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
          <option value="japan">일본</option>
          <option value="france">프랑스</option>
          <option value="germany">독일</option>
          <option value="india">인도</option>
          <option value="brazil">브라질</option>
          <option value="australia">호주</option>
          <option value="canada">캐나다</option>
          <option value="mexico">멕시코</option>
          <option value="italy">이탈리아</option>
          <option value="spain">스페인</option>
          <option value="netherlands">네덜란드</option>
          <option value="sweden">스웨덴</option>
          <option value="norway">노르웨이</option>
          <option value="denmark">덴마크</option>
          <option value="austria">오스트리아</option>
          <option value="switzerland">스위스</option>
          <option value="poland">폴란드</option>
          <option value="portugal">포르투갈</option>
        </Select1>
        <Label>메인 주인공의 성별</Label>
        <Select1 value={mainCharacterGender}>
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="mixed">혼성</option>
        </Select1>
        <CheckboxContainer>
          <Checkbox type="checkbox" checked={isCheckboxChecked} />
          <Label>시리즈물 여부</Label>
        </CheckboxContainer>
      </MovieDetails>
    </Section>
  );
}

export default ExampleSelect;
