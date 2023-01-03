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
      console.log(
        "🚀 ~ file: App.js:37 ~ handleCheckValidToken ~ res.data",
        res.data
      );
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
      <Link to="/">Home</Link>
      <Link to="/createpost">Create a post</Link>
      {!auth.isLogged ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Log out</button>
      )}

      {auth.isLogged && <h3>{auth.username} </h3>}
    </div>
  );
}
