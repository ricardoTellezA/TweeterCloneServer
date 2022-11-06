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
  }

  type Tweet {
    id: ID!
    user: User
    text: String
    photo: String
    likes: Int
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
  }

  type Mutation {
    #USER
    registerUser(input: UserInput): User
    login(input: LoginInput): Token
    uploadAvatar(file: String!, username: String!, isAvatar: Boolean!): Boolean


    #TWEETS
    createTweet(input: Tweets): Tweet
  }
  `;

module.exports = typeDefs;
