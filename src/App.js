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
import { AuthProvider, useAuth } from "./Pages/AuthProvider";

function App() {
  return (
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
      <Route path="/createStory" element={<CreateStory />} />
      <Route path="/mypage" element={<Mypage />} />

      {/*    이거 로그인 여부에 따라 로그인 화면이나 해당 화면으로 가는 방법 해놓은건데 아직 백이 구현이 안되서 주석처리함
      <Route
        path="/createStory"
        element={
          <ProtectedRoute>
            <CreateStory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mypage"
        element={
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        }
      />
      */}

      <Route path="/Recommend" element={<Recommend />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/info" element={<Info />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
