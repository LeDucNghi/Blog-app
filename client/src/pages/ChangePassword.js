import React, { useState } from "react";

import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    const body = await {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const res = await axios.put(
        `http://localhost:3001/auth/changepassword`,
        body,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(
        "🚀 ~ file: ChangePassword.js:23 ~ handleChangePassword ~ res",
        res
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: ChangePassword.js:24 ~ handleChangePassword ~ error",
        error
      );
    }
  };

  return (
    <div>
      <h1>Change password</h1>
      <input
        type="text"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Old password..."
      />
      <input
        type="text"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password..."
      />

      <button
        // disabled={oldPassword && newPassword ? false : true}
        onClick={handleChangePassword}
      >
        {" "}
        Save change{" "}
      </button>
    </div>
  );
}

export default ChangePassword;
