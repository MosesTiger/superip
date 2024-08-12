import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../../stylefile/Card.css";

const Card = ({ cardnum, image, title, description, redirectTo }) => {
  const [navigate, setNavigate] = useState(false);

  const handleClick = () =>{
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to={redirectTo}/>;
  }

  return( 
    <div className="card">
    <div className={cardnum}>
      <img src={image} alt={title} className="card-image" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="go-button" onClick={handleClick}>
        Go!
      </button>
    </div>
  </div>
  )
};

export default Card;
