const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');
const authMiddleware = require('../middlewares/auth-middleware');
const dayjs = require('dayjs');
// 댓글 작성

router.post('/post', authMiddleware, async (req, res) => {
  // const postId =req.params.id;
  try {
    const { user } = res.locals;
    var now = dayjs();
    var createAt = now.format();
    createAt = createAt.slice(0, 16).split('T').join(' ');
    console.log(createAt);
    const userId = user[0].userId;
    const { comment } = req.body;
    const { postId } = req.params;
    const list = await Comment.create({
      // userId:user.userId,
      userId,
      comment,
      createAt,
      postId,
    });
    res.json({
      success: '댓글이 저장 되었습니다.',
      list,
    });
  } catch (err) {
    console.log(err);
    res.json({
      errorMassage: '댓글 저장 실패',
    });
  }
});



//댓글 전체 조회

router.get('/get/comment', async (req, res) => {
  try {
    
    let comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

//댓글 조회

router.get('/get/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await Comment.find({ postId });
    console.log(postId);
    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

//댓글 삭제

router.delete('/delete/:commentId', authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  await Comment.deleteOne({ _id: commentId });
  console.log(commentId);
  res.send({ result: '삭제완료' });
});

module.exports = router;
