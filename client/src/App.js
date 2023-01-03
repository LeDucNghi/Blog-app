import "./App.css";

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { AuthContext } from "./helpers/AuthContext";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState({
    username: "",
    id: 0,
    isLogged: false,
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <Navbar auth={auth} setAuth={setAuth} />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/createpost" element={<CreatePost />} />
            <Route index path="/post/:id" element={<Post />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
