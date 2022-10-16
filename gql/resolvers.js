const userController = require("../controllers/user");
const tweetController = require("../controllers/tweet");

const resolvers = {
  Query: {
    // USER
    getUser: async (_, username) => userController.getUsuer(username),
  },

  Mutation: {
    // USER
    registerUser: (_, { input }) => userController.registerUser(input),
    login: (_, { input }) => userController.login(input),
    createTweet: (_, { input }) => tweetController.createTweet(input),
    uploadAvatar: (_, { file, username }) =>
      userController.uploadAvatar(file, username),
  },
};

module.exports = resolvers;
