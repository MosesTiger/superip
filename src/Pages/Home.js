import React from "react";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "./AuthProvider";
import { FaChevronRight } from "react-icons/fa";
import Header from "../Components/Header";
import Card from "../Components/Home/Card";
import Navbar from "../Components/Home/Navbar";
import "../stylefile/Main.css";

function Home() {
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅을 사용

  // const { isAuthenticated } = useAuth(); // 로그인 여부를 확인하기 위해 useAuth 훅을 사용

  const CreateStoryClick = () => {
    alert("Clicked!");
    navigate("/createstory");
    /* 
    if (isAuthenticated) {
      navigate("/createstory"); // 로그인된 상태면 CreateStory 페이지로 이동
    } else {
      navigate("/login"); // 로그인되지 않은 상태면 로그인 페이지로 이동
    }
  */
  };

  const MypageClick = () => {
    navigate("/mypage");
    /* 
    if (isAuthenticated) {
      navigate("/mypage"); // 로그인된 상태면 Mypage로 이동
    } else {
      navigate("/login"); // 로그인되지 않은 상태면 로그인 페이지로 이동
    }
  */
  };

  const RecentClick = () => {
    navigate("/CreateStory");
  };

  const RecommendClick = () => {
    navigate("/recommend");
  };

  const Testclick = () => {
    navigate("/CreateStory");
  };

  const cardData = [
    {
      id: 1,
      cardnum: "card1",
      image: "/CreateStory_Image.jpg",
      title: "Create Story",
      description: "Get your stories created automatically and effortlessly",
      onClink: CreateStoryClick,
    },
    {
      id: 2,
      cardnum: "card2",
      image: "/Recent_Image.jpg",
      title: "Recent Story",
      description: "Moving to the recently written scenario.",
      onClink: RecentClick,
    },
    {
      id: 3,
      cardnum: "card3",
      image: "/StoryArchive_Image.jpg",
      title: "Story Archive",
      description: "Your stories are securely stored for safekeeping.",
      onClink: MypageClick,
    },
    {
      id: 4,
      cardnum: "card4",
      image: "/Recommend_Image.jpg",
      title: "Recommend",
      description: "Showcasing our top successful creations",
      onClink: RecommendClick,
    },
  ];

  return (
    <div className="main-page">
      <Header />
      <div className="title-wrapper">
        <div className="circle-icon"></div>
        <div className="title">
          <h1>Create Story</h1>
          <Navbar />
        </div>
        <FaChevronRight className="nav-arrow" />
      </div>
      <div className="card-container">
        {cardData.map((card) => (
          <Card
            key={card.id}
            cardnum={card.cardnum}
            image={card.image}
            title={card.title}
            description={card.description}
            onClink={card.onClink}
          />
        ))}
      </div>
      <button onClick={Testclick}>test</button>
    </div>
  );
}

export default Home;
