import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

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

const TitleInput = styled.input`
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
  padding: 8px 16px;
  margin: 5px;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? "#007bff" : "#e0e0e0")};
  color: ${(props) => (props.selected ? "#ffffff" : "#000000")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#0056b3" : "#d0d0d0")};
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DurationControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin-top: 10px;
`;

const DurationButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DurationDisplay = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Select1 = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const MovieDetails = styled.div`
  margin-top: 20px;
`;

const GenreLabel = styled.div`
  font-weight: 500;
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;

const PredictionButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Select() {
  const [duration, setDuration] = useState(120);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("all");
  const [country, setCountry] = useState("korea");
  const [mainCharacterGender, setMainCharacterGender] = useState("male");
  const { token, user } = useAuth(); 
  const navigate = useNavigate();

  
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
    setDuration((prev) => Math.min(prev + 10, 120)); // 10분씩 증가, 최대 120분
  };

  const decreaseDuration = () => {
    setDuration((prev) => Math.max(prev - 10, 10)); // 10분씩 감소, 최소 10분
  };

  const handleSubmit = async () => {
    if (!title || selectedGenres.length === 0) {
      alert("제목과 최소 한 개의 장르를 선택해주세요.");
      return;
    }

    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post('http://3.36.168.204/api/v1/scenario/create', {
        title: title,
        genre: selectedGenres.join(", "),
        runtime: duration,
        rating: rating,
        theme: country,
        gender: mainCharacterGender,
        is_series: isCheckboxChecked,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        const scenarioId = response.data.id;
        navigate("/create/synopsis", {state: {scenarioId}});
     } 
   }  catch (error) {
      console.error("Error:", error);
      alert("시나리오 생성 중 오류가 발생했습니다.");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <small style={{color: "red"}}>
          {selectedGenres.length >= 3 ? "최대 3개의 장르만 선택할 수 있습니다." : ""}
        </small>
        <Label>영화 상영 시간을 선택하세요.</Label>
        <DurationControl>
          <DurationButton onClick={decreaseDuration} disabled={duration <= 10}>
            -
          </DurationButton>
          <DurationDisplay>{duration}분</DurationDisplay>
          <DurationButton onClick={increaseDuration} disabled={duration >= 120}>
            +
          </DurationButton>
        </DurationControl>
        <Label>관람 등급을 선택하세요.</Label>
        <Select1 value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="all">전체 관람가</option>
          <option value="12">12세 이상 관람가</option>
          <option value="15">15세 이상 관람가</option>
          <option value="19">청소년 관람불가</option>
        </Select1>
        <Label>국가를 선택하세요.</Label>
        <Select1 value={country} onChange={(e) => setCountry(e.target.value)}>
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
        <Label>메인 주인공의 성별을 선택하세요.</Label>
        <Select1
          value={mainCharacterGender}
          onChange={(e) => setMainCharacterGender(e.target.value)}
        >
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="mixed">혼성</option>
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
        <PredictionButton onClick={handleSubmit}>다음 단계</PredictionButton>
      </Actions>
    </Section>
  );
}

export default Select;