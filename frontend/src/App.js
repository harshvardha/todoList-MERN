import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
