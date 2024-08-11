import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import "../stylefile/Header.css";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <Link to="/">
      <img src="/로고 임시.png" alt="Logo" className="logo" />
    </Link>
    <div className="search-container">
      <input type="search" className="search-bar" placeholder="영화 검색..." />
      <FaSearch className="search-icon" />
    </div>
    <FaBell className="notification-icon" />
    <Link to="/login">
      <button className="login-button">로그인</button>
    </Link>
  </header>
);

export default Header;
