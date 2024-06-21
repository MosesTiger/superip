import React from "react";
import { FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";
import CreateStory from "../components/Card/CreateStory_Card";
import PredictHit from "../components/Card/PredictHit_Card";
import StoryArchive from "../components/Card/StoryArchive_Card";
import Recommend from "../components/Card/Recommend_Card";
import Navbar from "../components/Navbar";
import styles from "../layout/Main.module.css";

const Main = () => {
  return (
    <div className={styles.mainPage}>
      <Header />
      <div className={styles.titleWrapper}>
        <div className={styles.circleIcon}></div>
        <div className={styles.title}>
          <h1>Create Story</h1>
          <Navbar />
        </div>
        <FaChevronRight className={styles.navArrow} />
      </div>
      <div className={styles.cardContainer}>
        <CreateStory />
        <PredictHit />
        <StoryArchive />
        <Recommend />
      </div>
    </div>
  );
};

export default Main;
