import React from "react";
import Link from 'next/link';
import styles from "../../layout/Card.module.css";

const CreateStory = () => (
  <div className={styles.card}>
    <div className={styles.card1}>
      <img
        src="/CreateStory_Image.jpg"
        alt="Create Story"
        className={styles.cardImage}
      />
      <h2>Create Story</h2>
      <p>Get your stories created automatically and effortlessly</p>
      <Link href="/createStory">
        <button className={styles.goButton}>Go!</button>
      </Link>
    </div>
  </div>
);

export default CreateStory;