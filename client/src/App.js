import "./App.css";

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/createpost">Create a post</Link>
          <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/createpost" element={<CreatePost />} />
          <Route index path="/post/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
