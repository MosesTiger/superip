import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../stylefile/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AutoProvider";
import { readXlsxFile } from "../context/xlsxReader"; // xlsxReader 가져오기
import styled from "styled-components";
import { PiUserCircleBold } from "react-icons/pi";

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

const VerticalLine = styled.div`
  width: 2px; /* 세로선의 굵기 */
  background-color: #cdcdcd; /* 세로선의 색상 */
  height: 80%; /* 원하는 높이 설정 */
  margin-left: 60px;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  gap: 40px;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin-right: 30px;
`;

const Loginprofile = styled(PiUserCircleBold)`
  height: 40px;
  width: auto;
  color: black;
`;

const LoginButton = styled.button`
  text-decoration: none;
  font-family: "조선굴림체";
  font-size: 25px;
  font-weight:100;
  padding: 0px 5px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
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
        const director =
          typeof movie.director === "string" ? movie.director : "";
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

  const handleLoginClick = () => {
    navigate("/login"); // login 페이지로 이동
  };

  return (
    <header className="header">
      <LeftContainer>
        <Link to="/">
          <img src="/로고.png" alt="Logo" className="logo" />
        </Link>
        <div className="search-container">
          <VerticalLine />
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
      </LeftContainer>
      {isAuthenticated ? (
        <div className="profile-container">
          <img
            src="/기본프로필이미지.png"
            alt="Profile"
            className="profile-pic"
            onClick={() =>
              navigate("/mypage", { state: { selectedMenu: "profile" } })
            }
          />
          <div className="profile-info">
            <span className="profile-name" style={{ fontFamily: "조선굴림체" }}>
              {user?.name || "User"} 님
            </span>
            <button className="logout-button" onClick={logout} style={{ fontFamily: "조선굴림체" }}>
              LOGOUT
            </button>
          </div>
        </div>
      ) : (
        <LoginContainer>
          <Loginprofile />
          <LoginButton onClick={handleLoginClick}>LOGIN</LoginButton>
        </LoginContainer>
      )}
    </header>
  );
};

export default Header;
