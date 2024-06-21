import React from "react";
import Link from 'next/link';
import styles from "../../layout/Card.module.css";

const PredictHit = () => (
  <div className={styles.card}>
    <div className={styles.card2}>
      <img
        src="/PredictHit_Image.jpg"
        alt="Predict Hit"
        className={styles.cardImage}
      />
      <h2>Predict Hit</h2>
      <p>Analyzing your story's success and impact.</p>
      <Link href="/predictHit">
        <button className={styles.goButton}>Go!</button>
      </Link>
    </div>
  </div>
);

export default PredictHit;
