import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 100%;
  margin: 0;
  font-size: 16px;
  color: #000;
  font-family: "Poppins", sans-serif;
  position: relative;
  padding-right: 35px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: ${(props) => props.height || "120px"};
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  font-size: 16px;
  color: #000;
  background-color: #fefefe;
  display: block;
  resize: vertical;
`;

const Label = styled.label`
  display: block;
  width: 80%;
  font-size: 18px;
  color: #000;
  text-align: left;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const ExpectButton = styled(Button)`
  background-color: #75c96e;
  color: #000;
`;

const CombinedButton = styled(Button)`
  background-color: #e23a3a;
  color: #000;
`;

const ExpectResult = styled.div`
  height: 100%;
  font-size: 18px;
  margin-right: 10px;
`;

function Synopsis() {
  const [characters, setCharacters] = useState("");
  const [plot, setPlot] = useState("");
  const [keyword, setKeyword] = useState(""); // keyword로 필드명 변경
  const [gptRequest, setGptRequest] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSynopsisComplete, setIsSynopsisComplete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const movieData = location.state;

  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);

  const handleButtonClick = () => {
    if (!isGenerating && !isSynopsisComplete) {
      if (movieData && characters && keyword) {
        // keyword로 체크
        setIsGenerating(true);
        setPlot(""); // Reset plot before generating new one

        const eventSource = new EventSource(
          `http://43.200.200.147/api/v1/synopsis/generate?${new URLSearchParams(
            {
              keyword: keyword, // keyword 사용
              genre: movieData.selectedGenres.join(", "),
              theme: movieData.country,
              characters: characters,
            }
          )}`
        );

        eventSource.onmessage = (event) => {
          if (event.data === "[DONE]") {
            eventSource.close();
            setIsGenerating(false);
          } else {
            try {
              const data = JSON.parse(event.data);
              if (data.storyline) {
                setPlot(data.storyline);
              }
            } catch (error) {
              // If it's not a JSON, it's a part of the storyline
              setPlot((prevPlot) => prevPlot + event.data);
            }
          }
        };
        setIsGenerating(true);
        setTimeout(() => {
          setIsSynopsisComplete(true);
        }, 1000);

        eventSource.onerror = (error) => {
          console.error("Error:", error);
          eventSource.close();
          setIsGenerating(false);
          alert("시놉시스 생성 중 오류가 발생했습니다.");
        };
      } else {
        alert("영화 정보, 등장인물, 키워드를 모두 입력해주세요.");
      }
    } else if (isSynopsisComplete) {
      // 시나리오 생성 함수 호출
      handleCreateScenario();
    }
  };

  const handleCreateScenario = (e) => {
    e.stopPropagation();
    if (!plot) {
      alert("시놉시스를 먼저 생성해주세요.");
      return;
    }

    const scenarioData = {
      title: movieData.title,
      genre: movieData.selectedGenres.join(", "),
      theme: movieData.country,
      characters: characters,
      keyword: keyword, // keyword 필드만 사용
      synopsis: plot,
      duration: movieData.duration, // duration 값을 포함
    };

    console.log(
      "Attempting to navigate to Script component with data:",
      scenarioData
    );
    try {
      navigate("/create/script", {
        state: { scenarioData, autoStart: true },
        replace: true,
      });
      console.log("이동 성공적으로 이뤄짐");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handlePredictionClick = async () => {
    try {
      const {
        title,
        selectedGenres,
        duration,
        rating,
        country,
        isSeries,
        mainCharacterGender,
      } = movieData;

      const response = await fetch(
        "http://43.200.200.147/api/v1/success-rate/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            genres: selectedGenres,
            duration,
            rating,
            country,
            isSeries, // isSeries는 movieData의 isCheckboxChecked를 받아온 값입니다.
            mainCharacterGender,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("흥행률 예측 실패");
      }
      const data = await response.json();
      alert(`예상 흥행률: ${data.success_rate}%`);
    } catch (error) {
      console.error("Error:", error);
      alert("흥행률 예측 중 오류가 발생했습니다.");
    }
  };

  return (
    <Section>
      <Label>등장인물 (콤마로 구분)</Label>
      <TextArea
        placeholder="예: 홍길동, 김철수, 이영희"
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
      />
      <Label>키워드 태그 (콤마로 구분)</Label>
      <TextArea
        placeholder="예: 모험, 우정, 성장"
        value={keyword} // 단일 키워드 필드로 설정
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Label>시놉시스</Label>
      <TextArea
        placeholder="시놉시스를 생성하려면 '시놉시스 생성' 버튼을 클릭하세요."
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
        height="300px"
        readOnly={isGenerating}
      />
      <Label>수정 요청사항</Label>
      <TextArea
        placeholder="GPT에게 수정을 요청할 사항을 적어주세요."
        value={gptRequest}
        onChange={(e) => setGptRequest(e.target.value)}
        height="300px"
      />
      <ButtonContainer>
        <ExpectResult>등급 : ㅁ</ExpectResult>
        <ExpectButton onclick={handlePredictionClick}>
          흥행도 예측 버튼
        </ExpectButton>
        <CombinedButton onClick={handleButtonClick} disabled={isGenerating}>
          {isGenerating
            ? "생성 중..."
            : isSynopsisComplete
            ? "시나리오 생성"
            : "시놉시스 생성"}
        </CombinedButton>
      </ButtonContainer>
    </Section>
  );
}

export default Synopsis;
