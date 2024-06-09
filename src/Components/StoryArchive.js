// src/components/StoryArchive.js
import React from "react";
import "../Layout/Card.css";

const StoryArchive = () => (
  <div className="card">
    <img
      src="/StoryArchive_Image.jpg"
      alt="Story Archive"
      className="card-image"
    />
    <h2>Story Archive</h2>
    <p>Your stories are securely stored for safekeeping.</p>
    <button className="go-button">Go!</button>
  </div>
);

export default StoryArchive;
