const express = require("express");
const router = express.Router();
const { Users, Posts, Likes } = require("../models");
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

  //   using bcrypt to compare two password : 1 is from user request, 2 from DB
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

router.get("/profile/:userId", async (req, res) => {
  const id = req.params.userId;

  const profile = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  const posts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });

  console.log("posts & profile : ", profile, posts, id);

  res.json({ profile, posts });
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Your old password is not match😢" });
      // res.status(400).json({ error: "Your old password is not match😢" });
    } else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { password: hash },
          { where: { username: req.user.username } }
        );
        res.status(200).json({ message: "Update successful🥳" });
      });
    }
  });
});

module.exports = router;
