const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const connect = require("./schemas");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport")
const passportConfig = require("./passport")
const app = express();
let port = process.env.DB_PORT || 80 ;
require("dotenv").config();
passportConfig();
connect();



app.use(morgan('tiny'));
app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const kakaoAuth = require("./routes/kakao")
const usersRouter = require("./routes/users");
app.use("/api", usersRouter, kakaoAuth);

app.listen(port, () => {
  console.log(port, "포트가 켜졌습니다.");
});