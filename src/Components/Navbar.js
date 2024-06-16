import React from "react";
import "../Layout/Navbar.css";
import Button from "@mui/material/Button";

function Navbar() {
  return (
    <nav className="nav-bar">
      <span>How</span>
      <span>QnA</span>
      <span>ToS</span>
      <span>Setting</span>
    </nav>
  );
}

export default Navbar;
