const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    avatar: String
    description: String
    email: String
    portada: String
    tweets: [Tweet]
  }

  type Tweet {
    id: ID!
    user: User
    text: String
    photo: String
    likes: Int
    createdAt: String
  }

  type Token {
    token: String
  }

  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input EditUserInput {
    username: String!
    name: String
    description: String
    avatar: String
    portada: String

  }

  input LoginInput {
    email: String!
    password: String!
  }

  input Tweets {
    username: String!
    text: String!
    photo: String
  }

  type Query {
    #USER
    getUser(username: String!): User
    searchUser(name: String!): [User]
    getTweets(username: String!): [Tweet]
    isFollow(idUser: ID!, idFollow: ID!): Boolean
  }

  type Mutation {
    #USER
    registerUser(input: UserInput): User
    login(input: LoginInput): Token
    uploadAvatar(file: String!, username: String!, isAvatar: Boolean!): Boolean
    followUser(idUser: ID!, idFollow: ID!): Boolean
    editUser(input: EditUserInput): User


    #TWEETS
    createTweet(input: Tweets): Tweet
   
  }
  `;

module.exports = typeDefs;
