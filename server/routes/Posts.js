const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  //   res.send("Hello world");

  const listOfPosts = await Posts.findAll({ include: [Likes] });

  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });

  res.json({ listOfPosts, likedPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  // findByPk = find by primary key ( in the database - id is the primary key )
  const post = await Posts.findByPk(id);

  res.json(post);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;

  post.username = req.user.username;
  post.UserId = req.user.id;

  await Posts.create(post);

  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;

  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("deleted 🥳");
});

router.put("/:postId", validateToken, async (req, res) => {
  const id = req.params.postId;
  const { options, content } = req.body;
  if (!options || !content) {
    res
      .status(400)
      .send({ error: "Invalid options or content 😢 Please check again!" });
  } else {
    if (options === "title") {
      await Posts.update({ title: content }, { where: { id: id } });
    } else if (options === "body") {
      await Posts.update({ postText: content }, { where: { id: id } });
    }
    res.status(200).send({
      message:
        options === "title"
          ? "Update title successful 🥳"
          : "Update post text successful 🥳",
    });
  }
});

module.exports = router;
