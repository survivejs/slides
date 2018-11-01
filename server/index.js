/* eslint-disable no-console */
require("dotenv").config();

const path = require("path");
const { GraphQLServer } = require("graphql-yoga");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");
const context = require("./context");

const schemaPath = path.resolve(__dirname, "schema.graphql");
const server = new GraphQLServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
  context
});
server.start(() => console.log("Server is running on localhost:4000"));
