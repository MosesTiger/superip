import React, { useState, useEffect } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import "../stylefile/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import { readXlsxFile } from '../context/xlsxReader'; // xlsxReader 가져오기
import styled from "styled-components";

// AutoComplete 스타일 정의
const AutoCompleteList = styled.ul`
  position: absolute;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0;
  padding-left: 0;
  list-style-type: none;
  z-index: 10;
  left: 5%;
  top: 45px;
`;

const AutoCompleteItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]); // 영화 데이터를 저장할 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // 자동완성 결과

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await readXlsxFile(); // xlsxReader.js에서 데이터 불러오기
      setMovies(data); // 가져온 데이터를 상태에 저장
    };

    fetchMovies();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = movies.filter((movie) => {
        const title = typeof movie.title === "string" ? movie.title : "";
        const director = typeof movie.director === "string" ? movie.director : "";
        return title.includes(query) || director.includes(query);
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    const filteredResults = movies.filter((movie) => {
      const title = typeof movie.title === "string" ? movie.title : "";
      const director = typeof movie.director === "string" ? movie.director : "";
      return title.includes(searchQuery) || director.includes(searchQuery);
    });

    navigate("/search", { state: { results: filteredResults } });
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.title || suggestion.director);
    setSuggestions([]);
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <img src="/로고 임시.png" alt="Logo" className="logo" />
      </Link>
      <div className="search-container">
        <input
          type="search"
          className="search-bar"
          placeholder="영화 제목 또는 감독 검색..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <FaSearch className="search-icon" onClick={handleSearch} />

        {suggestions.length > 0 && (
          <AutoCompleteList>
            {suggestions.map((suggestion, index) => (
              <AutoCompleteItem
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion.title} ({suggestion.director})
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        )}
      </div>
      <FaBell className="notification-icon" />
      {isAuthenticated ? (
        <div className="profile-container">
          <img
            src="/프로필 사진.png"
            alt="Profile"
            className="profile-pic"
            onClick={() => navigate("/mypage")}
          />
          <div className="profile-info">
            <span className="profile-name">{user?.name || "User"}</span>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <button className="login-button">로그인</button>
        </Link>
      )}
    </header>
  );
};

export default Header;
