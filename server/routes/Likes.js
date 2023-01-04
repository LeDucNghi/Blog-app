const express = require("express");
const router = express.Router();
const { Likes, Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
// const Posts = require("../models/Posts");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    await Likes.create({ PostId, UserId });

    res.json({ liked: true });
  } else {
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.json({ liked: false });
  }
});

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  console.log("🚀 ~ file: Likes.js:27 ~ router.get ~ postId", postId);

  // findByPk = find by primary key ( in the database - id is the primary key )
  //   const post = await Comments.findByPk(postId);

  const likes = await Likes.findAll({ where: { PostId: postId } });

  res.json(likes);
});

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;

//   // findByPk = find by primary key ( in the database - id is the primary key )
//   const post = await Posts.findByPk(id);

//   res.json(post);
// });

module.exports = router;
