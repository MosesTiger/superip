import React from "react";
import { FaChevronRight } from "react-icons/fa";
import Header from "./Header";
import CreateStory from "./CreateStory";
import PredictHit from "./PredictHit";
import StoryArchive from "./StoryArchive";
import Recommend from "./Recommend";
import "../Layout/Main.css";

const Main = () => {
  return (
    <div className="main-page">
      <Header />
      <div className="title-wrapper">
        <div className="circle-icon"></div>
        <div className="title">
          <h1>Create Story</h1>
          <nav className="nav-bar">
            <span>How</span>
            <span>QnA</span>
            <span>ToS</span>
            <span>Setting</span>
          </nav>
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
