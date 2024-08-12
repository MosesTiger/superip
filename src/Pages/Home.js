import React from "react";
import { FaChevronRight } from "react-icons/fa";
import Header from "../Components/Header";
import Card from "../Components/Home/Card";
import Navbar from "../Components/Home/Navbar";
import "../stylefile/Main.css";

function Home() {

  const cardData = [
    {
      id: 1,
      cardnum: "card1",
      image: "/CreateStory_Image.jpg",
      title: "Create Story",
      description: "Get your stories created automatically and effortlessly",
      redirectTo: "/createstory/select",
    },
    {
      id: 2,
      cardnum: "card2",
      image: "/Recent_Image.jpg",
      title: "Recent Story",
      description: "Moving to the recently written scenario.",
      redirectTo: "/createstory",
    },
    {
      id: 3,
      cardnum: "card3",
      image: "/StoryArchive_Image.jpg",
      title: "Story Archive",
      description: "Your stories are securely stored for safekeeping.",
      redirectTo: "/mypage",
    },
    {
      id: 4,
      cardnum: "card4",
      image: "/Recommend_Image.jpg",
      title: "Recommend",
      description: "Showcasing our top successful creations",
      redirectTo: "/recommend",
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
            redirectTo={card.redirectTo}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
