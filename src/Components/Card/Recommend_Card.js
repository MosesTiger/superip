import React from "react";
import Link from 'next/link';
import styles from "../../layout/Card.module.css";

const Recommend = () => (
  <div className={styles.card}>
    <div className={styles.card3}>
      <img src="/Recommend_Image.jpg" alt="Recommend" className={styles.cardImage} />
      <h2>Recommend</h2>
      <p>Showcasing our top successful creations</p>
      <Link href="/recommend">
        <button className={styles.goButton}>Go!</button>
      </Link>
    </div>
  </div>
);

export default Recommend;
