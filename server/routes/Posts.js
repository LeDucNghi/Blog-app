const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  //   res.send("Hello world");

  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  // findByPk = find by primary key ( in the database - id is the primary key )
  const post = await Posts.findByPk(id);

  res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;

  await Posts.create(post);
  res.json(post);
});

module.exports = router;
