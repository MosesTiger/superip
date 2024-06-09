// src/components/CreateStory.js
import React from "react";
import "../Layout/Card.css";

const CreateStory = () => (
  <div className="card">
    <img
      src="/CreateStory_Image.jpg"
      alt="Create Story"
      className="card-image"
    />
    <h2>Create Story</h2>
    <p>Get your stories created automatically and effortlessly</p>
    <button className="go-button">Go!</button>
  </div>
);

export default CreateStory;
