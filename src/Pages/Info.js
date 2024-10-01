import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // 필요한 컴포넌트 추가
import Header from "../Components/Header";
import FAQ from "../Components/Info/FAQ"; // FAQ 컴포넌트
import How from "../Components/Info/How"; // How 컴포넌트
import QnA from "../Components/Info/QnA"; // QnA 컴포넌트
import "../stylefile/Main.css";

export default function Info() {
  return (
    <div className="page">
      <Header />

      {/* 네비게이션 링크 추가 */}
      <nav>
        <Link to="/info/faq">FAQ</Link>
        <Link to="/info/how">How</Link>
        <Link to="/info/QnA">QnA</Link>
      </nav>

      {/* 라우팅 설정 */}
      <Routes>
        <Route path="/info/faq" element={<FAQ />} />
        <Route path="/info/how" element={<How />} />
        <Route path="/info/QnA" element={<QnA />} />
      </Routes>
    </div>
  );
}
