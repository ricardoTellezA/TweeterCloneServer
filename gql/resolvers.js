const userController = require("../controllers/user");
const tweetController = require("../controllers/tweet");
const followController = require("../controllers/follow");

const resolvers = {
  Query: {
    // USER
    getUser: async (_, username) => userController.getUsuer(username),
    searchUser: async (_, name) => userController.searchUser(name),

    getTweets: async (_, username) => tweetController.getTweets(username),
    isFollow: (_, { idUser, idFollow }) => followController.isFollow(idUser, idFollow),
  },

  Mutation: {
    // USER
    registerUser: (_, { input }) => userController.registerUser(input),
    login: (_, { input }) => userController.login(input),
    createTweet: (_, { input }) => tweetController.createTweet(input),
    uploadAvatar: (_, { file, username, isAvatar }) =>
      userController.uploadAvatar(file, username, isAvatar),

    followUser: (_, { idUser, idFollow }) =>
      followController.followUser(idUser, idFollow),

    unFollowUser: (_, { idUser, idFollow }) => followController.unFollowUser(idUser, idFollow),

    // EDIT USER
    editUser: (_, { input }) => userController.editUser(input),

  },
};

module.exports = resolvers;
