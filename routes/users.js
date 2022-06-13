const express = require("express");
const User = require("../schemas/user");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY;
const authMiddleware = require("../middlewares/auth-middleware");

//회원가입 양식
const postUsersSchema = Joi.object({
  userid: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,10}$")).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,20}$")).required(),
  confirmPassword: Joi.string().required(),
  userImageUrl: Joi.string().required(),
});

//회원가입
router.post("/user/signup", async (req, res) => {
  try {  
    const { userid, password, confirmPassword, userImageUrl }
    = await postUsersSchema.validateAsync(req.body);
    console.log({ userid, password, confirmPassword, userImageUrl });
    

    if (password !== confirmPassword) {
      return res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
    }

    const exitstUsers = await User.find({ userid });
    if (exitstUsers.length) {
      return res.status(400).send({
        errorMessage: "중복된 아이디가 존재합니다.",
      });
    }

    const user = new User({ userid, password, userImageUrl });
    await user.save();
    res.status(201).send({messege: "회원가입 완성"});

    
  } catch (error) {
    return res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

//로그인
router.post("/user/login", async (req, res) => {
  const { userid, password } = req.body;
  const user = await User.findOne({ userid, password });
  if (!user) {
    return res.status(400).send({
      errorMessage: "아이디 또는 비밀번호를 확인해주세요.",
    });
  }
  const token = jwt.sign({ userid: user.userid }, `${jwtSecret}`);
  res.send({ token });
});

// 정보 조회
router.get("/user/islogin", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    userid: user[0].userid,
    userImageUrl: user[0].userImageUrl
  });
});


module.exports = router;
