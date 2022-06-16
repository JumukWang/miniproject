const express = require('express');
const router = express.Router();
const Like = require('../schemas/like');

// ================================================================
// 좋아요를 눌렀을 때
// ================================================================

router.post('/like/uplike', (req, res) => {
  let { userId, postId } = req.body;

  const LikeIns = new Like({ userId, postId });

  LikeIns.save((err, result) => {
    if (err) return res.status(400).json({ upLike: false, err });
    return res.status(200).json({ upLike: true });
  });
});

// ================================================================
// 좋아요를 다시 눌러 취소할 때
// ================================================================

router.post('/like/unlike', (req, res) => {
  let { userId, postId } = req.body;

  console.log(userId, postId);

  Like.findOneAndDelete({ userId: userId, postId: postId }).exec(
    (err, result) => {
      if (err) return res.status(400).json({ unLike: false, err });
      return res.status(200).json({ unLike: true });
    }
  );
});

module.exports = router;
