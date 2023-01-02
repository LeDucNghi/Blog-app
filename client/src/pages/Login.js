import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

import axios from "axios";

function Login() {
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
      if (res.status === 200) {
        // console.log("logged in");
        localStorage.setItem("accessToken", res.data);
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
