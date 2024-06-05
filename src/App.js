import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import Main from "./Pages/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
