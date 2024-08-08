import React from "react";
import { Link } from "react-router-dom";
import "../../../stylefile/Card.css";

const CreateStory = () => (
  <div className="card">
    <div className="card1">
      <img
        src="/CreateStory_Image.jpg"
        alt="Create Story"
        className="card-image"
      />
      <h2>Create Story</h2>
      <p>Get your stories created automatically and effortlessly</p>
      <Link to="/CreateStory">
        <button className="go-button">Go!</button>
      </Link>
    </div>
  </div>
);

export default CreateStory;
