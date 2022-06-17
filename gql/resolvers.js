const userController = require("../controllers/user");

const resolvers = {
  Query: {
    // USER
    getUser: () => {
      console.log("getUser");
      return null;
    },
  },

  Mutation: {
    // USER
   registerUser: (_, {input}) => userController.registerUser(input),
  }
};


module.exports = resolvers;