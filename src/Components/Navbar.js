import React from "react";
import Link from 'next/link';
import styles from "../layout/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navBar}>
      <Link href="/how"><span className={styles.navBar}>How</span></Link>
      <Link href="/qna"><span className={styles.navBar}>QnA</span></Link>
      <Link href="/tos"><span className={styles.navBar}>ToS</span></Link>
      <Link href="/setting"><span className={styles.navBar}>Setting</span></Link>
    </nav>
  );
}

export default Navbar;
