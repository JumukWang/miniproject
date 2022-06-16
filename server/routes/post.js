const express = require('express');
const router = express.Router();
const request = require('request');
const Posts = require('../schemas/post');
const dotenv = require('dotenv');
const dayjs = require('dayjs');
const authMiddleware = require('../middlewares/auth-middleware');

dotenv.config();

var Uni_num = 0;



router.post('/post/board', authMiddleware, async (req, res) => {
  const { stdRestNm, svarAddr, routeNm, foodNm, foodImg, foodCost } = req.body;

  const { user } = res.locals;
  const abc = user[0].userId;
  if (abc=="admin"){


    const createdLists = await Posts.create({
      stdRestNm,
      svarAddr,
      routeNm,
      foodNm,
      foodImg,
      foodCost,
    });

    res.json({ Posts: createdLists });

  }else{
    return res
    .status(400)
    .json({ success: false, errorMessage: '해당 권한이 없습니다.' });

  }
  

});

// 전체 게시물 조회 API

router.get('/post/board', async (req, res) => {
  const lists = await Posts.find();

  res.json({
    lists,
  });
});

// 게시글 수정 API : foodNm로 조회

router.put('/post/board/:foodNm', async (req, res) => {
  const { stdRestNm, svarAddr, routeNm, foodNm, foodImg, foodCost } = req.body;
  // 없을 때

  const { user } = res.locals;
  const abc = user[0].userId;

  const [existsLists] = await Posts.find({ foodNm });


  if (!existsLists) {
    return res
      .status(400)
      .json({ success: false, errorMessage: '해당 게시물이 없습니다.' });
  }

  if (abc=="admin"){

    await Posts.updateOne({ foodNm }, { $set: { stdRestNm } });

    res.json({ success: true });
  
  }else{
    return res
    .status(400)
    .json({ success: false, errorMessage: '해당 권한이 없습니다.' });

  }
});

// 게시글 삭제 API : foodNm로 조회
// API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기

router.delete('post/board/:foodNm', async (req, res) => {
  const { stdRestNm, svarAddr, routeNm, foodNm, foodImg, foodCost } = req.body;

  const existsLists = await Posts.find({ foodNm });

  const { user } = res.locals;
  const abc = user[0].userId;


  if (abc=="admin"){

    if (existsLists.length) {
      await Posts.deleteOne({ foodNm });
    } else {
      return res
        .status(400)
        .json({ success: false, errorMessage: '권한이 없습니다.' });
    }

    res.json({ success: true });


  }else{
    return res
    .status(400)
    .json({ success: false, errorMessage: '해당 권한이 없습니다.' });

  }
});

module.exports = router;
