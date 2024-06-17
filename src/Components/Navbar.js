import React from "react";
import "../Layout/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-bar">
      <Link to="/How">
        <span>How</span>
      </Link>
      <Link to="QnA">
        <span>QnA</span>
      </Link>
      <Link to="ToS">
        <span>ToS</span>
      </Link>
      <Link to="Setting">
        <span>Setting</span>
      </Link>
    </nav>
  );
}

export default Navbar;
