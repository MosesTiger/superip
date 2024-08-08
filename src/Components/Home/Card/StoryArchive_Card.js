import React from "react";
import { Link } from "react-router-dom";
import "../../../stylefile/Card.css";

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
      <Link to="/StoryArchive">
        <button className="go-button">Go!</button>
      </Link>
    </div>
  </div>
);

export default StoryArchive;
