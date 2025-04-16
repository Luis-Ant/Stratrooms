import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center h-screen bg-blue-100">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
