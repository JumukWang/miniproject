const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImageUrl: {
    type: String,
    
  },
});

module.exports = mongoose.model("User", userSchema);
