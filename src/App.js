import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import CreateStory from "./Components/CreateStory";
import PredictHit from "./Components/PredictHit";
import StoryArchive from "./Components/StoryArchive";
import Recommend from "./Components/Recommend";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/CreateStory" element={<CreateStory />} />
      <Route path="/PredictHit" element={<PredictHit />} />
      <Route path="/StoryArchive" element={<StoryArchive />} />
      <Route path="/Recommend" element={<Recommend />} />
    </Routes>
  );
}

export default App;
