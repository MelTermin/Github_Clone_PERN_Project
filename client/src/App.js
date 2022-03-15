import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import './App.css';

import {GlobalProvider} from "./context/GlobalContext"

function App() {
  return (
    <div className="">
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
