import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import CreateStory from "./Pages/CreateStory";
import PredictHit from "./Pages/PredictHit";
import StoryArchive from "./Pages/StoryArchive";
import Recommend from "./Pages/Recommend";
import How from "./Pages/nav_bar_Page/How";
import QnA from "./Pages/nav_bar_Page/QnA";
import ToS from "./Pages/nav_bar_Page/ToS";
import Setting from "./Pages/nav_bar_Page/Setting";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";

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
    </Routes>
  );
}

export default App;
