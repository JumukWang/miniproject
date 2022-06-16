const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  stdRestNm: {
    //휴게소/주유소명
    type: String,
  },

  svarAddr: {
    //휴게소주소
    type: String,
  },

  routeNm: {
    //노선명
    require: true,
    type: String,
  },

  foodNm: {
    //음식 이름
    require: true,
    type: String,
  },

  foodImg: {
    //음식 사진
    require: true,
    type: String,
  },

  foodCost: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model('Post', postSchema);
