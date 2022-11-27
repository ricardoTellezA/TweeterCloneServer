const User = require("../models/User");
const Tweet = require("../models/Tweets");

async function createTweet(input) {
  try {
    const newTweet = new Tweet({
      userId: input.userId,
      text: input.text,
      photo: input.photo,
      createdAt: new Date(),
    });
    const tweet = await newTweet.save();
    return tweet;
  } catch (error) {
    console.log(error);
  }
}

async function getTweets(username) {
  const { username: usernameUser } = username;
  const user = await User.findOne({ username: usernameUser });

  if (!user) {
    throw new Error("User not found");
  }
  const tweets = await Tweet.find({ userId: user._id }).sort({ createdAt: -1 });

  if (!tweets) throw new Error("No se encontraron tweets");

  return tweets;
}

module.exports = {
  createTweet,
  getTweets,
};
