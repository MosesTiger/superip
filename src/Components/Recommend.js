// src/components/Recommend.js
import React from "react";
import "../Layout/Card.css";

const Recommend = () => (
  <div className="card">
    <img src="/Recommend_Image.jpg" alt="Recommend" className="card-image" />
    <h2>Recommend</h2>
    <p>Showcasing our top successful creations</p>
    <button className="go-button">Go!</button>
  </div>
);

export default Recommend;
