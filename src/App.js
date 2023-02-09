import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import List from "./list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
