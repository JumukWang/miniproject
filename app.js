const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const connect = require("./schemas");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const mainRouter = require("./routes/main");
const detailsRouter = require("./routes/details");

app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", [postsRouter, usersRouter, commentsRouter, mainRouter, detailsRouter]);

app.listen(port, () => {
  console.log(port, "포트가 켜졌습니다.");
});