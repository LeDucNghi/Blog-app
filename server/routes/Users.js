const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
  });

  res.json("success");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("username, password: ", username, password);
  //   find username in the DB to see if there is a match
  const user = await Users.findOne({ where: { username: username } });

  //   check if user is not exist in the DB
  if (!user) res.json({ error: "User doesn't exist🤔" });

  //   using bcrypt to compare to password : 1 is from user request, 2 from DB
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong username & password combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "important"
    );

    res.json({ token: accessToken, username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
