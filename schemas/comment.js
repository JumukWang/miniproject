const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentsSchema = new Schema({
  userid: {
    type: String,
    unique: true,
  },
  postid: {
    type: String,
    unique: true,
  },

  commentid: {

    type: String,
    unique: true,
  },

  comment: {
    type: String,
  },

  createAt: {
    type: String,
  },
});

module.exports = mongoose.model('comments', commentsSchema);
