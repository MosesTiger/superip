import React from "react";
import "../../stylefile/Card.css";

const Card = ({ cardnum, image, title, description, onClick }) => (
  <div className="card">
    <div className={cardnum}>
      <img src={image} alt="" className="card-image" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="go-button" onClick={onClick}>
        Go!
      </button>
    </div>
  </div>
);

export default Card;
