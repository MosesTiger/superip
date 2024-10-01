import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../../stylefile/Card.css";

const Card = ({
  cardnum,
  image,
  title,
  description,
  redirectTo,
  selectedMenu,
}) => {
  const [navigate, setNavigate] = useState(false);

  const handleClick = () => {
    setNavigate(true);
  };

  if (navigate) {
    // Story Archive인 경우에만 selectedMenu를 함께 전달
    if (redirectTo === "/mypage") {
      return <Navigate to={redirectTo} state={{ selectedMenu }} />;
    }
    return <Navigate to={redirectTo} />;
  }

  return (
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
  );
};

export default Card;
