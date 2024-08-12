import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import "../stylefile/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';

const Header = () => {

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/mypage"); // mypage로 이동
  };

  return(
    <header className="header">
      <Link to="/">
        <img src="/로고 임시.png" alt="Logo" className="logo" />
      </Link>
      <div className="search-container">
        <input type="search" className="search-bar" placeholder="영화 검색..." />
        <FaSearch className="search-icon" />
      </div>
      <FaBell className="notification-icon" />
      {isAuthenticated ? (
        <div className="profile-container">
        <img 
            src="/프로필 사진.png" 
            alt="Profile" 
            className="profile-pic" 
            onClick={handleProfileClick} // 프로필 사진 클릭 시 mypage로 이동
          />
        <div className="profile-info">
          <span className="profile-name">{user?.name || "User"}</span>
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>
      </div>
      ):(
        <Link to="/login">
        <button className="login-button">로그인</button>
        </Link>
      )}
    </header>
  )
};

export default Header;
