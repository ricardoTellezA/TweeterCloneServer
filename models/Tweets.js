const moongose = require("mongoose");
const Schema = moongose.Schema;

const TweetSchema = new Schema({
  username: {
    type: String,
    ref: "User",
  },

  text: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
  },

  likes: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    
  }
});

module.exports = moongose.model("Tweet", TweetSchema);
