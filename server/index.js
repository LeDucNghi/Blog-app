const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

const postRouter = require("./routes/Posts");
const commentRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");
const likesRouter = require("./routes/Likes");

// this will help when u test response in postman or sth else, it will return a json result
app.use(express.json());

// this will help when u call api in frontend, it prevent an errors with CORS
app.use(cors());

// routers
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/auth", usersRouter);
app.use("/like", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
