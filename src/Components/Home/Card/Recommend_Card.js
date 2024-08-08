import React from "react";
import { Link } from "react-router-dom";
import "../../../stylefile/Card.css";

const Recommend = () => (
  <div className="card">
    <div className="card4">
      <img src="/Recommend_Image.jpg" alt="Recommend" className="card-image" />
      <h2>Recommend</h2>
      <p>Showcasing our top successful creations</p>
      <Link to="/Recommend">
        <button className="go-button">Go!</button>
      </Link>
    </div>
  </div>
);

export default Recommend;
