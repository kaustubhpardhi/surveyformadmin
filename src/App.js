import "./App.css";
import Login from "./components/login";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/admin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
