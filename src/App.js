import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import CreateStory from "./Pages/CreateStory";
import Mypage from "./Pages/Mypage";
import Recommend from "./Pages/Recommend";
import Detail from "./Pages/Detail";
import Search from "./Pages/Search";
import Info from "./Pages/Info";
import User from "./Pages/Login";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import FindID from "./Components/User/FindID";
import FindIDRes from "./Components/User/FindIDRes";
import FindPW from "./Components/User/FindPW";
import FindPWRes from "./Components/User/FindPWRes";
import PageNotFound from "./Pages/PageNotFound";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import Select from './Components/CreateStory/Select';
import Synopsis from './Components/CreateStory/Synopsis';
import Script from './Components/CreateStory/Script';
import Show from './Components/CreateStory/Show';
import MypageDetail from './Pages/MypageDetail';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<User />}>
          <Route path="" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="findid" element={<FindID />} />
          <Route path="findpw" element={<FindPW />} />
          <Route path="findid/result" element={<FindIDRes />} />
          <Route path="findpw/result" element={<FindPWRes />} />
        </Route>
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateStory />
            </ProtectedRoute>
          }>
            <Route path="select" element={<Select />} />
            <Route path="synopsis" element={<Synopsis />} />
            <Route path="script" element={<Script />} />
            <Route path="show" element={<Show />} />
            <Route path="predict" element={<Show />} />
          </Route>
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <Mypage />
            </ProtectedRoute>
          }>
            <Route path="profile" element={<MypageDetail selectedMenu="profile" />} />
            <Route path="scenario" element={<MypageDetail selectedMenu="scenario" />} />
            <Route path="settings" element={<MypageDetail selectedMenu="settings" />} />
            <Route path="help" element={<MypageDetail selectedMenu="help" />} />
        </Route>
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/info" element={<Info />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/search" element={<Search />} /> 
        <Route path="/detail/:id" element={<Detail />} /> 
      </Routes>
    </AuthProvider>
  );
}

//이 함수가 로그인 여부 확인 함수
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;    
}

export default App;
