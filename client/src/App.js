import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthContext } from "./helpers/AuthContext";
import ChangePassword from "./pages/ChangePassword";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import { useState } from "react";

function App() {
  const accessToken = localStorage.getItem("accessToken");

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
            {!auth.isLogged || !accessToken ? (
              <Route
                index
                path="*"
                element={
                  <NotFound title="Please log in to do more creative things 😢" />
                }
              />
            ) : (
              <>
                <Route index path="/" element={<Home />} />
                <Route index path="/createpost" element={<CreatePost />} />
                <Route index path="/post/:id" element={<Post />} />
                <Route index path="/profile/:userId" element={<Profile />} />
                <Route
                  index
                  path="/changepassword"
                  element={<ChangePassword />}
                />
              </>
            )}
            <Route index path="/login" element={<Login />} />
            <Route index path="/registration" element={<Registration />} />

            <Route index path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
