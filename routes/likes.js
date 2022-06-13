const express = require('express');
const router = express.Router();
const Like = require('../schema/like')

// ================================================================
// 좋아요를 눌렀을 때
// ================================================================


router.post("/put/like/", (req, res) => {
    let { userid, postid } = req.body;
  
    const LikeIns = new Like({ userid, postid });
  
    LikeIns.save((err, result) => {
      if (err) return res.status(400).json({ upLike: false, err });
      return res.status(200).json({ upLike: true });
    });
  });



  
  // ================================================================
  // 좋아요를 다시 눌러 취소할 때
  // ================================================================



  router.post("/put/unlike", (req, res) => {
    let { userid, postid } = req.body;
  
    console.log(userid, postid);
  
    Like.findOneAndDelete({ userid: userid, postid: postid }).exec(
      (err, result) => {
        if (err) return res.status(400).json({ unLike: false, err });
        return res.status(200).json({ unLike: true });
      }
    );
  });


  module.exports = router;