const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentsSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  postId: {
    type: String,
    unique: true,
  },

  commentId: {

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
