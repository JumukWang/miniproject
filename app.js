const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const connect = require("./schemas");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 3000;
const router = express.Router();
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes")







app.use(morgan('tiny'));
app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", [usersRouter, commentsRouter, likesRouter]);


app.get('/', (req, res) => {
  res.send('백엔드 기본 페이지 입니다..');
});

app.listen(port, () => {
  console.log(port, "포트가 켜졌습니다.");
});