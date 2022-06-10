const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const Post = require('../schemas/post')
const authMiddleware = require("../middlewares/auth-middleware");
const cors = require('cors')




// 댓글 저장

router.post("/comments/save/:postId", authMiddleware, async (req, res) => {
  // const postId =req.params.id;
  try {
    const { user } = res.locals;

    const today = new Date();
    const year = today.getFullYear();
    var now = dayjs();
    var createAt = now.format();
    createAt = createAt.slice(0, 16).split('T').join(' ');
    
    const userId = user[0].userId;
    const userImageUrl = user[0].userImageUrl;
    const { comment } = req.body;
    const { postId } = req.params
    // console.log(userId, comment, createAt, postId);
    const list = await Comment.create({
      // userId:user.userId,
      userId,
      userImageUrl,
      comment,
      createAt: createAt,
      postId
      // commentId,
    });
    console.log(list)
    res.json({
      success: "댓글이 저장 되었습니다.",
      list
    });
  } catch (err) {
    console.log(err)
    res.json({
      errorMassage: "댓글 저장 실패"
    })
  }
});



//댓글 조회

router.get('/comments/get/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await Comment.find({ postId });
    console.log(postId)
    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});


//댓글 삭제

router.delete("/comments/delete/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  await Comment.deleteOne({ _id: commentId });
  console.log(commentId)
  res.send({ result: '삭제완료' });
})

module.exports = router;


