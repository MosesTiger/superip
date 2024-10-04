import React, { useState } from "react";
import Header from "../Components/Header";
import Card from "../Components/Home/Card";
import Navbar from "../Components/Home/Navbar";
import "../stylefile/Main.css";
import styled from "styled-components";
import ExampleCard from "../Components/Home/ExampleCard";

const FilmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  margin-top:10px;
`;

const FilmRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0; /* 위아래 간격 */
  width:80%;
`;

const FilmWhite = styled.div`
  width: 40px; /* 네모의 가로 크기 */
  height: 40px; /* 네모의 세로 크기 */
  background-color: white; /* 흰색 네모 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 8px; /* 네모의 모서리를 둥글게 */
`;

const TitleContainer = styled.div`
  display:flex;
  width:100%;
  align-items:center;
  justify-content:center;
`

const CircleIcon = styled.div`
  width: 45px; /* 동그라미의 가로 크기 */
  height: 45px; /* 동그라미의 세로 크기 */
  background-color: #f5f5f5; /* 동그라미 색상 */
  border-radius: 50%; /* 동그라미 모양을 위해 50% */
  margin-right: 20px; /* 제목과의 간격 */
  margin-left:160px;
  margin-top:20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0px 20px;
  padding-top:5px;
  width:75%;
  margin-top:30px;
  margin-right:10%;
  border-top: 3px solid white;
  border-bottom: 3px solid white;
`

const VerticalLine = styled.div`
  width: 2px;
  height: 30px; /* 선의 높이를 조정 */
  background-color: #f5f5f5;
  margin: 0 20px; /* 좌우 간격을 조정 */
`;

const ExampleSection = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:blue;
`;

const ExampleTitle = styled.h2`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 90%;
  height:100px;
`;

const CardRow = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${({ scrollPosition }) => `translateX(-${scrollPosition * 100}%)`};
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:disabled {
    color: #666;
    cursor: not-allowed;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin-top: 20px;
`;


function Home() {
  const cardData = [
    {
      id: 1,
      cardnum: "card1",
      image: "/CreateStory_Image.jpg",
      title: "CREATE STORY",
      description: (
        <>
          스토리를 자동으로
          <br />
          쉽고 빠르게 생성하세요.
        </>
      ),
      redirectTo: "/create/select",
    },
    {
      id: 2,
      cardnum: "card2",
      image: "/Recent_Image.jpg",
      title: "EXAMPLE STORY",
      description: (
        <>
          AI가 작성한
          <br />
          예시작을 참고해보세요.
        </>
      ),
      redirectTo: "/create/script",
    },
    {
      id: 3,
      cardnum: "card3",
      image: "/StoryArchive_Image.jpg",
      title: "STORY ARCHIVE",
      description: (
        <>
          당신의 스토리를
          <br />
          기억하고 저장하세요.
        </>
      ),
      redirectTo: "/mypage",
      selectedMenu: "scenario", // Story Archive에서는 scenario 메뉴 선택
    },
    {
      id: 4,
      cardnum: "card4",
      image: "/Recommend_Image.jpg",
      title: "RECOMMEND",
      description: (
        <>
          역대 가장 성공적인
          <br />
          작품들을 선보입니다.
        </>
      ),
      redirectTo: "/recommend",
    },
  ];

  const exampleData = [
    { id: 1, title: "Story 1", description: "Example Story 1", image: "/추천시나리오1.png" },
    { id: 2, title: "Story 2", description: "Example Story 2", image: "/추천시나리오2.png" },
    { id: 3, title: "Story 3", description: "Example Story 3", image: "/추천시나리오3.png" },
    { id: 4, title: "Story 4", description: "Example Story 4", image: "/추천시나리오4.png" },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrollRight = () => {
    if (scrollPosition < exampleData.length - 2) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  const handleScrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    }
  };

  return (
    <div className="main-page">
      <Header />
      <TitleContainer>
        <CircleIcon />
        <TitleWrapper>
          <div className="title">
            <h1 style={{ cursor: "default" }}>CREATE STORY</h1>
          </div>
          <VerticalLine />
          <Navbar />
        </TitleWrapper>
      </TitleContainer>
      <FilmContainer>
        <FilmRow>
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
        </FilmRow>
        <div className="card-container">
          {cardData.map((card) => (
            <Card
              key={card.id}
              cardnum={card.cardnum}
              image={card.image}
              title={card.title}
              description={card.description}
              redirectTo={card.redirectTo}
              selectedMenu={card.selectedMenu} // selectedMenu 전달
            />
          ))}
        </div>
        <FilmRow>
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
          <FilmWhite />
        </FilmRow>
      </FilmContainer>
      <ExampleSection>
        <ExampleTitle>Example Story</ExampleTitle>
        <ArrowWrapper>
          <ArrowButton onClick={handleScrollLeft} disabled={scrollPosition === 0}>
            {"<"}
          </ArrowButton>
          <CardWrapper>
            <CardRow scrollPosition={scrollPosition}>
              {exampleData.map((story) => (
                <ExampleCard key={story.id} title={story.title} description={story.description} image={story.image} />
              ))}
            </CardRow>
          </CardWrapper>
          <ArrowButton
            onClick={handleScrollRight}
            disabled={scrollPosition >= exampleData.length - 2}
          >
            {">"}
          </ArrowButton>
        </ArrowWrapper>
      </ExampleSection>
    </div>
  );
}

export default Home;
