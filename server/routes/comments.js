const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');
const authMiddleware = require('../middlewares/auth-middleware');
const dayjs = require('dayjs');

// 댓글 작성

router.post('/post', authMiddleware, async (req, res) => {
  try {
    const { user } = res.locals;
    const { comment } = req.body;
    const { postId } = req.params;
    var now = dayjs();
    var createAt = now.format();

    createAt = createAt.slice(0, 16).split('T').join(' ');

    const userId = user[0].userId;
    const list = await Comment.create({
      userId,
      comment,
      createAt,
      postId,
    });
    res.json({ // userId 표시
      userId: userId,
      success: '댓글이 저장 되었습니다.',
      list,
    });
  } catch (err) {
    console.log(err);
    res.json({
      errorMessage: '댓글 저장을 실패하였습니다.',
    });
  }
});

//댓글 조회

router.get('/get/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await Comment.find({ postId });
    console.log(postId);
    res.json({
      success: '조회성공 하였습니다.',
      comments,
    });
  } catch (err) {
    console.error(err);
    res.json({
      errorMessage: '댓글 조회가 실패하였습니다.',
    });
  }
});

//댓글 삭제

router.delete('/delete/:commentId', authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.deleteOne({ _id: commentId });
    console.log(commentId);
    res.send({ success: '댓글이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.json({
      errorMessage: '댓글 삭제가 실패하였습니다.',
    });
  }
});

// 댓글 수정

router.put('/edit/:commentId', authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    await Comment.updateOne({ commentId }, { $set: { comment } });

    res.json({ success: '댓글 수정이 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    res.json({
      errorMessage: '댓글 수정이 실패하였습니다.',
    });
  }
});

module.exports = router;
