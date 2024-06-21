import React from "react";
import Link from 'next/link';
import styles from "../../layout/Card.module.css";

const StoryArchive = () => (
  <div className={styles.card}>
    <div className={styles.card4}>
      <img
        src="/StoryArchive_Image.jpg"
        alt="Story Archive"
        className={styles.cardImage}
      />
      <h2>Story Archive</h2>
      <p>Your stories are securely stored for safekeeping.</p>
      <Link href="/storyArchive">
        <button className={styles.goButton}>Go!</button>
      </Link>
    </div>
  </div>
);

export default StoryArchive;
