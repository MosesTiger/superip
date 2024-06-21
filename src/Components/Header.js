import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import styles from "../layout/Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <img src="/로고 임시.png" alt="Logo" className={styles.logo} />
    <div className={styles.searchContainer}>
      <input type="search" className={styles.searchBar} placeholder="영화 검색..." />
      <FaSearch className={styles.searchIcon} />
    </div>
    <FaBell className={styles.notificationIcon} />
    <button className={styles.loginButton}>로그인</button>
  </header>
);

export default Header;
