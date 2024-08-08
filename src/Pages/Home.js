import React from "react";
import { FaChevronRight } from "react-icons/fa";
import Header from "../Components/Header";
import CreateStory from "../Components/Home/Card/CreateStory_Card";
import PredictHit from "../Components/Home/Card/PredictHit_Card";
import StoryArchive from "../Components/Home/Card/StoryArchive_Card";
import Recommend from "../Components/Home/Card/Recommend_Card";
import Navbar from "../Components/Home/Navbar";
import "../stylefile/Main.css";

const Main = () => {
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
        <CreateStory />
        <PredictHit />
        <StoryArchive />
        <Recommend />
      </div>
    </div>
  );
};

export default Main;
