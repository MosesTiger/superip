import React from "react";
import "../Layout/Card.css";

const StoryArchive = () => (
  <div className="card">
    <div className="card3">
      <img
        src="/StoryArchive_Image.jpg"
        alt="Story Archive"
        className="card-image"
      />
      <h2>Story Archive</h2>
      <p>Your stories are securely stored for safekeeping.</p>
      <button className="go-button">Go!</button>
    </div>
  </div>
);

export default StoryArchive;
