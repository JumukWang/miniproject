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
<<<<<<< HEAD
let port = process.env.DB_PORT || 80 ;
require("dotenv").config();
passportConfig();
=======
const port = 3000;
const router = express.Router();

>>>>>>> bcac6b8ea97af4ab77961d1e692062bd26f36448
connect();



app.use(morgan('tiny'));
app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const kakaoAuth = require("./routes/kakao")
const usersRouter = require("./routes/users");
app.use("/api", usersRouter, kakaoAuth);

app.get('/', (req, res) => {
  res.send('백엔드 기본 페이지 입니다..');
});

app.listen(port, () => {
  console.log(port, "포트가 켜졌습니다.");
});