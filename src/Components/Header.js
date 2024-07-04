import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import "../Layout/Header.css";

const Header = () => (
  <header className="header">
    <img src="/로고 임시.png" alt="Logo" className="logo" />
    <div className="search-container">
      <input type="search" className="search-bar" placeholder="영화 검색..." />
      <FaSearch className="search-icon" />
    </div>
    <FaBell className="notification-icon" />
    <button className="login-button">로그인</button>
  </header>
);

export default Header;
