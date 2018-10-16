/* eslint-disable no-console */
const path = require("path");
const { GraphQLServer } = require("graphql-yoga");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
