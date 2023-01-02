import "./App.css";

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/createpost">Create a post</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/createpost" element={<CreatePost />} />
          <Route index path="/post/:id" element={<Post />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
