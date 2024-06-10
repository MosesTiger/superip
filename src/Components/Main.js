import React from "react";
import { FaBell, FaChevronRight, FaSearch } from "react-icons/fa";
import CreateStory from "./CreateStory";
import PredictHit from "./PredictHit";
import StoryArchive from "./StoryArchive";
import Recommend from "./Recommend";
import "../Layout/Main.css";
import "../Layout/Header.css";

const Main = () => {
  return (
    <div className="main-page">
      <header className="header">
        <img src="/로고 임시.png" alt="Logo" className="logo" />
        <div className="search-container">
          <input
            type="search"
            className="search-bar"
            placeholder="영화 검색..."
          />
          <FaSearch className="search-icon" />
        </div>
        <FaBell className="notification-icon" />
        <button className="login-button">로그인</button>
      </header>
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
