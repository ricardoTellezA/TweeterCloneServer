const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
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
    email:String!
    password: String!
  }

  type Query {
    #USER
    getUser: User
  }

  type Mutation {
    #USER
    registerUser(input:UserInput): User
    login(input: LoginInput): Token
  } 
`;

module.exports = typeDefs;
