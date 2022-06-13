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
    const userid = user[0].userid;
    const { comment } = req.body;
    const { postId } = req.params;
    const list = await Comment.create({
      // userid:user.userid,
      userid,
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



// //댓글 전체 조회

// router.get('/get/comment', async (req, res) => {
//   try {
    
//     let comments = await Comment.find();
//     res.json(comments);
//   } catch (err) {
//     console.error(err);
//   }
// });

//댓글 조회

router.get('/get/:postid', async (req, res) => {
  try {
    const { postid } = req.params;
    let comments = await Comment.find({ postid });
    console.log(postid);
    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

//댓글 삭제

router.delete('/delete/:commentid', authMiddleware, async (req, res) => {

  try {


    const { commentid } = req.params;
    await Comment.deleteOne({ _id: commentid });
    console.log(commentid);
    res.send({ result: '삭제완료' });


  } catch (err) {
    console.error(err);
  }

});





// 댓글 수정

router.put('/post/:commentid', authMiddleware, async (req, res) => {


  try {


    const { commentid } = req.params;
    const { comment } = req.body;
  
    // console.log(existsLists.length); // 셀수가 없다.
  
    await Comment.updateOne({ commentid }, { $set: { comment } });
  
    res.json({ result: '수정완료' });


  } catch (err) {
    console.error(err);
  }


});



module.exports = router;