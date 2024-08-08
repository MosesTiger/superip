import React from "react";
import { Link } from "react-router-dom";
import "../../stylefile/Card.css";

const PredictHit = () => (
  <div className="card">
    <div className="card2">
      <img
        src="/PredictHit_Image.jpg"
        alt="Predict Hit"
        className="card-image"
      />
      <h2>Predict Hit</h2>
      <p>Analyzing your story's success and impact.</p>
      <Link to="/PredictHit">
        <button className="go-button">Go!</button>
      </Link>
    </div>
  </div>
);

export default PredictHit;
