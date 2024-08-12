import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Home';
import CreateStory from './Pages/CreateStory';
import Mypage from './Pages/Mypage';
import Recommend from './Pages/Recommend';
import Detail from './Pages/Detail';
import Search from './Pages/Search';
import Info from './Pages/Info';
import User from './Pages/User';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import FindID from './Components/User/FindID';
import FindIDRes from './Components/User/FindIDRes';
import FindPW from './Components/User/FindPW';
import FindPWRes from './Components/User/FindPWRes';
import PageNotFound from './Pages/PageNotFound';
import Movie from './Pages/Movie';
import Synopsis from './Pages/Synopsis';
import Script from './Pages/Script';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/user" element={<User />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="findid" element={<FindID />} />
        <Route path="findpw" element={<FindPW />} />
        <Route path="findid/result" element={<FindIDRes />} />
        <Route path="findpw/result" element={<FindPWRes />} />
      </Route>
      <Route path="/CreateStory" element={<CreateStory />}>
        <Route path="movie" element={<Movie />} />
        <Route path="synopsis" element={<Synopsis />} />
        <Route path="script" element={<Script />} />
      </Route>
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/info" element={<Info />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
