import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar({ auth, setAuth }) {
  useEffect(() => {
    // if (localStorage.getItem("accessToken")) setIsLoggedIn(true);
    handleCheckValidToken();
  }, []);

  const handleCheckValidToken = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/auth/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      console.log("🚀 ~ file: Navbar.js:16 ~ handleCheckValidToken ~ res", res);

      if (res.data.error) setAuth({ ...auth, isLogged: false });
      else
        setAuth({
          username: res.data.username,
          id: res.data.id,
          isLogged: true,
        });
    } catch (error) {
      console.log(
        "🚀 ~ file: App.js:30 ~ handleCheckValidToken ~ error",
        error
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuth({ username: "", id: 0, isLogged: false });
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home Page</Link>
        <Link to="/createpost"> Create A Post</Link>
        {!auth.isLogged && (
          <>
            <Link to="/login"> Login</Link>
            <Link to="/registration"> Registration</Link>
          </>
        )}
      </div>
      <div className="loggedInContainer">
        <h1>{auth.username} </h1>
        {auth.isLogged && <button onClick={handleLogout}> Logout</button>}
      </div>
    </div>
  );
}
