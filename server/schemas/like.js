const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },

  PostId: {
    type: String,
    require: true,
  },
});

// 인덱스 설정
likeSchema.index({ commentId: 1, userId: 1 });

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
