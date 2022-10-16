const User = require("../models/User");
const Tweet = require("../models/Tweets");

async function createTweet(input) {
  const newTweet = new Tweet(input);
  try {
    const tweet = await newTweet.save();
    return tweet;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createTweet,
};
