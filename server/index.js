/* eslint-disable no-console */
const path = require("path");
const { GraphQLServer } = require("graphql-yoga");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");
const context = require("./context");

const server = new GraphQLServer({
  typeDefs: importSchema(path.resolve(__dirname, "schema.graphql")),
  resolvers,
  context
});
server.start(() => console.log("Server is running on localhost:4000"));
