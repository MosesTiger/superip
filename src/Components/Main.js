import React from "react";
import { FaBell } from 'react-icons/fa';
import CreateStory from "./CreateStory";
import PredictHit from "./PredictHit";
import StoryArchive from "./StoryArchive";
import Recommend from "./Recommend";
import "../Layout/Main.css";

const Main = () => (
  <div className="main-page">
    <header className="header">
      <div className="logo">Logo</div>
      <input type="text" className="search-bar" placeholder="영화 검색..." />
      <FaBell className="notification-icon" />
      <button className="login-button">로그인</button>
    </header>
    <div className="title">
      <h1>Create Story</h1>
      <nav className="nav-bar">
        <span>How</span>
        <span>QnA</span>
        <span>ToS</span>
        <span>Setting</span>
      </nav>
    </div>
    <div className="card-container">
      <CreateStory />
      <PredictHit />
      <StoryArchive />
      <Recommend />
    </div>
  </div>
);

export default Main;
