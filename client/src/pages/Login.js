import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const body = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, body);
      console.log("🚀 ~ file: Login.js:18 ~ onSubmit ~ res", res);
      if (res.data.error) {
        // console.log("logged in");
      } else {
        localStorage.setItem("accessToken", res.data.token);
        setAuth({
          username: res.data.username,
          id: res.data.id,
          isLogged: true,
        });
        navigate(`/`);
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.js:13 ~ onSubmit ~ error", error);
    }
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={onSubmit}> Login </button>
    </div>
  );
}

export default Login;
