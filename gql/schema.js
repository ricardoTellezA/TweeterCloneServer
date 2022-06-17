const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
  }

  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    #USER
    getUser: User
  }

  type Mutation {
    #USER
    registerUser(input:UserInput): User
  } 
`;

module.exports = typeDefs;
