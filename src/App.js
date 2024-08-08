import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import CreateStory from "./Components/CreateStory";
import PredictHit from "./Components/PredictHit";
import StoryArchive from "./Components/StoryArchive";
import Recommend from "./Components/Recommend";
import How from "./Components/nav_bar/How";
import QnA from "./Components/nav_bar/QnA";
import ToS from "./Components/nav_bar/ToS";
import Setting from "./Components/nav_bar/Setting";
import Login from "./Components/Login";
import PageNotFound from "./Components/PageNotFound";
import Findid from "./Components/Findid";
import Signup from "./Components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/CreateStory" element={<CreateStory />} />
      <Route path="/PredictHit" element={<PredictHit />} />
      <Route path="/StoryArchive" element={<StoryArchive />} />
      <Route path="/Recommend" element={<Recommend />} />
      <Route path="/How" element={<How />} />
      <Route path="/QnA" element={<QnA />} />
      <Route path="/ToS" element={<ToS />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/find-id" element={<Findid />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
