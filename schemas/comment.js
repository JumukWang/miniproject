const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentsSchema = new Schema({
  // _id: Schema.Types.ObjectId,

  userId: {
    type: String,
    // required: true,
  },
  commentId: {
    type: String,
    
  },
  postId: {
    type: String,
  },
  comment: {
    type: String,
    
  },
  userImageUrl: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("comments", commentsSchema);
