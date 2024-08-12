import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 100%;
  font-size: 16px;
  color: #000; /* 글자 색상 */
  font-family: 'Poppins', sans-serif;
  position: relative; /* 액션 버튼을 하단에 위치시키기 위한 설정 */
  height: auto; /* 또는 적절한 고정 값으로 설정 */
`;

const TitleInput = styled.input`
  width: 100%;
  border: 0;
  background-color: #859AA5;
  height: 45px;
  border-radius: 4px;
  padding: 8px 16px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  min-width: 250px;
  z-index: 3;
  margin: 15px 0; /* 마진 업데이트 */

  &::placeholder {
    color: white; /* Placeholder 텍스트 색상 흰색 */
  }
`;

const GenreSelection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #859AA5; /* 배경 색상 */
  color: #000; /* 글자 색상 */
  margin-bottom: 20px; /* 마진 업데이트 */
  margin-top: -5px;
`;

const GenreOption = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? "#dc143c" : "#d3d3d3")}; /* 선택된 경우 빨간색, 그렇지 않으면 회색 */
  color: ${(props) => (props.selected ? "#fff" : "#000")}; /* 글자 색상 */
  cursor: pointer;

  &:hover {
    background-color: #dc143c; /* 호버 시 빨간색 */
    color: #fff; /* 글자 색상 */
  }
`;

const GenreLabel = styled.div`
  font-weight: 500;
  text-align: center; /* 가운데 정렬 */
`;

const Label = styled.div`
  font-size: 16px;
  color: #000; /* 글자 색상 */
  margin: -5px 0; /* 위쪽 마진을 약간 띄우고 나머지는 0으로 설정 */
`;

const DurationSelection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 268px;
  height: 45px;
  border-radius: 4px;
  background-color: #859AA5; /* 색상 업데이트 */
  padding: 8px;
  gap: 5px; /* 간격 줄이기 */
  margin: 10px 0; /* 마진 업데이트 */
  margin-bottom: 20px; /* 마진 업데이트 */
  margin-top: -5px;
`;

const DurationInput = styled.input`
  width: 100px;
  height: 30px;
  border: none;
  background-color: #859AA5; /* 배경 색상 업데이트 */
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  color: #fff; /* 텍스트 색상 흰색 */
  text-align: center; /* 중앙 정렬 */
`;

const Select = styled.select`
  width: 268px;
  height: 45px;
  border-radius: 4px;
  background-color: #859AA5; /* 색상 업데이트 */
  padding: 8px;
  font-size: 16px;
  color: #000; /* 글자 색상 */
  margin: 10px 0; /* 마진 업데이트 */
  margin-bottom: 20px; /* 마진 업데이트 */
  margin-top: -5px;
  border: none;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin: 10px 0; /* 마진 업데이트 */
  border-bottom: 1px solid #ccc; /* 하단에 줄 추가 */
  padding-bottom: 10px; /* 하단 패딩 추가 */
  margin-bottom: 20px; /* 마진 업데이트 */
  margin-top: -5px;
`;

const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  margin: 0;
  accent-color: ${(props) => (props.checked ? "#dc143c" : "#859AA5")}; /* 체크된 경우 빨간색 */
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 174px;
  height: 74px;
  border-radius: 4px;
  background-color: #859AA5; /* 색상 업데이트 */
  text-decoration: none;
  color: #000; /* 글자 색상 */
  font-weight: 500;
  font-size: 16px;
  text-align: center;
`;

const PredictionButton = styled(ActionButton)`
  background-color: #dc143c; /* 예측 버튼은 빨간색 */
  color: #fff; /* 글자 색상 */
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const MovieTitleInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PlusMinusButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #859AA5;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CreateStory() {
  const [duration, setDuration] = useState(120);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleGenreClick = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre].slice(0, 3)
    );
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const increaseDuration = () => {
    setDuration(prev => prev + 1);
  };

  const decreaseDuration = () => {
    setDuration(prev => Math.max(prev - 1, 0));
  };

  return (
    <Section>
      <MovieDetails>
        <MovieTitleInput>
          <TitleInput placeholder="영화 제목을 입력하세요" type="text" />
        </MovieTitleInput>
        <Label>장르를 선택하세요. (최대 3개)</Label>
        <GenreSelection>
          {['액션', '스릴러', '범죄', '코미디', '드라마', '로맨스', 'SF', '호러', '판타지', '애니메이션'].map((genre) => (
            <GenreOption
              key={genre}
              selected={selectedGenres.includes(genre)}
              onClick={() => handleGenreClick(genre)}
            >
              <GenreLabel>{genre}</GenreLabel>
            </GenreOption>
          ))}
        </GenreSelection>
        <Label>상영 시간을 입력하세요.</Label>
        <DurationSelection>
          <PlusMinusButton onClick={decreaseDuration}>-</PlusMinusButton>
          <DurationInput
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10) || 0)}
          />
          <PlusMinusButton onClick={increaseDuration}>+</PlusMinusButton>
        </DurationSelection>
        <Label>관람 등급을 선택하세요.</Label>
        <Select>
          <option value="15">15세 관람가</option>
          <option value="19">19세 관람가</option>
        </Select>
        <Label>영화의 배경 국가를 선택하세요.</Label>
        <Select multiple>
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
        </Select>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
          />
          <Label>이 영화는 시리즈물입니까?</Label>
        </CheckboxContainer>
      </MovieDetails>
      <Actions>
        <ActionButton to="/preview">미리보기</ActionButton>
        <PredictionButton to="/predict">1차 흥행률 예측</PredictionButton>
      </Actions>
    </Section>
  );
}

export default CreateStory;
