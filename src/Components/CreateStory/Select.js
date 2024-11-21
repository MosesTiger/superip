import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";

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

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid #ccc;
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
  background-color: #f5f5f5;
  color: black;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #1e1e1e;
  }

  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
`;

const DurationDisplay = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;

const PredictionButton = styled.button`
  padding: 10px 20px;
  background-color: #e23a3a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #be3232;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  resize: vertical;
`;

const TagWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const TagInput = styled.input`
  width: 95%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  background-color: #f5f5f5;
`;

const AddButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const AddTagButton = styled.button`
  width: 70px;
  padding: 10px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.div`
  background-color: #e0e0e0;
  color: #000000;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const RemoveTagButton = styled.button`
  background-color: transparent;
  border: none;
  color: #666;
  margin-left: 5px;
  cursor: pointer;
  font-size: 16px;
`;

function Select() {
  const [title, setTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [duration, setDuration] = useState(90);
  const [rating, setRating] = useState("all");
  const [country, setCountry] = useState("korea");
  const [mainCharacterGender, setMainCharacterGender] = useState("male");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [request, setRequest] = useState("");

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const increaseDuration = () => {
    if (duration < 180) {
      setDuration(duration + 10);
    }
  };

  const decreaseDuration = () => {
    if (duration > 60) {
      setDuration(duration - 10);
    }
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleAddKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleAddCharacter = () => {
    if (currentCharacter.trim() && !characters.includes(currentCharacter.trim())) {
      setCharacters([...characters, currentCharacter.trim()]);
      setCurrentCharacter("");
    }
  };

  const handleRemoveCharacter = (characterToRemove) => {
    setCharacters(characters.filter((character) => character !== characterToRemove));
  };

  const handleSubmit = async () => {
    // Validation checks
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (selectedGenres.length === 0) {
      alert("최소 한 개의 장르를 선택해주세요.");
      return;
    }

    if (keywords.length === 0) {
      alert("최소 한 개의 키워드를 입력해주세요.");
      return;
    }

    if (characters.length === 0) {
      alert("최소 한 명의 등장인물을 입력해주세요.");
      return;
    }

    const scenarioData = {
      title: title.trim(),
      genre: selectedGenres,  // JSON.stringify 제거
      runtime: duration,
      rating: rating,
      theme: country,
      gender: mainCharacterGender,
      is_series: isCheckboxChecked,
      chapter_count: Math.ceil(duration / 10),
      characters: characters,  // JSON.stringify 제거
      keywords: keywords,      // JSON.stringify 제거
      user_request: request.trim(),
    };

    console.log("Sending scenario data:", scenarioData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/scenario/create",
        scenarioData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response.data);
      const scenarioId = response.data.id;
      navigate("/create/synopsis", { state: { scenarioId } });
    } catch (error) {
      console.error("Error creating scenario:", error);
      console.error("Error details:", error.response?.data || error.message);
      alert(
        "시나리오 생성 중 오류가 발생했습니다: " +
          (error.response?.data?.detail || error.message)
      );
    }
  };

  return (
    <Section>
      <MovieDetails>
        <Label>영화 제목을 입력하세요.</Label>
        <TitleInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="영화 제목"
        />
        <Label>장르를 선택하세요. (최대 3개)</Label>
        <GenreSelection>
          {[
            "드라마", "액션", "코메디", "범죄", "스릴러", "미스터리",
            "시대극/사극", "전쟁", "가족", "멜로/로맨스", "어드벤쳐",
            "판타지", "공포", "스포츠", "SF", "느와르", "반공/분단",
            "첩보", "인물", "재난", "전기", "하이틴", "역사", "갱스터",
            "사회물(경향)", "뮤직", "청춘", "활극", "뮤지컬", "신파", "무협"
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
        <small style={{ color: "red" }}>
          {selectedGenres.length >= 3 ? "최대 3개의 장르만 선택할 수 있습니다." : ""}
        </small>

        <Label>영화 상영 시간을 선택하세요.</Label>
        <DurationControl>
          <DurationButton onClick={decreaseDuration} disabled={duration <= 60}>
            -
          </DurationButton>
          <DurationDisplay>{duration}분</DurationDisplay>
          <DurationButton onClick={increaseDuration} disabled={duration >= 180}>
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
          <option value="us">미국</option>
          <option value="uk">영국</option>
          <option value="japan">일본</option>
          <option value="china">중국</option>
          <option value="france">프랑스</option>
          <option value="germany">독일</option>
          <option value="italy">이탈리아</option>
          <option value="spain">스페인</option>
          <option value="india">인도</option>
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

        <Label>키워드를 입력하세요.</Label>
        <TagWrap>
          <TagInput
            type="text"
            value={currentKeyword}
            onChange={(e) => setCurrentKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddKeyword();
              }
            }}
            placeholder="키워드 입력"
          />
          <AddButtonWrap>
            <AddTagButton onClick={handleAddKeyword}>추가</AddTagButton>
          </AddButtonWrap>
        </TagWrap>
        <TagContainer>
          {keywords.map((keyword, index) => (
            <Tag key={index}>
              {keyword}
              <RemoveTagButton onClick={() => handleRemoveKeyword(keyword)}>
                ×
              </RemoveTagButton>
            </Tag>
          ))}
        </TagContainer>

        <Label>등장인물을 입력하세요.</Label>
        <TagWrap>
          <TagInput
            type="text"
            value={currentCharacter}
            onChange={(e) => setCurrentCharacter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCharacter();
              }
            }}
            placeholder="등장인물 입력"
          />
          <AddButtonWrap>
            <AddTagButton onClick={handleAddCharacter}>추가</AddTagButton>
          </AddButtonWrap>
        </TagWrap>
        <TagContainer>
          {characters.map((character, index) => (
            <Tag key={index}>
              {character}
              <RemoveTagButton onClick={() => handleRemoveCharacter(character)}>
                ×
              </RemoveTagButton>
            </Tag>
          ))}
        </TagContainer>

        <Label>GPT 요청사항을 입력하세요.</Label>
        <TextArea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="시나리오에 대한 특별한 요청사항이 있다면 입력해주세요."
        />
      </MovieDetails>
      <Actions>
        <PredictionButton onClick={handleSubmit}>다음 단계</PredictionButton>
      </Actions>
    </Section>
  );
}

export default Select;