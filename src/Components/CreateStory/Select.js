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
  color: #000; /* 글자 색상 */
  font-family: "Poppins", sans-serif;
  position: relative; /* 액션 버튼을 하단에 위치시키기 위한 설정 */
  height: auto; /* 또는 적절한 고정 값으로 설정 */
`;

const TitleInput = styled.input`
  width: 100%;
  border: 0;
  background-color: #859aa5;
  height: 45px;
  border-radius: 4px;
  padding: 8px 16px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 20px;
  min-width: 250px;
  z-index: 3;
  margin: 10px 0; /* 마진 업데이트 */

  &::placeholder {
    color: #53606a; /* Placeholder 텍스트 색상 흰색 */
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
  background-color: #859aa5; /* 배경 색상 */
  color: #000; /* 글자 색상 */
  margin-top: -5px;
`;

const GenreOption = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected
      ? "#E23A3A"
      : "#d3d3d3"}; /* 선택된 경우 빨간색, 그렇지 않으면 회색 */
  color: ${(props) => (props.selected ? "#fff" : "#000")}; /* 글자 색상 */
  cursor: pointer;

  &:hover {
    background-color: #e23a3a; /* 호버 시 빨간색 */
    color: #fff; /* 글자 색상 */
  }
  &:active {
    background-color: #be3232;
    color: #fff;
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
  border-radius: 4px;
  background-color: #859aa5; /* 색상 업데이트 */
  padding: 8px;
  gap: 5px; /* 간격 줄이기 */
  margin: 10px 0; /* 마진 업데이트 */
  margin-top: -5px;
`;

const DurationInput = styled.input`
  width: 100px;
  border: none;
  background-color: #859aa5; /* 배경 색상 업데이트 */
  border-radius: 4px;
  padding: 5px;
  font-size: 20px;
  text-align: center; /* 중앙 정렬 */
`;

const Select1 = styled.select`
  width: 268px;
  height: 45px;
  border-radius: 4px;
  background-color: #859aa5; /* 색상 업데이트 */
  padding: 8px;
  font-size: 16px;
  color: #000; /* 글자 색상 */
  margin: 10px 0; /* 마진 업데이트 */
  margin-top: -5px;
  border: none;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin: 10px 0; /* 마진 업데이트 */
  padding-bottom: 10px; /* 하단 패딩 추가 */
  margin-bottom: 20px; /* 마진 업데이트 */
  margin-top: -5px;
`;

const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  margin: 0;
  accent-color: ${(props) =>
    props.checked ? "#E23A3A" : "#859AA5"}; /* 체크된 경우 빨간색 */
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

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  padding: 20px;
  border: none;
  border-radius: 10px;
  background-color: #859aa5; /* 색상 업데이트 */
  text-decoration: none;
  color: #000; /* 글자 색상 */
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #697a82;
  }
`;

const PredictionButton = styled(ActionButton)`
  background-color: #e23a3a; /* 예측 버튼은 빨간색 */
  color: black; /* 글자 색상 */

  &:hover {
    background-color: #be3232;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid #ccc; /* 하단에 줄 추가 */
`;

const PlusMinusButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #859aa5;
  color: #black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Select() {
  const [duration, setDuration] = useState(120);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [title, setTitle] = useState(""); // 제목 입력 상태 추가
  const [rating, setRating] = useState("all"); // 관람 등급 상태 추가
  const [country, setCountry] = useState("korea"); // 영화 배경 국가 상태 추가

  const handleGenreClick = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre].slice(0, 3)
    );
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const increaseDuration = () => {
    setDuration((prev) => prev + 1);
  };

  const decreaseDuration = () => {
    setDuration((prev) => Math.max(prev - 1, 0));
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    /* const movieData = {
      title,
      selectedGenres,
      duration,
      rating,
      country,
      isSeries: isCheckboxChecked,
    };*/

    try {
      /*//서버에 데이터를 전송하는 부분을 주석 처리
      const response = await fetch("http://localhost:8000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });
      const data = await response.json();*/ // 비동기 작업이 완료된 후 페이지 이동
      navigate("/create/synopsis"); // 비동기 작업이 완료된 후 페이지 이동
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePredictionClick = async () => {
    /* const movieData = {
      title,
      selectedGenres,
      duration,
      rating,
      country,
      isSeries: isCheckboxChecked,
    };*/

    try {
      /*//서버에 데이터를 전송하는 부분을 주석 처리
      const response = await fetch("http://localhost:8000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });
      const data = await response.json();*/ // 비동기 작업이 완료된 후 페이지 이동
      navigate("/create/predict"); // 비동기 작업이 완료된 후 페이지 이동
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Section>
      <MovieDetails>
        <Label>
          영화 제목을 입력하세요.
          <TitleInput
            placeholder="Ex) 범죄도시5"
            type="text"
            value={title} // 상태 값 바인딩
            onChange={(e) => setTitle(e.target.value)} // 상태 업데이트
          />
        </Label>
        <Label>장르를 선택하세요. (최대 3개)</Label>
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
        <Select1
          value={rating} // 상태 값 바인딩
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="all">전체 관람가</option>
          <option value="12">12세 관람가</option>
          <option value="15">15세 관람가</option>
          <option value="19">19세 관람가</option>
        </Select1>
        <Label>영화의 배경 국가를 선택하세요.</Label>
        <Select1
          value={country} // 상태 값 바인딩
          onChange={(e) => setCountry(e.target.value)}
        >
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
        <ActionButton onClick={handleSubmit}>다음 단계</ActionButton>
        <PredictionButton onClick={handlePredictionClick}>
          1차 흥행률 예측
        </PredictionButton>
      </Actions>
    </Section>
  );
}

export default Select;
